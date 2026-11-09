"use client";

import { useState } from "react";
import { ArrowRight, Download, Play, RotateCcw } from "lucide-react";
import { formatMoney, payment, scenarios, simulate, traceReport, type Scenario, type Strategy } from "./simulation";

const stages = ["producer", "broker", "consumer", "ledger"] as const;

export default function LabConsole() {
  const [scenario, setScenario] = useState<Scenario>("ack-loss");
  const [strategy, setStrategy] = useState<Strategy>("baseline");
  const [visibleSteps, setVisibleSteps] = useState(0);
  const trace = simulate(scenario, strategy);
  const activeStep = trace.steps[visibleSteps - 1];
  const debits = activeStep?.debits ?? 0;
  const completed = visibleSteps === trace.steps.length;
  const alternate = completed ? simulate(scenario, strategy === "baseline" ? "guarded" : "baseline") : null;

  function changeScenario(next: Scenario) {
    setScenario(next);
    setVisibleSteps(0);
  }

  function changeStrategy(next: Strategy) {
    setStrategy(next);
    setVisibleSteps(0);
  }

  function downloadTrace() {
    const url = URL.createObjectURL(new Blob([traceReport(scenario, strategy)], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `systems-lab-${scenario}-${strategy}.md`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <section className="lab-console" aria-label="Payment delivery simulator">
      <div className="lab-console-top">
        <span><span className="lab-signal" /> SIMULATION / {payment.id}</span>
        <span>PAYMENT {formatMoney(payment.amount)}</span>
      </div>
      <div className="lab-console-grid">
        <aside className="lab-controls" aria-label="Experiment controls">
          <fieldset>
            <legend>01 / Choose a scenario</legend>
            {scenarios.map((item) => (
              <label key={item.id} className="lab-choice">
                <input type="radio" name="scenario" value={item.id} checked={scenario === item.id} onChange={() => changeScenario(item.id)} />
                <span><strong>{item.name}</strong><small>{item.description}</small></span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>02 / Choose a consumer</legend>
            <label className="lab-choice">
              <input type="radio" name="strategy" value="baseline" checked={strategy === "baseline"} onChange={() => changeStrategy("baseline")} />
              <span><strong>Baseline</strong><small>Debit on each delivery.</small></span>
            </label>
            <label className="lab-choice">
              <input type="radio" name="strategy" value="guarded" checked={strategy === "guarded"} onChange={() => changeStrategy("guarded")} />
              <span><strong>Idempotent</strong><small>Debit once per event ID.</small></span>
            </label>
          </fieldset>
        </aside>
        <div className="lab-trace">
          <h2>Event trace</h2>
          <ol className="lab-pipeline" aria-label="Delivery stages">
            {stages.map((stage, index) => (
              <li key={stage} data-active={activeStep?.stage === stage}><span>0{index + 1}</span>{stage}</li>
            ))}
          </ol>
          <div className="lab-actions">
            <button type="button" className="lab-primary" onClick={() => setVisibleSteps(trace.steps.length)} disabled={completed}><Play size={15} aria-hidden="true" /> Run trace</button>
            <button type="button" onClick={() => setVisibleSteps((count) => Math.min(count + 1, trace.steps.length))} disabled={completed}>Next step <ArrowRight size={15} aria-hidden="true" /></button>
            <button type="button" onClick={() => setVisibleSteps(0)} disabled={!visibleSteps}><RotateCcw size={15} aria-hidden="true" /> Reset</button>
          </div>
          <p className="lab-status" role="status">{completed ? `Trace complete. ${debits} ${debits === 1 ? "debit" : "debits"} posted.` : activeStep ? `Step ${visibleSteps} of ${trace.steps.length}. ${activeStep.title}.` : "Ready. Run the full trace or advance one step at a time."}</p>
          {visibleSteps > 0 && (
            <ol className="lab-events" aria-label="Recorded events">
              {trace.steps.slice(0, visibleSteps).map((step, index) => (
                <li key={index} data-tone={step.tone}>
                  <span className="lab-event-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><span className="lab-event-stage">{step.stage}</span><strong>{step.title}</strong><p>{step.detail}</p></div>
                </li>
              ))}
            </ol>
          )}
        </div>
        <aside className="lab-ledger" aria-labelledby="lab-ledger-title">
          <h2 id="lab-ledger-title">Ledger evidence</h2>
          <p className="lab-balance">{formatMoney(payment.openingBalance - debits * payment.amount)}</p>
          <span className="lab-balance-label">ACCOUNT BALANCE</span>
          <dl>
            <div><dt>Opening balance</dt><dd>{formatMoney(payment.openingBalance)}</dd></div>
            <div><dt>Deliveries</dt><dd>{activeStep?.deliveries ?? 0}</dd></div>
            <div><dt>Debits posted</dt><dd>{debits}</dd></div>
          </dl>
          <div className="lab-verdict" data-result={!completed ? "pending" : trace.passed ? "pass" : "fail"}>
            <strong>{!completed ? "Awaiting result" : trace.passed ? "Invariant passed" : "Invariant failed"}</strong>
            <p>Exactly one debit for {payment.id}.</p>
          </div>
          {alternate && (
            <div className="lab-compare">
              <p>{strategy === "baseline" ? "Idempotent" : "Baseline"} would post <strong>{alternate.debits} {alternate.debits === 1 ? "debit" : "debits"}</strong> under the same scenario.</p>
              <button type="button" onClick={() => {
                const next = strategy === "baseline" ? "guarded" : "baseline";
                setStrategy(next);
                setVisibleSteps(alternate.steps.length);
              }}>Run the other consumer <ArrowRight size={14} aria-hidden="true" /></button>
              <button type="button" onClick={downloadTrace}><Download size={15} aria-hidden="true" /> Download trace</button>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
