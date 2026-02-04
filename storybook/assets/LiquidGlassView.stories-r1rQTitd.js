import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{L as s}from"./LiquidGlassView-9SKA7IaG.js";import"./index-oxIuDU2I.js";import"./_commonjsHelpers-CqkleIqs.js";const a=({children:r})=>e.jsx("div",{style:{padding:48,minHeight:240,background:"radial-gradient(circle at 20% 20%, #f6f6ff, #e2e8f4 40%, #c9d4ea 90%)"},children:r}),m={width:240,height:120,borderRadius:24,padding:20,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"ui-sans-serif, system-ui, sans-serif"},T={...m,"--lg-backdrop-filter":"url(#lg-displacement) blur(18px) saturate(1.6)"},I=()=>e.jsx("svg",{width:"0",height:"0",style:{position:"absolute"},"aria-hidden":"true",children:e.jsxs("filter",{id:"lg-displacement",children:[e.jsx("feTurbulence",{type:"fractalNoise",baseFrequency:"0.015",numOctaves:2,result:"noise"}),e.jsx("feDisplacementMap",{in:"SourceGraphic",in2:"noise",scale:"18",xChannelSelector:"R",yChannelSelector:"G"}),e.jsx("feGaussianBlur",{stdDeviation:"2"})]})}),B={title:"LiquidGlass/LiquidGlassView",component:s,args:{effect:"regular",interactive:!1,colorScheme:"system",style:m,children:e.jsx("div",{children:"Liquid glass"})},argTypes:{effect:{control:{type:"select"},options:["regular","clear","none"]},colorScheme:{control:{type:"select"},options:["system","light","dark"]}}},n={render:r=>e.jsx(a,{children:e.jsx(s,{...r})})},t={args:{effect:"clear"},render:r=>e.jsx(a,{children:e.jsx(s,{...r})})},i={args:{effect:"none"},render:r=>e.jsx(a,{children:e.jsx(s,{...r})})},c={args:{interactive:!0},render:r=>e.jsx(a,{children:e.jsx(s,{...r})})},o={args:{tintColor:"rgba(0, 120, 255, 0.4)"},render:r=>e.jsx(a,{children:e.jsx(s,{...r})})},l={args:{colorScheme:"dark",style:{...m,color:"#f3f5ff"}},render:r=>e.jsx(a,{children:e.jsx(s,{...r})})},d={args:{effect:"clear",style:T},render:r=>e.jsxs(a,{children:[e.jsx(I,{}),e.jsx(s,{...r,children:e.jsx("div",{children:"Displacement filter"})})]})};var p,u,g;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <Frame>
      <LiquidGlassView {...args} />
    </Frame>
}`,...(g=(u=n.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var f,h,x;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    effect: 'clear'
  },
  render: args => <Frame>
      <LiquidGlassView {...args} />
    </Frame>
}`,...(x=(h=t.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var j,y,S;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    effect: 'none'
  },
  render: args => <Frame>
      <LiquidGlassView {...args} />
    </Frame>
}`,...(S=(y=i.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var F,G,q;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    interactive: true
  },
  render: args => <Frame>
      <LiquidGlassView {...args} />
    </Frame>
}`,...(q=(G=c.parameters)==null?void 0:G.docs)==null?void 0:q.source}}};var v,L,w;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    tintColor: 'rgba(0, 120, 255, 0.4)'
  },
  render: args => <Frame>
      <LiquidGlassView {...args} />
    </Frame>
}`,...(w=(L=o.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};var b,D,V;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    colorScheme: 'dark',
    style: {
      ...baseStyle,
      color: '#f3f5ff'
    }
  },
  render: args => <Frame>
      <LiquidGlassView {...args} />
    </Frame>
}`,...(V=(D=l.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};var k,C,R;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    effect: 'clear',
    style: displacementStyle
  },
  render: args => <Frame>
      <DisplacementFilter />
      <LiquidGlassView {...args}>
        <div>Displacement filter</div>
      </LiquidGlassView>
    </Frame>
}`,...(R=(C=d.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};const H=["Regular","Clear","None","Interactive","Tinted","DarkScheme","Displacement"];export{t as Clear,l as DarkScheme,d as Displacement,c as Interactive,i as None,n as Regular,o as Tinted,H as __namedExportsOrder,B as default};
