import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{R as f}from"./index-oxIuDU2I.js";import{a as j,L as i}from"./LiquidGlassView-9SKA7IaG.js";import"./_commonjsHelpers-CqkleIqs.js";const w=(...s)=>s.filter(Boolean).join(" "),r=f.forwardRef(({spacing:s=0,className:g,style:y,children:b,...x},q)=>{const L={...y??{},"--lg-merge-spacing":`${s}px`};return e.jsx(j,{spacing:s,children:e.jsx("div",{ref:q,className:w("lg-container",g),style:L,...x,children:b})})});r.displayName="LiquidGlassContainerView";r.__docgenInfo={description:"",methods:[],displayName:"LiquidGlassContainerView",props:{spacing:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};const p=({children:s})=>e.jsx("div",{style:{padding:48,minHeight:260,background:"radial-gradient(circle at 80% 10%, #f7fafc, #e3ecf7 35%, #ccd9ef 90%)"},children:s}),a={width:120,height:120,borderRadius:60},C={title:"LiquidGlass/LiquidGlassContainerView",component:r,args:{spacing:20,style:{display:"flex",gap:16,alignItems:"center"}}},n={render:s=>e.jsx(p,{children:e.jsxs(r,{...s,children:[e.jsx(i,{style:a}),e.jsx(i,{style:a}),e.jsx(i,{style:a})]})})},t={args:{spacing:6},render:s=>e.jsx(p,{children:e.jsxs(r,{...s,children:[e.jsx(i,{style:a}),e.jsx(i,{style:a}),e.jsx(i,{style:a})]})})};var l,d,o;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <Frame>
      <LiquidGlassContainerView {...args}>
        <LiquidGlassView style={bubbleStyle} />
        <LiquidGlassView style={bubbleStyle} />
        <LiquidGlassView style={bubbleStyle} />
      </LiquidGlassContainerView>
    </Frame>
}`,...(o=(d=n.parameters)==null?void 0:d.docs)==null?void 0:o.source}}};var c,u,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    spacing: 6
  },
  render: args => <Frame>
      <LiquidGlassContainerView {...args}>
        <LiquidGlassView style={bubbleStyle} />
        <LiquidGlassView style={bubbleStyle} />
        <LiquidGlassView style={bubbleStyle} />
      </LiquidGlassContainerView>
    </Frame>
}`,...(m=(u=t.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};const F=["Merged","TightSpacing"];export{n as Merged,t as TightSpacing,F as __namedExportsOrder,C as default};
