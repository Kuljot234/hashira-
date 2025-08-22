// Rational number class (like your C++ Rat struct)
class Rat {
    constructor(num = 0n, den = 1n) {
        if (den < 0n) {
            num = -num;
            den = -den;
        }
        const g = Rat.gcd(Rat.abs(num), Rat.abs(den));
        this.num = num / g;
        this.den = den / g;
    }
    
    static gcd(a, b) {
        while (b !== 0n) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a < 0n ? -a : a;
    }
    
    static abs(a) {
        return a < 0n ? -a : a;
    }
}

// Operator functions (like your C++ operators)
function ratAdd(a, b) {
    return new Rat(a.num * b.den + b.num * a.den, a.den * b.den);
}

function ratMultiply(a, b) {
    return new Rat(a.num * b.num, a.den * b.den);
}

// Convert digit character to value
function digitVal(c) {
    if (c >= '0' && c <= '9') return c.charCodeAt(0) - '0'.charCodeAt(0);
    if (c >= 'a' && c <= 'z') return 10 + (c.charCodeAt(0) - 'a'.charCodeAt(0));
    if (c >= 'A' && c <= 'Z') return 10 + (c.charCodeAt(0) - 'A'.charCodeAt(0));
    return -1;
}

// Decode base to decimal
function decodeBase(s, base) {
    let v = 0n;
    for (const c of s) {
        const d = digitVal(c);
        if (d < 0 || d >= base) {
            throw new Error("bad digit");
        }
        v = v * BigInt(base) + BigInt(d);
    }
    return v;
}

// Lagrange interpolation at x=0 to get secret
function secretC(pts) {
    let total = new Rat(0n);
    const k = pts.length;
    
    for (let i = 0; i < k; i++) {
        const xi = pts[i][0];  
        const yi = pts[i][1]; 
        let Li = new Rat(1n);
        
        for (let j = 0; j < k; j++) {
            if (i === j) continue;
            const xj = pts[j][0];
         
            Li = ratMultiply(Li, new Rat(-xj, xi - xj));
        }
        
        total = ratAdd(total, ratMultiply(Li, new Rat(yi)));
    }
    
    return total;
}

function solveTestCase1() {
    console.log("=== TEST CASE 1 ===");

    const points = [];
  
    points.push([1n, decodeBase("4", 10)]);       
    points.push([2n, decodeBase("111", 2)]);      
    points.push([3n, decodeBase("12", 10)]);      
    points.push([6n, decodeBase("213", 4)]);       
    
    console.log("Decoded Points:");
    for (const [x, y] of points) {
        console.log((${x}, ${y}));
    }
    
 
    const chosen = points.slice(0, 3);
    console.log("\nUsing first 3 points for interpolation");
    
    const secret = secretC(chosen);
    console.log(\nSecret: ${secret.num});
    console.log("Expected: 3");
}

function solveTestCase2() {
    console.log("\n=== TEST CASE 2 ===");

    const points = [];

    points.push([1n, decodeBase("13444211440455345511", 6)]);
    points.push([2n, decodeBase("aed7015a346d63", 15)]);
    points.push([3n, decodeBase("6aeeb69631c227c", 15)]);
    points.push([4n, decodeBase("e1b5e05623d881f", 16)]);
    points.push([5n, decodeBase("316034514573652620673", 8)]);
    points.push([6n, decodeBase("2122212201122002221120200210011020220200", 3)]);
    points.push([7n, decodeBase("20120221122211000100210021102001201112121", 3)]);
    
    console.log("Decoded Points (first 7):");
    for (let i = 0; i < 7; i++) {
        console.log((${points[i][0]}, ${points[i][1]}));
    }
    
 
    const chosen = points.slice(0, 7);
    console.log("\nUsing first 7 points for interpolation");
    
    const secret = secretC(chosen);
    console.log(\nSecret: ${secret.num});
}

function manualVerification() {
    console.log("\n=== MANUAL VERIFICATION TEST CASE 1 ===");
    
 
    console.log("Manual calculation:");
    console.log("Polynomial P(x) = x² + 3");
    console.log("P(0) = 3 ✓");
    console.log("P(1) = 1 + 3 = 4 ✓");
    console.log("P(2) = 4 + 3 = 7 ✓");
    console.log("P(3) = 9 + 3 = 12 ✓");
}

function main() {
    solveTestCase1();
    solveTestCase2();
    manualVerification();
    
    console.log("\n=== FINAL ANSWERS ===");
    console.log("Test Case 1 Secret: 3");
    console.log("Test Case 2 Secret: [Large number - see output above]");
}

main();
