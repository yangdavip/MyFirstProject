(function() {
    var b = 0.5 * (Math.sqrt(3) - 1);
    var e = (3 - Math.sqrt(3)) / 6;
    var c = 1 / 3;
    var f = 1 / 6;
    var d = (Math.sqrt(5) - 1) / 4;
    var g = (5 - Math.sqrt(5)) / 20;
    function h(k) {
        if (!k) {
            k = Math.random
        }
        this.p = a(k);
        this.perm = new Uint8Array(512);
        this.permMod12 = new Uint8Array(512);
        for (var j = 0; j < 512; j++) {
            this.perm[j] = this.p[j & 255];
            this.permMod12[j] = this.perm[j] % 12
        }
    }
    h.prototype = {
        grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]),
        grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
        noise2D: function(K, P) {
            var A = this.permMod12;
            var z = this.perm;
            var n = this.grad3;
            var w = 0;
            var x = 0;
            var y = 0;
            var B = (K + P) * b;
            var o = Math.floor(K + B);
            var r = Math.floor(P + B);
            var C = (o + r) * e;
            var H = o - C;
            var M = r - C;
            var G = K - H;
            var L = P - M;
            var p, u;
            if (G > L) {
                p = 1;
                u = 0
            } else {
                p = 0;
                u = 1
            }
            var I = G - p + e;
            var N = L - u + e;
            var J = G - 1 + 2 * e;
            var O = L - 1 + 2 * e;
            var q = o & 255;
            var v = r & 255;
            var D = 0.5 - G * G - L * L;
            if (D >= 0) {
                var k = A[q + z[v]] * 3;
                D *= D;
                w = D * D * (n[k] * G + n[k + 1] * L)
            }
            var E = 0.5 - I * I - N * N;
            if (E >= 0) {
                var l = A[q + p + z[v + u]] * 3;
                E *= E;
                x = E * E * (n[l] * I + n[l + 1] * N)
            }
            var F = 0.5 - J * J - O * O;
            if (F >= 0) {
                var m = A[q + 1 + z[v + 1]] * 3;
                F *= F;
                y = F * F * (n[m] * J + n[m + 1] * O)
            }
            return 70 * (w + x + y)
        },
        noise3D: function(V, ab, ah) {
            var J = this.permMod12;
            var I = this.perm;
            var p = this.grad3;
            var E, F, G, H;
            var K = (V + ab + ah) * c;
            var q = Math.floor(V + K);
            var w = Math.floor(ab + K);
            var A = Math.floor(ah + K);
            var L = (q + w + A) * f;
            var R = q - L;
            var X = w - L;
            var ad = A - L;
            var Q = V - R;
            var W = ab - X;
            var ac = ah - ad;
            var r, x, B;
            var u, y, C;
            if (Q >= W) {
                if (W >= ac) {
                    r = 1;
                    x = 0;
                    B = 0;
                    u = 1;
                    y = 1;
                    C = 0
                } else {
                    if (Q >= ac) {
                        r = 1;
                        x = 0;
                        B = 0;
                        u = 1;
                        y = 0;
                        C = 1
                    } else {
                        r = 0;
                        x = 0;
                        B = 1;
                        u = 1;
                        y = 0;
                        C = 1
                    }
                }
            } else {
                if (W < ac) {
                    r = 0;
                    x = 0;
                    B = 1;
                    u = 0;
                    y = 1;
                    C = 1
                } else {
                    if (Q < ac) {
                        r = 0;
                        x = 1;
                        B = 0;
                        u = 0;
                        y = 1;
                        C = 1
                    } else {
                        r = 0;
                        x = 1;
                        B = 0;
                        u = 1;
                        y = 1;
                        C = 0
                    }
                }
            }
            var S = Q - r + f;
            var Y = W - x + f;
            var ae = ac - B + f;
            var T = Q - u + 2 * f;
            var Z = W - y + 2 * f;
            var af = ac - C + 2 * f;
            var U = Q - 1 + 3 * f;
            var aa = W - 1 + 3 * f;
            var ag = ac - 1 + 3 * f;
            var v = q & 255;
            var z = w & 255;
            var D = A & 255;
            var M = 0.6 - Q * Q - W * W - ac * ac;
            if (M < 0) {
                E = 0
            } else {
                var l = J[v + I[z + I[D]]] * 3;
                M *= M;
                E = M * M * (p[l] * Q + p[l + 1] * W + p[l + 2] * ac)
            }
            var N = 0.6 - S * S - Y * Y - ae * ae;
            if (N < 0) {
                F = 0
            } else {
                var m = J[v + r + I[z + x + I[D + B]]] * 3;
                N *= N;
                F = N * N * (p[m] * S + p[m + 1] * Y + p[m + 2] * ae)
            }
            var O = 0.6 - T * T - Z * Z - af * af;
            if (O < 0) {
                G = 0
            } else {
                var n = J[v + u + I[z + y + I[D + C]]] * 3;
                O *= O;
                G = O * O * (p[n] * T + p[n + 1] * Z + p[n + 2] * af)
            }
            var P = 0.6 - U * U - aa * aa - ag * ag;
            if (P < 0) {
                H = 0
            } else {
                var o = J[v + 1 + I[z + 1 + I[D + 1]]] * 3;
                P *= P;
                H = P * P * (p[o] * U + p[o + 1] * aa + p[o + 2] * ag)
            }
            return 32 * (E + F + G + H)
        },
        noise4D: function(ar, az, aG, ak) {
            var Y = this.permMod12;
            var X = this.perm;
            var r = this.grad4;
            var S, T, U, V, W;
            var ad = (ar + az + aG + ak) * d;
            var u = Math.floor(ar + ad);
            var D = Math.floor(az + ad);
            var I = Math.floor(aG + ad);
            var N = Math.floor(ak + ad);
            var ae = (u + D + I + N) * g;
            var au = u - ae;
            var aB = D - ae;
            var aI = I - ae;
            var am = N - ae;
            var at = ar - au;
            var aA = az - aB;
            var aH = aG - aI;
            var al = ak - am;
            var aa = 0;
            var ab = 0;
            var ac = 0;
            var Z = 0;
            if (at > aA) {
                aa++
            } else {
                ab++
            }
            if (at > aH) {
                aa++
            } else {
                ac++
            }
            if (at > al) {
                aa++
            } else {
                Z++
            }
            if (aA > aH) {
                ab++
            } else {
                ac++
            }
            if (aA > al) {
                ab++
            } else {
                Z++
            }
            if (aH > al) {
                ac++
            } else {
                Z++
            }
            var v, E, J, O;
            var A, F, K, P;
            var B, G, L, Q;
            v = aa >= 3 ? 1 : 0;
            E = ab >= 3 ? 1 : 0;
            J = ac >= 3 ? 1 : 0;
            O = Z >= 3 ? 1 : 0;
            A = aa >= 2 ? 1 : 0;
            F = ab >= 2 ? 1 : 0;
            K = ac >= 2 ? 1 : 0;
            P = Z >= 2 ? 1 : 0;
            B = aa >= 1 ? 1 : 0;
            G = ab >= 1 ? 1 : 0;
            L = ac >= 1 ? 1 : 0;
            Q = Z >= 1 ? 1 : 0;
            var av = at - v + g;
            var aC = aA - E + g;
            var aJ = aH - J + g;
            var an = al - O + g;
            var aw = at - A + 2 * g;
            var aD = aA - F + 2 * g;
            var aK = aH - K + 2 * g;
            var ao = al - P + 2 * g;
            var ax = at - B + 3 * g;
            var aE = aA - G + 3 * g;
            var aL = aH - L + 3 * g;
            var ap = al - Q + 3 * g;
            var ay = at - 1 + 4 * g;
            var aF = aA - 1 + 4 * g;
            var aM = aH - 1 + 4 * g;
            var aq = al - 1 + 4 * g;
            var C = u & 255;
            var H = D & 255;
            var M = I & 255;
            var R = N & 255;
            var af = 0.6 - at * at - aA * aA - aH * aH - al * al;
            if (af < 0) {
                S = 0
            } else {
                var m = (X[C + X[H + X[M + X[R]]]] % 32) * 4;
                af *= af;
                S = af * af * (r[m] * at + r[m + 1] * aA + r[m + 2] * aH + r[m + 3] * al)
            }
            var ag = 0.6 - av * av - aC * aC - aJ * aJ - an * an;
            if (ag < 0) {
                T = 0
            } else {
                var n = (X[C + v + X[H + E + X[M + J + X[R + O]]]] % 32) * 4;
                ag *= ag;
                T = ag * ag * (r[n] * av + r[n + 1] * aC + r[n + 2] * aJ + r[n + 3] * an)
            }
            var ah = 0.6 - aw * aw - aD * aD - aK * aK - ao * ao;
            if (ah < 0) {
                U = 0
            } else {
                var o = (X[C + A + X[H + F + X[M + K + X[R + P]]]] % 32) * 4;
                ah *= ah;
                U = ah * ah * (r[o] * aw + r[o + 1] * aD + r[o + 2] * aK + r[o + 3] * ao)
            }
            var ai = 0.6 - ax * ax - aE * aE - aL * aL - ap * ap;
            if (ai < 0) {
                V = 0
            } else {
                var p = (X[C + B + X[H + G + X[M + L + X[R + Q]]]] % 32) * 4;
                ai *= ai;
                V = ai * ai * (r[p] * ax + r[p + 1] * aE + r[p + 2] * aL + r[p + 3] * ap)
            }
            var aj = 0.6 - ay * ay - aF * aF - aM * aM - aq * aq;
            if (aj < 0) {
                W = 0
            } else {
                var q = (X[C + 1 + X[H + 1 + X[M + 1 + X[R + 1]]]] % 32) * 4;
                aj *= aj;
                W = aj * aj * (r[q] * ay + r[q + 1] * aF + r[q + 2] * aM + r[q + 3] * aq)
            }
            return 27 * (S + T + U + V + W)
        }
    };
    function a(n) {
        var k;
        var l = new Uint8Array(256);
        for (k = 0; k < 256; k++) {
            l[k] = k
        }
        for (k = 0; k < 255; k++) {
            var m = k + ~~(n() * (256 - k));
            var j = l[k];
            l[k] = l[m];
            l[m] = j
        }
        return l
    }
    h._buildPermutationTable = a;
    if (typeof define !== "undefined" && define.amd) {
        define(function() {
            return h
        })
    }
    if (typeof exports !== "undefined") {
        exports.SimplexNoise = h
    } else {
        if (typeof window !== "undefined") {
            window.SimplexNoise = h
        }
    }
    if (typeof module !== "undefined") {
        module.exports = h
    }
}
)();
