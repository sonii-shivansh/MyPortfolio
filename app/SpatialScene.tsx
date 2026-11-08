"use client";
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function SpatialScene({shape,paused}:{shape:number;paused:boolean}){
 const host=useRef<HTMLDivElement>(null);const live=useRef({shape,paused});const reduced=useReducedMotion();const [failed,setFailed]=useState(false);
 useEffect(()=>{live.current={shape,paused};},[shape,paused]);
 useEffect(()=>{
 let disposed=false,cleanup=()=>{};
 import('three').then(T=>{
 if(disposed||!host.current)return;
 const el=host.current;let renderer:InstanceType<typeof T.WebGLRenderer>;
 try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{setFailed(true);return;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setClearColor(0x000000,0);renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;el.appendChild(renderer.domElement);
 const scene=new T.Scene();const camera=new T.PerspectiveCamera(35,1,.1,100);camera.position.set(0,0,8.6);
 // An authored photographic lighting environment, generated locally; no external assets.
 const map=document.createElement('canvas');map.width=1024;map.height=512;const c=map.getContext('2d')!;
 c.fillStyle='#151718';c.fillRect(0,0,1024,512);
 const panel=(x:number,y:number,w:number,h:number,color:string)=>{c.fillStyle=color;c.fillRect(x,y,w,h);};
 panel(90,40,75,360,'#ffffff');panel(350,40,220,90,'#faf2e1');panel(780,140,100,300,'#efeee9');panel(600,320,130,30,'#ff4b25');panel(0,460,1024,25,'#767c82');
 const tex=new T.CanvasTexture(map);tex.mapping=T.EquirectangularReflectionMapping;tex.colorSpace=T.SRGBColorSpace;
 const pm=new T.PMREMGenerator(renderer);const env=pm.fromEquirectangular(tex);scene.environment=env.texture;
 const material=new T.MeshPhysicalMaterial({color:0xc9cdd1,metalness:1,roughness:.16,clearcoat:1,clearcoatRoughness:.1,envMapIntensity:2.1});
 const orange=new T.MeshPhysicalMaterial({color:0xff4e29,metalness:.65,roughness:.23,emissive:0x561000,emissiveIntensity:.4});
 scene.add(new T.AmbientLight(0xffffff,.3));const key=new T.DirectionalLight(0xffffff,5);key.position.set(4,7,5);scene.add(key);const rim=new T.PointLight(0xff4e29,25);rim.position.set(-3,-1,3);scene.add(rim);
 const group=new T.Group();scene.add(group);
 const knotGeo=new T.TorusKnotGeometry(1.37,.41,220,36,2,3);const knot=new T.Mesh(knotGeo,material);group.add(knot);
 const orbitGroup=new T.Group();const ringGeo=new T.TorusGeometry(1.55,.19,24,160);for(let i=0;i<3;i++){const ring=new T.Mesh(ringGeo,i===1?orange:material);ring.rotation.set(i*Math.PI/3,i*Math.PI/2,0);orbitGroup.add(ring);}group.add(orbitGroup);
 const hyper=new T.Group();const vertices=Array.from({length:16},(_,i)=>[i&1?1:-1,i&2?1:-1,i&4?1:-1,i&8?1:-1]);
 const edgeGeo=new T.CylinderGeometry(.035,.035,1,10);const ballGeo=new T.SphereGeometry(.072,12,12);const balls=vertices.map(()=>{const b=new T.Mesh(ballGeo,orange);hyper.add(b);return b;});
 const edges:{a:number;b:number;mesh:InstanceType<typeof T.Mesh>}[]=[];
 for(let i=0;i<16;i++)for(let j=i+1;j<16;j++)if(((i^j)&((i^j)-1))===0){const mesh=new T.Mesh(edgeGeo,material);hyper.add(mesh);edges.push({a:i,b:j,mesh});}group.add(hyper);
 const up=new T.Vector3(0,1,0),temp=new T.Vector3();
 const points=vertices.map(()=>new T.Vector3());
 let pointer={x:0,y:0},drag={x:0,y:0,active:false},angle=0,t=0,last=0,raf=0,visible=true;
 const resize=()=>{const r=el.getBoundingClientRect();renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();};
 const ro=new ResizeObserver(resize);ro.observe(el);resize();const io=new IntersectionObserver(([e])=>{visible=e.isIntersecting;});io.observe(el);
 const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();pointer={x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.5};if(drag.active){angle+=(e.clientX-drag.x)*.006;drag.x=e.clientX;}};
 const down=(e:PointerEvent)=>{drag.active=true;drag.x=e.clientX;el.setPointerCapture(e.pointerId);};const end=()=>{drag.active=false;};const leave=()=>{if(!drag.active)pointer={x:0,y:0};};
 el.addEventListener('pointermove',move);el.addEventListener('pointerdown',down);el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);el.addEventListener('pointerleave',leave);
 const draw=(now:number)=>{raf=requestAnimationFrame(draw);if(!visible||document.hidden||now-last<33)return;last=now;
 const stop=live.current.paused||reduced;if(!stop)t+=.012;
 const s=live.current.shape;knot.visible=s===0;orbitGroup.visible=s===1;hyper.visible=s===2;
 const scroll=reduced?0:Math.min(window.scrollY/900,1);
 const targetY=.4+(stop?0:t*.18)+angle+(reduced?0:pointer.x*.7)+scroll*.9;
 group.rotation.y+=(targetY-group.rotation.y)*.06;group.rotation.x+=((-.25+(reduced?0:pointer.y*.4)+scroll*.3)-group.rotation.x)*.06;
 group.rotation.z=Math.sin(t*.3)*.09;group.position.y=stop?0:Math.sin(t*.65)*.1;
 const scale=1-scroll*.12;group.scale.setScalar(scale);orbitGroup.rotation.z=t*.15;
 if(s===2){const a=t*.38+.35,b=t*.21+.3;
 vertices.forEach(([x,y,z,w],i)=>{const xx=x*Math.cos(a)-w*Math.sin(a),ww=x*Math.sin(a)+w*Math.cos(a),yy=y*Math.cos(b)-z*Math.sin(b),zz=y*Math.sin(b)+z*Math.cos(b);const perspective=2.8/(3.6-ww);points[i].set(xx*perspective,yy*perspective,zz*perspective);balls[i].position.copy(points[i]);});
 edges.forEach(({a,b,mesh})=>{mesh.position.copy(points[a]).add(points[b]).multiplyScalar(.5);temp.copy(points[b]).sub(points[a]);mesh.scale.y=temp.length();mesh.quaternion.setFromUnitVectors(up,temp.normalize());});}
 renderer.render(scene,camera);};raf=requestAnimationFrame(draw);
 const lost=(e:Event)=>{e.preventDefault();setFailed(true);};renderer.domElement.addEventListener('webglcontextlost',lost);
 cleanup=()=>{cancelAnimationFrame(raf);ro.disconnect();io.disconnect();el.removeEventListener('pointermove',move);el.removeEventListener('pointerdown',down);el.removeEventListener('pointerup',end);el.removeEventListener('pointercancel',end);el.removeEventListener('pointerleave',leave);renderer.domElement.removeEventListener('webglcontextlost',lost);knotGeo.dispose();ringGeo.dispose();edgeGeo.dispose();ballGeo.dispose();material.dispose();orange.dispose();env.dispose();tex.dispose();pm.dispose();renderer.dispose();renderer.domElement.remove();};
 }).catch(()=>setFailed(true));return()=>{disposed=true;cleanup();};
 },[reduced]);
 return <div className="spatial-host" ref={host} aria-hidden="true">{failed&&<div className="scene-fallback"><div/><div/><div/></div>}</div>;
}
