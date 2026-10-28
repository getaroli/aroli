// Original terminal geometry. Cell bounds match hhea's 1884/-512 metrics.
export function terminalGlyphs({ add, P, line, polygon, circle, glyphPath, S, cell }: any) {
  const top=1884/S, bottom=-512/S, mid=(top+bottom)/2;
  const rect=(p:any,x:number,y:number,w:number,h:number)=>polygon(p,[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]);
  const put=(cp:number,p:any)=>add(`uni${cp.toString(16).toUpperCase()}`,cp,p);
  const branches: Record<string,string> = {
    '─':'LR','│':'UD','┌':'RD','┐':'LD','└':'RU','┘':'LU',
    '├':'URD','┤':'ULD','┬':'LRD','┴':'LRU','┼':'LRUD',
  };
  for(const [ch,dirs] of Object.entries(branches)) {
    const p=P();
    for(const dir of dirs) line(p,[300,mid],({L:[0,mid],R:[cell,mid],U:[300,top],D:[300,bottom]} as any)[dir],48);
    put(ch.codePointAt(0)!,p);
  }
  for(const [ch,sx,sy] of [['╭',1,-1],['╮',-1,-1],['╰',1,1],['╯',-1,1]] as const) {
    const p=P(), r=150, w=48;
    line(p,[300+sx*r,mid],[sx===1?cell:0,mid],w);
    line(p,[300,mid+sy*r],[300,sy===1?top:bottom],w);
    // Quarter-ring polygon, shared endpoints with the straight sections.
    const pts:[number,number][]=[];
    for(const radius of [r+w/2,r-w/2]) {
      const arc=Array.from({length:17},(_,i)=>{
        const a=i*Math.PI/32;
        return [300+sx*r-sx*radius*Math.cos(a),mid+sy*r-sy*radius*Math.sin(a)] as [number,number];
      });
      pts.push(...(radius>r?arc:arc.reverse()));
    }
    polygon(p,pts); put(ch.codePointAt(0),p);
  }
  const dotted=P();
  for(let i=0;i<4;i++) rect(dotted,276,bottom+i*(top-bottom)/4,48,(top-bottom)/8);
  put(0x254e,dotted);
  for(const [ch,dx,dy] of [['↑',0,1],['↓',0,-1],['←',-1,0],['→',1,0]] as const) {
    const p=P(), tip:[number,number]=[300+dx*210,350+dy*340];
    line(p,[300-dx*210,350-dy*340],tip);
    for(const side of [-1,1]) line(p,tip,[tip[0]-dx*180+dy*side*150,tip[1]-dy*180+dx*side*150]);
    put(ch.codePointAt(0),p);
  }
  const enter=P();
  for(const [a,b] of [[ [470,650],[470,280] ],[[470,280],[110,280]],[[110,280],[260,430]],[[110,280],[260,130]]] as any) line(enter,a,b);
  put(0x21b5,enter);
  const square=P(); rect(square,100,100,400,400); put(0x25a0,square);
  // Braille graphs use all 256 patterns, including the empty pattern.
  const dots=[[150,3],[150,2],[150,1],[450,3],[450,2],[450,1],[150,0],[450,0]];
  for(let bits=0;bits<256;bits++) {
    const p=P(); dots.forEach(([x,row],bit)=>{if(bits&(1<<bit)) circle(p,[x,bottom+(row+.5)*(top-bottom)/4],64);});
    put(0x2800+bits,p);
  }
  const quarters:Record<string,number>={'▀':3,'▄':12,'█':15,'▌':5,'▐':10,'▖':4,'▗':8,'▘':1,'▙':13,'▚':9,'▛':7,'▜':11,'▝':2,'▞':6,'▟':14};
  for(const [ch,bits] of Object.entries(quarters)) {
    const p=P(); for(let bit=0;bit<4;bit++) if(bits&(1<<bit)) rect(p,(bit%2)*300,bit<2?mid:bottom,300,(top-bottom)/2);
    put(ch.codePointAt(0)!,p);
  }
  for(let level=1;level<=3;level++) {
    const p=P(); for(let y=0;y<12;y++) for(let x=0;x<6;x++) if((x+y*3)%4<level) rect(p,x*100,bottom+y*(top-bottom)/12,100,(top-bottom)/12);
    put(0x2590+level,p);
  }
  const supers='⁰¹²³⁴⁵⁶⁷⁸⁹';
  for(let n=0;n<10;n++) {
    const p=glyphPath(String(n));
    for(const c of p.commands) for(const key of ['x','x1','x2','y','y1','y2']) if(key in c) c[key]=c[key]*.6+(key.startsWith('x')?120*S:420*S);
    put(supers.codePointAt(n)!,p);
  }
}
