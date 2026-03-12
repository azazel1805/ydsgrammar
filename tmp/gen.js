function generateSimpleCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; 
    let code = 'YDS-';
    for(let i=0; i<4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    code += '-';
    for(let i=0; i<4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
}

const list = [];
for(let i=0; i<20; i++) list.push(generateSimpleCode());
console.log(list.join('\n'));
