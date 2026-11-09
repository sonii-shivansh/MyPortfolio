export const scenarios = [
  { id: "normal", name: "Normal delivery", description: "One event, one acknowledgement." },
  { id: "ack-loss", name: "Lost acknowledgement", description: "The debit succeeds. The acknowledgement gets lost." },
  { id: "duplicate", name: "Duplicate publish", description: "The same payment event arrives twice." },
  { id: "outage", name: "Consumer outage", description: "The first attempt fails before the ledger write." },
] as const;

export type Scenario = (typeof scenarios)[number]["id"];
export type Strategy = "baseline" | "guarded";
type Stage = "producer" | "broker" | "consumer" | "ledger";
type Tone = "normal" | "warning" | "success";

type TraceStep = {
  stage: Stage;
  title: string;
  detail: string;
  tone: Tone;
  deliveries: number;
  debits: number;
};

export const payment = { id: "PAY-0142", amount: 2500, openingBalance: 10000 };
export const formatMoney = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export function simulate(scenario: Scenario, strategy: Strategy) {
  const steps: TraceStep[] = [];
  let deliveries = 0;
  let debits = 0;
  let processed = false;

  function record(stage: Stage, title: string, detail: string, tone: Tone = "normal") {
    steps.push({ stage, title, detail, tone, deliveries, debits });
  }

  function deliver() {
    deliveries += 1;
    record("broker", `Delivery ${deliveries}`, `The broker delivers ${payment.id} to the consumer.`);
  }

  function applyDebit() {
    if (strategy === "guarded" && processed) {
      record("consumer", "Duplicate suppressed", `${payment.id} already has a committed ledger entry. The consumer acknowledges this delivery without another debit.`, "success");
      return;
    }
    debits += 1;
    processed = true;
    record("ledger", "Debit committed", strategy === "guarded"
      ? "The debit and processed event ID commit in the same transaction."
      : "The consumer writes a debit for this delivery without checking whether the event already posted.", debits > 1 ? "warning" : "success");
  }

  record("producer", "Payment event published", `A fictional ${formatMoney(payment.amount)} payment is published with the stable ID ${payment.id}.`);
  deliver();

  if (scenario === "outage") {
    record("consumer", "Consumer unavailable", "The first attempt fails before writing to the ledger. The broker schedules a retry.", "warning");
    deliver();
    applyDebit();
  } else {
    applyDebit();
    if (scenario === "ack-loss") {
      record("broker", "Acknowledgement lost", "The debit is already committed, but the broker did not receive confirmation. It retries the same event.", "warning");
      deliver();
      applyDebit();
    } else if (scenario === "duplicate") {
      record("producer", "Event published again", "The producer resends the same logical payment with its original event ID.", "warning");
      deliver();
      applyDebit();
    }
  }

  record("broker", "Delivery acknowledged", "The broker receives confirmation and stops delivering this event in the trace.", "success");
  const balance = payment.openingBalance - debits * payment.amount;
  const passed = debits === 1;
  return { steps, deliveries, debits, balance, passed };
}

export function traceReport(scenario: Scenario, strategy: Strategy) {
  const result = simulate(scenario, strategy);
  const name = scenarios.find((item) => item.id === scenario)?.name;
  return [
    "# Systems Lab | Payment trace",
    "",
    "Fictional educational simulation. No live payments or customer data.",
    "",
    `Scenario: ${name}`,
    `Consumer: ${strategy === "guarded" ? "Idempotent" : "Baseline"}`,
    `Event: ${payment.id} | Amount: ${formatMoney(payment.amount)}`,
    "",
    ...result.steps.map((step, index) => `${index + 1}. **${step.title}** (${step.stage}) — ${step.detail}`),
    "",
    `Deliveries: ${result.deliveries}`,
    `Posted debits: ${result.debits}`,
    `Closing balance: ${formatMoney(result.balance)}`,
    `Invariant — exactly one debit for ${payment.id}: ${result.passed ? "PASS" : "FAIL"}`,
    "",
  ].join("\n");
}
