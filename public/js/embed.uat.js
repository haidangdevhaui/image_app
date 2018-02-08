/* AllAboutMe.Js @branch develop
 @env uat @version 2.0.0 @UTC 2018-01-23 16:20 */
! function() {
    var e, t, n, r, o, a, l, d, c, u, p, h, g, f, m, v, b, y, w, x, C, S, E, T, L, I, D, A, M, B, P, H, N, z, O, U, R, F, G, W, V, q, X, Y, K, Q, J, Z, ee, te, ne;
    ! function() {
        function ie(e, t, n) {
            this.$id = e, this.$tip = $("#" + e.attr("aria-describedby")), this.mouseover = !1, this.focus = !1, this.dismissed = !1, this.position = {
                top: n,
                left: t
            }, this.bindHandlers(), this.init()
        }

        function re(e, t, n) {
            function i(e) {
                return e.touches ? e.touches.length : 1
            }

            function r(e) {
                if (e = e || window.event, O) {
                    for (var t, n = [], i = 0, r = e.touches.length; r > i; i++) t = e.touches[i], n.push({
                        x: t.pageX,
                        y: t.pageY
                    });
                    return n
                }
                var o = document,
                    a = o.body;
                return [{
                    x: e.pageX || e.clientX + (o && o.scrollLeft || a && a.scrollLeft || 0) - (o && o.clientLeft || a && o.clientLeft || 0),
                    y: e.pageY || e.clientY + (o && o.scrollTop || a && a.scrollTop || 0) - (o && o.clientTop || a && o.clientTop || 0)
                }]
            }

            function o(e, t) {
                return 180 * Math.atan2(t.y - e.y, t.x - e.x) / Math.PI
            }

            function a(e, t) {
                var n = t.x - e.x,
                    i = t.y - e.y;
                return Math.sqrt(n * n + i * i)
            }

            function s(e, t) {
                if (2 == e.length && 2 == t.length) {
                    var n = a(e[0], e[1]),
                        i = a(t[0], t[1]);
                    return i / n
                }
                return 0
            }

            function l(e, t) {
                if (2 == e.length && 2 == t.length) {
                    var n = o(e[1], e[0]),
                        i = o(t[1], t[0]);
                    return i - n
                }
                return 0
            }

            function d(e, t) {
                t.touches = r(t.originalEvent), t.type = e, m(y["on" + e]) && y["on" + e].call(y, t)
            }

            function c(e) {
                e = e || window.event, e.preventDefault ? (e.preventDefault(), e.stopPropagation()) : (e.returnValue = !1, e.cancelBubble = !0)
            }

            function u() {
                _ = {}, I = !1, L = 0, k = 0, E = 0, D = null
            }

            function p(n) {
                switch (n.type) {
                    case "mousedown":
                    case "touchstart":
                        _.start = r(n), M = (new Date).getTime(), L = i(n), I = !0, x = n;
                        var o = e.getBoundingClientRect(),
                            a = e.clientTop || document.body.clientTop || 0,
                            p = e.clientLeft || document.body.clientLeft || 0,
                            h = window.pageYOffset || e.scrollTop || document.body.scrollTop,
                            g = window.pageXOffset || e.scrollLeft || document.body.scrollLeft;
                        N = {
                            top: o.top + h - a,
                            left: o.left + g - p
                        }, z = !0, U.hold(n), t.prevent_default && c(n);
                        break;
                    case "mousemove":
                    case "touchmove":
                        if (!z) return !1;
                        C = n, _.move = r(n), U.transform(n) || U.drag(n);
                        break;
                    case "mouseup":
                    case "mouseout":
                    case "touchcancel":
                    case "touchend":
                        if (!z || "transform" != D && n.touches && n.touches.length > 0) return !1;
                        z = !1, S = n, U.swipe(n), "drag" == D ? d("dragend", {
                            originalEvent: n,
                            direction: T,
                            distance: k,
                            angle: E
                        }) : "transform" == D ? d("transformend", {
                            originalEvent: n,
                            position: _.center,
                            scale: s(_.start, _.move),
                            rotation: l(_.start, _.move)
                        }) : U.tap(x), A = D, d("release", {
                            originalEvent: n,
                            gesture: D,
                            position: _.move || _.start
                        }), u()
                }
            }

            function h(t) {
                g(e, t.relatedTarget) || p(t)
            }

            function g(e, t) {
                if (!t && window.event && window.event.toElement && (t = window.event.toElement), e === t) return !0;
                if (t)
                    for (var n = t.parentNode; null !== n;) {
                        if (n === e) return !0;
                        n = n.parentNode
                    }
                return !1
            }

            function f(e, t) {
                var n = {};
                if (!t) return e;
                for (var i in e) i in t ? n[i] = t[i] : n[i] = e[i];
                return n
            }

            function m(e) {
                return "[object Function]" == Object.prototype.toString.call(e)
            }

            function v(e, t, n) {
                t = t.split(" ");
                for (var i = 0, r = t.length; r > i; i++) e.addEventListener ? e.addEventListener(t[i], n, !1) : document.attachEvent && e.attachEvent("on" + t[i], n)
            }

            function b(e, t, n) {
                t = t.split(" ");
                for (var i = 0, r = t.length; r > i; i++) e.removeEventListener ? e.removeEventListener(t[i], n, !1) : document.detachEvent && e.detachEvent("on" + t[i], n)
            }
            var y = this,
                w = {
                    prevent_default: !1,
                    css_hacks: !0,
                    swipe: !0,
                    swipe_time: 200,
                    swipe_min_distance: 20,
                    drag: !0,
                    drag_vertical: !0,
                    drag_horizontal: !0,
                    drag_min_distance: 20,
                    transform: !0,
                    scale_treshold: .1,
                    rotation_treshold: 15,
                    tap: !0,
                    tap_double: !0,
                    tap_max_interval: 300,
                    tap_max_distance: 10,
                    tap_double_distance: 20,
                    hold: !0,
                    hold_timeout: 500
                };
            t = f(w, t),
                function() {
                    if (!t.css_hacks) return !1;
                    for (var n = ["webkit", "moz", "ms", "o", ""], i = {
                            userSelect: "none",
                            touchCallout: "none",
                            userDrag: "none",
                            tapHighlightColor: "rgba(0,0,0,0)"
                        }, r = "", o = 0; o < n.length; o++)
                        for (var a in i) r = a, n[o] && (r = n[o] + r.substring(0, 1).toUpperCase() + r.substring(1)), e.style[r] = i[a]
                }();
            var x, C, S, k = 0,
                E = 0,
                T = 0,
                _ = {},
                L = 0,
                I = !1,
                D = null,
                A = null,
                M = null,
                B = {
                    x: 0,
                    y: 0
                },
                P = null,
                H = null,
                N = {},
                z = !1,
                O = "ontouchstart" in window;
            this.option = function(e, i) {
                return i != n && (t[e] = i), t[e]
            }, this.getDirectionFromAngle = function(e) {
                var t, n, i = {
                    down: e >= 45 && 135 > e,
                    left: e >= 135 || -135 >= e,
                    up: -45 > e && e > -135,
                    right: e >= -45 && 45 >= e
                };
                for (n in i)
                    if (i[n]) {
                        t = n;
                        break
                    }
                return t
            }, this.destroy = function() {
                O ? b(e, "touchstart touchmove touchend touchcancel", p) : (b(e, "mouseup mousedown mousemove", p), b(e, "mouseout", h))
            };
            var U = {
                hold: function(e) {
                    t.hold && (D = "hold", clearTimeout(H), H = setTimeout(function() {
                        "hold" == D && d("hold", {
                            originalEvent: e,
                            position: _.start
                        })
                    }, t.hold_timeout))
                },
                swipe: function(e) {
                    if (_.move) {
                        var n = _.move[0].x - _.start[0].x,
                            i = _.move[0].y - _.start[0].y;
                        k = Math.sqrt(n * n + i * i);
                        var r = (new Date).getTime(),
                            a = r - M;
                        if (t.swipe && t.swipe_time > a && k > t.swipe_min_distance) {
                            E = o(_.start[0], _.move[0]), T = y.getDirectionFromAngle(E), D = "swipe";
                            var s = {
                                    x: _.move[0].x - N.left,
                                    y: _.move[0].y - N.top
                                },
                                l = {
                                    originalEvent: e,
                                    position: s,
                                    direction: T,
                                    distance: k,
                                    distanceX: n,
                                    distanceY: i,
                                    angle: E
                                };
                            d("swipe", l)
                        }
                    }
                },
                drag: function(e) {
                    var n = _.move[0].x - _.start[0].x,
                        i = _.move[0].y - _.start[0].y;
                    if (k = Math.sqrt(n * n + i * i), t.drag && k > t.drag_min_distance || "drag" == D) {
                        E = o(_.start[0], _.move[0]), T = y.getDirectionFromAngle(E);
                        var r = "up" == T || "down" == T;
                        if ((r && !t.drag_vertical || !r && !t.drag_horizontal) && k > t.drag_min_distance) return;
                        D = "drag";
                        var a = {
                                x: _.move[0].x - N.left,
                                y: _.move[0].y - N.top
                            },
                            s = {
                                originalEvent: e,
                                position: a,
                                direction: T,
                                distance: k,
                                distanceX: n,
                                distanceY: i,
                                angle: E
                            };
                        I && (d("dragstart", s), I = !1), d("drag", s), c(e)
                    }
                },
                transform: function(e) {
                    if (t.transform) {
                        if (2 != i(e)) return !1;
                        var n = l(_.start, _.move),
                            r = s(_.start, _.move);
                        if ("drag" != D && ("transform" == D || Math.abs(1 - r) > t.scale_treshold || Math.abs(n) > t.rotation_treshold)) {
                            D = "transform", _.center = {
                                x: (_.move[0].x + _.move[1].x) / 2 - N.left,
                                y: (_.move[0].y + _.move[1].y) / 2 - N.top
                            };
                            var o = {
                                originalEvent: e,
                                position: _.center,
                                scale: r,
                                rotation: n
                            };
                            return I && (d("transformstart", o), I = !1), d("transform", o), c(e), !0
                        }
                    }
                    return !1
                },
                tap: function(e) {
                    var n = (new Date).getTime(),
                        i = n - M;
                    if (!t.hold || t.hold && t.hold_timeout > i) {
                        var r = function() {
                            if (B && t.tap_double && "tap" == A && M - P < t.tap_max_interval) {
                                var e = Math.abs(B[0].x - _.start[0].x),
                                    n = Math.abs(B[0].y - _.start[0].y);
                                return B && _.start && Math.max(e, n) < t.tap_double_distance
                            }
                            return !1
                        }();
                        if (r) D = "double_tap", P = null, d("doubletap", {
                            originalEvent: e,
                            position: _.start
                        }), c(e);
                        else {
                            var o = _.move ? Math.abs(_.move[0].x - _.start[0].x) : 0,
                                a = _.move ? Math.abs(_.move[0].y - _.start[0].y) : 0;
                            k = Math.max(o, a), k < t.tap_max_distance && (D = "tap", P = n, B = _.start, t.tap && (d("tap", {
                                originalEvent: e,
                                position: _.start
                            }), c(e)))
                        }
                    }
                }
            };
            O ? v(e, "touchstart touchmove touchend touchcancel", p) : (v(e, "mouseup mousedown mousemove", p), v(e, "mouseout", h))
        }
        e = void 0, t = void 0, n = void 0,
            function(e, t) {
                function n(e) {
                    var t = e.length,
                        n = ce.type(e);
                    return ce.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
                }

                function i(e) {
                    var t = Ee[e] = {};
                    return ce.each(e.match(pe) || [], function(e, n) {
                        t[n] = !0
                    }), t
                }

                function o(e, n, i, r) {
                    if (ce.acceptData(e)) {
                        var o, a, s = ce.expando,
                            l = "string" == typeof n,
                            d = e.nodeType,
                            c = d ? ce.cache : e,
                            u = d ? e[s] : e[s] && s;
                        if (u && c[u] && (r || c[u].data) || !l || i !== t) return u || (d ? e[s] = u = te.pop() || ce.guid++ : u = s), c[u] || (c[u] = {}, d || (c[u].toJSON = ce.noop)), ("object" == typeof n || "function" == typeof n) && (r ? c[u] = ce.extend(c[u], n) : c[u].data = ce.extend(c[u].data, n)), o = c[u], r || (o.data || (o.data = {}), o = o.data), i !== t && (o[ce.camelCase(n)] = i), l ? (a = o[n], null == a && (a = o[ce.camelCase(n)])) : a = o, a
                    }
                }

                function a(e, t, n) {
                    if (ce.acceptData(e)) {
                        var i, r, o, a = e.nodeType,
                            s = a ? ce.cache : e,
                            d = a ? e[ce.expando] : ce.expando;
                        if (s[d]) {
                            if (t && (o = n ? s[d] : s[d].data)) {
                                ce.isArray(t) ? t = t.concat(ce.map(t, ce.camelCase)) : t in o ? t = [t] : (t = ce.camelCase(t), t = t in o ? [t] : t.split(" "));
                                for (i = 0, r = t.length; r > i; i++) delete o[t[i]];
                                if (!(n ? l : ce.isEmptyObject)(o)) return
                            }(n || (delete s[d].data, l(s[d]))) && (a ? ce.cleanData([e], !0) : ce.support.deleteExpando || s != s.window ? delete s[d] : s[d] = null)
                        }
                    }
                }

                function s(e, n, i) {
                    if (i === t && 1 === e.nodeType) {
                        var r = "data-" + n.replace(_e, "-$1").toLowerCase();
                        if (i = e.getAttribute(r), "string" == typeof i) {
                            try {
                                i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : Te.test(i) ? ce.parseJSON(i) : i
                            } catch (o) {}
                            ce.data(e, n, i)
                        } else i = t
                    }
                    return i
                }

                function l(e) {
                    var t;
                    for (t in e)
                        if (("data" !== t || !ce.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
                    return !0
                }

                function d() {
                    return !0
                }

                function c() {
                    return !1
                }

                function u(e, t) {
                    do e = e[t]; while (e && 1 !== e.nodeType);
                    return e
                }

                function p(e, t, n) {
                    if (t = t || 0, ce.isFunction(t)) return ce.grep(e, function(e, i) {
                        var r = !!t.call(e, i, e);
                        return r === n
                    });
                    if (t.nodeType) return ce.grep(e, function(e) {
                        return e === t === n
                    });
                    if ("string" == typeof t) {
                        var i = ce.grep(e, function(e) {
                            return 1 === e.nodeType
                        });
                        if (We.test(t)) return ce.filter(t, i, !n);
                        t = ce.filter(t, i)
                    }
                    return ce.grep(e, function(e) {
                        return ce.inArray(e, t) >= 0 === n
                    })
                }

                function h(e) {
                    var t = Xe.split("|"),
                        n = e.createDocumentFragment();
                    if (n.createElement)
                        for (; t.length;) n.createElement(t.pop());
                    return n
                }

                function g(e, t) {
                    return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
                }

                function f(e) {
                    var t = e.getAttributeNode("type");
                    return e.type = (t && t.specified) + "/" + e.type, e
                }

                function m(e) {
                    var t = at.exec(e.type);
                    return t ? e.type = t[1] : e.removeAttribute("type"), e
                }

                function v(e, t) {
                    for (var n, i = 0; null != (n = e[i]); i++) ce._data(n, "globalEval", !t || ce._data(t[i], "globalEval"))
                }

                function b(e, t) {
                    if (1 === t.nodeType && ce.hasData(e)) {
                        var n, i, r, o = ce._data(e),
                            a = ce._data(t, o),
                            s = o.events;
                        if (s) {
                            delete a.handle, a.events = {};
                            for (n in s)
                                for (i = 0, r = s[n].length; r > i; i++) ce.event.add(t, n, s[n][i])
                        }
                        a.data && (a.data = ce.extend({}, a.data))
                    }
                }

                function y(e, t) {
                    var n, i, r;
                    if (1 === t.nodeType) {
                        if (n = t.nodeName.toLowerCase(), !ce.support.noCloneEvent && t[ce.expando]) {
                            r = ce._data(t);
                            for (i in r.events) ce.removeEvent(t, i, r.handle);
                            t.removeAttribute(ce.expando)
                        }
                        "script" === n && t.text !== e.text ? (f(t).text = e.text, m(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ce.support.html5Clone && e.innerHTML && !ce.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && it.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
                    }
                }

                function w(e, n) {
                    var i, r, o = 0,
                        a = typeof e.getElementsByTagName !== Y ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== Y ? e.querySelectorAll(n || "*") : t;
                    if (!a)
                        for (a = [], i = e.childNodes || e; null != (r = i[o]); o++) !n || ce.nodeName(r, n) ? a.push(r) : ce.merge(a, w(r, n));
                    return n === t || n && ce.nodeName(e, n) ? ce.merge([e], a) : a
                }

                function x(e) {
                    it.test(e.type) && (e.defaultChecked = e.checked)
                }

                function C(e, t) {
                    if (t in e) return t;
                    for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = Tt.length; r--;)
                        if (t = Tt[r] + n, t in e) return t;
                    return i
                }

                function S(e, t) {
                    return e = t || e, "none" === ce.css(e, "display") || !ce.contains(e.ownerDocument, e)
                }

                function k(e, t) {
                    for (var n, i, r, o = [], a = 0, s = e.length; s > a; a++) i = e[a], i.style && (o[a] = ce._data(i, "olddisplay"), n = i.style.display, t ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && S(i) && (o[a] = ce._data(i, "olddisplay", L(i.nodeName)))) : o[a] || (r = S(i), (n && "none" !== n || !r) && ce._data(i, "olddisplay", r ? n : ce.css(i, "display"))));
                    for (a = 0; s > a; a++) i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "" : "none"));
                    return e
                }

                function E(e, t, n) {
                    var i = yt.exec(t);
                    return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
                }

                function T(e, t, n, i, r) {
                    for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += ce.css(e, n + Et[o], !0, r)), i ? ("content" === n && (a -= ce.css(e, "padding" + Et[o], !0, r)), "margin" !== n && (a -= ce.css(e, "border" + Et[o] + "Width", !0, r))) : (a += ce.css(e, "padding" + Et[o], !0, r), "padding" !== n && (a += ce.css(e, "border" + Et[o] + "Width", !0, r)));
                    return a
                }

                function _(e, t, n) {
                    var i = !0,
                        r = "width" === t ? e.offsetWidth : e.offsetHeight,
                        o = pt(e),
                        a = ce.support.boxSizing && "border-box" === ce.css(e, "boxSizing", !1, o);
                    if (0 >= r || null == r) {
                        if (r = ht(e, t, o), (0 > r || null == r) && (r = e.style[t]), wt.test(r)) return r;
                        i = a && (ce.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
                    }
                    return r + T(e, t, n || (a ? "border" : "content"), i, o) + "px"
                }

                function L(e) {
                    var t = K,
                        n = Ct[e];
                    return n || (n = I(e, t), "none" !== n && n || (ut = (ut || ce("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (ut[0].contentWindow || ut[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = I(e, t), ut.detach()), Ct[e] = n), n
                }

                function I(e, t) {
                    var n = ce(t.createElement(e)).appendTo(t.body),
                        i = ce.css(n[0], "display");
                    return n.remove(), i
                }

                function D(e, t, n, i) {
                    var r;
                    if (ce.isArray(t)) ce.each(t, function(t, r) {
                        n || Lt.test(e) ? i(e, r) : D(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
                    });
                    else if (n || "object" !== ce.type(t)) i(e, t);
                    else
                        for (r in t) D(e + "[" + r + "]", t[r], n, i)
                }

                function A(e) {
                    return function(t, n) {
                        "string" != typeof t && (n = t, t = "*");
                        var i, r = 0,
                            o = t.toLowerCase().match(pe) || [];
                        if (ce.isFunction(n))
                            for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
                    }
                }

                function M(e, t, n, i) {
                    function r(s) {
                        var l;
                        return o[s] = !0, ce.each(e[s] || [], function(e, s) {
                            var d = s(t, n, i);
                            return "string" != typeof d || a || o[d] ? a ? !(l = d) : void 0 : (t.dataTypes.unshift(d), r(d), !1)
                        }), l
                    }
                    var o = {},
                        a = e === Wt;
                    return r(t.dataTypes[0]) || !o["*"] && r("*")
                }

                function P(e, n) {
                    var i, r, o = ce.ajaxSettings.flatOptions || {};
                    for (r in n) n[r] !== t && ((o[r] ? e : i || (i = {}))[r] = n[r]);
                    return i && ce.extend(!0, e, i), e
                }

                function H(e, n, i) {
                    var r, o, a, s, l = e.contents,
                        d = e.dataTypes,
                        c = e.responseFields;
                    for (s in c) s in i && (n[c[s]] = i[s]);
                    for (;
                        "*" === d[0];) d.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
                    if (o)
                        for (s in l)
                            if (l[s] && l[s].test(o)) {
                                d.unshift(s);
                                break
                            }
                    if (d[0] in i) a = d[0];
                    else {
                        for (s in i) {
                            if (!d[0] || e.converters[s + " " + d[0]]) {
                                a = s;
                                break
                            }
                            r || (r = s)
                        }
                        a = a || r
                    }
                    return a ? (a !== d[0] && d.unshift(a), i[a]) : void 0
                }

                function N(e, t) {
                    var n, i, r, o, a = {},
                        s = 0,
                        l = e.dataTypes.slice(),
                        d = l[0];
                    if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), l[1])
                        for (r in e.converters) a[r.toLowerCase()] = e.converters[r];
                    for (; i = l[++s];)
                        if ("*" !== i) {
                            if ("*" !== d && d !== i) {
                                if (r = a[d + " " + i] || a["* " + i], !r)
                                    for (n in a)
                                        if (o = n.split(" "), o[1] === i && (r = a[d + " " + o[0]] || a["* " + o[0]])) {
                                            r === !0 ? r = a[n] : a[n] !== !0 && (i = o[0], l.splice(s--, 0, i));
                                            break
                                        }
                                if (r !== !0)
                                    if (r && e["throws"]) t = r(t);
                                    else try {
                                        t = r(t)
                                    } catch (c) {
                                        return {
                                            state: "parsererror",
                                            error: r ? c : "No conversion from " + d + " to " + i
                                        }
                                    }
                            }
                            d = i
                        }
                    return {
                        state: "success",
                        data: t
                    }
                }

                function z() {
                    try {
                        return new e.XMLHttpRequest
                    } catch (t) {}
                }

                function O() {
                    try {
                        return new e.ActiveXObject("Microsoft.XMLHTTP")
                    } catch (t) {}
                }

                function U() {
                    return setTimeout(function() {
                        en = t
                    }), en = ce.now()
                }

                function $(e, t) {
                    ce.each(t, function(t, n) {
                        for (var i = (sn[t] || []).concat(sn["*"]), r = 0, o = i.length; o > r; r++)
                            if (i[r].call(e, t, n)) return
                    })
                }

                function R(e, t, n) {
                    var i, r, o = 0,
                        a = an.length,
                        s = ce.Deferred().always(function() {
                            delete l.elem
                        }),
                        l = function() {
                            if (r) return !1;
                            for (var t = en || U(), n = Math.max(0, d.startTime + d.duration - t), i = n / d.duration || 0, o = 1 - i, a = 0, l = d.tweens.length; l > a; a++) d.tweens[a].run(o);
                            return s.notifyWith(e, [d, o, n]), 1 > o && l ? n : (s.resolveWith(e, [d]), !1)
                        },
                        d = s.promise({
                            elem: e,
                            props: ce.extend({}, t),
                            opts: ce.extend(!0, {
                                specialEasing: {}
                            }, n),
                            originalProperties: t,
                            originalOptions: n,
                            startTime: en || U(),
                            duration: n.duration,
                            tweens: [],
                            createTween: function(t, n) {
                                var i = ce.Tween(e, d.opts, t, n, d.opts.specialEasing[t] || d.opts.easing);
                                return d.tweens.push(i), i
                            },
                            stop: function(t) {
                                var n = 0,
                                    i = t ? d.tweens.length : 0;
                                if (r) return this;
                                for (r = !0; i > n; n++) d.tweens[n].run(1);
                                return t ? s.resolveWith(e, [d, t]) : s.rejectWith(e, [d, t]), this
                            }
                        }),
                        c = d.props;
                    for (F(c, d.opts.specialEasing); a > o; o++)
                        if (i = an[o].call(d, e, c, d.opts)) return i;
                    return $(d, c), ce.isFunction(d.opts.start) && d.opts.start.call(e, d), ce.fx.timer(ce.extend(l, {
                        elem: e,
                        anim: d,
                        queue: d.opts.queue
                    })), d.progress(d.opts.progress).done(d.opts.done, d.opts.complete).fail(d.opts.fail).always(d.opts.always)
                }

                function F(e, t) {
                    var n, i, r, o, a;
                    for (r in e)
                        if (i = ce.camelCase(r), o = t[i], n = e[r], ce.isArray(n) && (o = n[1], n = e[r] = n[0]), r !== i && (e[i] = n, delete e[r]), a = ce.cssHooks[i], a && "expand" in a) {
                            n = a.expand(n), delete e[i];
                            for (r in n) r in e || (e[r] = n[r], t[r] = o)
                        } else t[i] = o
                }

                function G(e, t, n) {
                    var i, r, o, a, s, l, d, c, u, p = this,
                        h = e.style,
                        g = {},
                        f = [],
                        m = e.nodeType && S(e);
                    n.queue || (c = ce._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, u = c.empty.fire, c.empty.fire = function() {
                        c.unqueued || u()
                    }), c.unqueued++, p.always(function() {
                        p.always(function() {
                            c.unqueued--, ce.queue(e, "fx").length || c.empty.fire()
                        })
                    })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], "inline" === ce.css(e, "display") && "none" === ce.css(e, "float") && (ce.support.inlineBlockNeedsLayout && "inline" !== L(e.nodeName) ? h.zoom = 1 : h.display = "inline-block")), n.overflow && (h.overflow = "hidden", ce.support.shrinkWrapBlocks || p.always(function() {
                        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                    }));
                    for (r in t)
                        if (a = t[r], nn.exec(a)) {
                            if (delete t[r], l = l || "toggle" === a, a === (m ? "hide" : "show")) continue;
                            f.push(r)
                        }
                    if (o = f.length) {
                        s = ce._data(e, "fxshow") || ce._data(e, "fxshow", {}), "hidden" in s && (m = s.hidden), l && (s.hidden = !m), m ? ce(e).show() : p.done(function() {
                            ce(e).hide()
                        }), p.done(function() {
                            var t;
                            ce._removeData(e, "fxshow");
                            for (t in g) ce.style(e, t, g[t])
                        });
                        for (r = 0; o > r; r++) i = f[r], d = p.createTween(i, m ? s[i] : 0), g[i] = s[i] || ce.style(e, i), i in s || (s[i] = d.start, m && (d.end = d.start, d.start = "width" === i || "height" === i ? 1 : 0))
                    }
                }

                function j(e, t, n, i, r) {
                    return new j.prototype.init(e, t, n, i, r)
                }

                function W(e, t) {
                    var n, i = {
                            height: e
                        },
                        r = 0;
                    for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = Et[r], i["margin" + n] = i["padding" + n] = e;
                    return t && (i.opacity = i.width = e), i
                }

                function V(e) {
                    return ce.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
                }
                var q, X, Y = typeof t,
                    K = e.document,
                    Q = e.location,
                    J = e.jQuery,
                    Z = e.$,
                    ee = {},
                    te = [],
                    ne = "1.9.1",
                    ie = te.concat,
                    re = te.push,
                    oe = te.slice,
                    ae = te.indexOf,
                    se = ee.toString,
                    le = ee.hasOwnProperty,
                    de = ne.trim,
                    ce = function(e, t) {
                        return new ce.fn.init(e, t, X)
                    },
                    ue = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                    pe = /\S+/g,
                    he = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                    ge = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
                    fe = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                    me = /^[\],:{}\s]*$/,
                    ve = /(?:^|:|,)(?:\s*\[)+/g,
                    be = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
                    ye = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
                    we = /^-ms-/,
                    xe = /-([\da-z])/gi,
                    Ce = function(e, t) {
                        return t.toUpperCase()
                    },
                    Se = function(e) {
                        (K.addEventListener || "load" === e.type || "complete" === K.readyState) && (ke(), ce.ready())
                    },
                    ke = function() {
                        K.addEventListener ? (K.removeEventListener("DOMContentLoaded", Se, !1), e.removeEventListener("load", Se, !1)) : (K.detachEvent("onreadystatechange", Se), e.detachEvent("onload", Se))
                    };
                ce.fn = ce.prototype = {
                    jquery: ne,
                    constructor: ce,
                    init: function(e, n, i) {
                        var r, o;
                        if (!e) return this;
                        if ("string" == typeof e) {
                            if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ge.exec(e), !r || !r[1] && n) return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e);
                            if (r[1]) {
                                if (n = n instanceof ce ? n[0] : n, ce.merge(this, ce.parseHTML(r[1], n && n.nodeType ? n.ownerDocument || n : K, !0)), fe.test(r[1]) && ce.isPlainObject(n))
                                    for (r in n) ce.isFunction(this[r]) ? this[r](n[r]) : this.attr(r, n[r]);
                                return this
                            }
                            if (o = K.getElementById(r[2]), o && o.parentNode) {
                                if (o.id !== r[2]) return i.find(e);
                                this.length = 1, this[0] = o
                            }
                            return this.context = K, this.selector = e, this
                        }
                        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ce.isFunction(e) ? i.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ce.makeArray(e, this))
                    },
                    selector: "",
                    length: 0,
                    size: function() {
                        return this.length
                    },
                    toArray: function() {
                        return oe.call(this)
                    },
                    get: function(e) {
                        return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
                    },
                    pushStack: function(e) {
                        var t = ce.merge(this.constructor(), e);
                        return t.prevObject = this, t.context = this.context, t
                    },
                    each: function(e, t) {
                        return ce.each(this, e, t)
                    },
                    ready: function(e) {
                        return ce.ready.promise().done(e), this
                    },
                    slice: function() {
                        return this.pushStack(oe.apply(this, arguments))
                    },
                    first: function() {
                        return this.eq(0)
                    },
                    last: function() {
                        return this.eq(-1)
                    },
                    eq: function(e) {
                        var t = this.length,
                            n = +e + (0 > e ? t : 0);
                        return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
                    },
                    map: function(e) {
                        return this.pushStack(ce.map(this, function(t, n) {
                            return e.call(t, n, t)
                        }))
                    },
                    end: function() {
                        return this.prevObject || this.constructor(null)
                    },
                    push: re,
                    sort: [].sort,
                    splice: [].splice
                }, ce.fn.init.prototype = ce.fn, ce.extend = ce.fn.extend = function() {
                    var e, n, i, r, o, a, s = arguments[0] || {},
                        l = 1,
                        d = arguments.length,
                        c = !1;
                    for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || ce.isFunction(s) || (s = {}), d === l && (s = this, --l); d > l; l++)
                        if (null != (o = arguments[l]))
                            for (r in o) e = s[r], i = o[r], s !== i && (c && i && (ce.isPlainObject(i) || (n = ce.isArray(i))) ? (n ? (n = !1, a = e && ce.isArray(e) ? e : []) : a = e && ce.isPlainObject(e) ? e : {}, s[r] = ce.extend(c, a, i)) : i !== t && (s[r] = i));
                    return s
                }, ce.extend({
                    noConflict: function(t) {
                        return e.$ === ce && (e.$ = Z), t && e.jQuery === ce && (e.jQuery = J), ce
                    },
                    isReady: !1,
                    readyWait: 1,
                    holdReady: function(e) {
                        e ? ce.readyWait++ : ce.ready(!0)
                    },
                    ready: function(e) {
                        if (e === !0 ? !--ce.readyWait : !ce.isReady) {
                            if (!K.body) return setTimeout(ce.ready);
                            ce.isReady = !0, e !== !0 && --ce.readyWait > 0 || (q.resolveWith(K, [ce]), ce.fn.trigger && ce(K).trigger("ready").off("ready"))
                        }
                    },
                    isFunction: function(e) {
                        return "function" === ce.type(e)
                    },
                    isArray: Array.isArray || function(e) {
                        return "array" === ce.type(e)
                    },
                    isWindow: function(e) {
                        return null != e && e == e.window
                    },
                    isNumeric: function(e) {
                        return !isNaN(parseFloat(e)) && isFinite(e)
                    },
                    type: function(e) {
                        return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? ee[se.call(e)] || "object" : typeof e
                    },
                    isPlainObject: function(e) {
                        if (!e || "object" !== ce.type(e) || e.nodeType || ce.isWindow(e)) return !1;
                        try {
                            if (e.constructor && !le.call(e, "constructor") && !le.call(e.constructor.prototype, "isPrototypeOf")) return !1
                        } catch (n) {
                            return !1
                        }
                        var i;
                        for (i in e);
                        return i === t || le.call(e, i)
                    },
                    isEmptyObject: function(e) {
                        var t;
                        for (t in e) return !1;
                        return !0
                    },
                    error: function(e) {
                        throw new B(e)
                    },
                    parseHTML: function(e, t, n) {
                        if (!e || "string" != typeof e) return null;
                        "boolean" == typeof t && (n = t, t = !1), t = t || K;
                        var i = fe.exec(e),
                            r = !n && [];
                        return i ? [t.createElement(i[1])] : (i = ce.buildFragment([e], t, r), r && ce(r).remove(), ce.merge([], i.childNodes))
                    },
                    parseJSON: function(t) {
                        return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = ce.trim(t), t && me.test(t.replace(be, "@").replace(ye, "]").replace(ve, ""))) ? new Function("return " + t)() : void ce.error("Invalid JSON: " + t)
                    },
                    parseXML: function(n) {
                        var i, r;
                        if (!n || "string" != typeof n) return null;
                        try {
                            e.DOMParser ? (r = new DOMParser, i = r.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
                        } catch (o) {
                            i = t
                        }
                        return i && i.documentElement && !i.getElementsByTagName("parsererror").length || ce.error("Invalid XML: " + n), i
                    },
                    noop: function() {},
                    globalEval: function(t) {
                        t && ce.trim(t) && (e.execScript || function(t) {
                            e.eval.call(e, t)
                        })(t)
                    },
                    camelCase: function(e) {
                        return e.replace(we, "ms-").replace(xe, Ce)
                    },
                    nodeName: function(e, t) {
                        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                    },
                    each: function(e, t, i) {
                        var r, o = 0,
                            a = e.length,
                            s = n(e);
                        if (i) {
                            if (s)
                                for (; a > o && (r = t.apply(e[o], i), r !== !1); o++);
                            else
                                for (o in e)
                                    if (r = t.apply(e[o], i), r === !1) break
                        } else if (s)
                            for (; a > o && (r = t.call(e[o], o, e[o]), r !== !1); o++);
                        else
                            for (o in e)
                                if (r = t.call(e[o], o, e[o]), r === !1) break;
                        return e
                    },
                    trim: de && !de.call("\ufeff ") ? function(e) {
                        return null == e ? "" : de.call(e)
                    } : function(e) {
                        return null == e ? "" : (e + "").replace(he, "")
                    },
                    makeArray: function(e, t) {
                        var i = t || [];
                        return null != e && (n(Object(e)) ? ce.merge(i, "string" == typeof e ? [e] : e) : re.call(i, e)), i
                    },
                    inArray: function(e, t, n) {
                        var i;
                        if (t) {
                            if (ae) return ae.call(t, e, n);
                            for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
                                if (n in t && t[n] === e) return n
                        }
                        return -1
                    },
                    merge: function(e, n) {
                        var i = n.length,
                            r = e.length,
                            o = 0;
                        if ("number" == typeof i)
                            for (; i > o; o++) e[r++] = n[o];
                        else
                            for (; n[o] !== t;) e[r++] = n[o++];
                        return e.length = r, e
                    },
                    grep: function(e, t, n) {
                        var i, r = [],
                            o = 0,
                            a = e.length;
                        for (n = !!n; a > o; o++) i = !!t(e[o], o), n !== i && r.push(e[o]);
                        return r
                    },
                    map: function(e, t, i) {
                        var r, o = 0,
                            a = e.length,
                            s = n(e),
                            l = [];
                        if (s)
                            for (; a > o; o++) r = t(e[o], o, i), null != r && (l[l.length] = r);
                        else
                            for (o in e) r = t(e[o], o, i), null != r && (l[l.length] = r);
                        return ie.apply([], l)
                    },
                    guid: 1,
                    proxy: function(e, n) {
                        var i, r, o;
                        return "string" == typeof n && (o = e[n], n = e, e = o), ce.isFunction(e) ? (i = oe.call(arguments, 2), r = function() {
                            return e.apply(n || this, i.concat(oe.call(arguments)))
                        }, r.guid = e.guid = e.guid || ce.guid++, r) : t
                    },
                    access: function(e, n, i, r, o, a, s) {
                        var l = 0,
                            d = e.length,
                            c = null == i;
                        if ("object" === ce.type(i)) {
                            o = !0;
                            for (l in i) ce.access(e, n, l, i[l], !0, a, s)
                        } else if (r !== t && (o = !0, ce.isFunction(r) || (s = !0), c && (s ? (n.call(e, r), n = null) : (c = n, n = function(e, t, n) {
                                return c.call(ce(e), n)
                            })), n))
                            for (; d > l; l++) n(e[l], i, s ? r : r.call(e[l], l, n(e[l], i)));
                        return o ? e : c ? n.call(e) : d ? n(e[0], i) : a
                    },
                    now: function() {
                        return (new Date).getTime()
                    }
                }), ce.ready.promise = function(t) {
                    if (!q)
                        if (q = ce.Deferred(), "complete" === K.readyState) setTimeout(ce.ready);
                        else if (K.addEventListener) K.addEventListener("DOMContentLoaded", Se, !1), e.addEventListener("load", Se, !1);
                    else {
                        K.attachEvent("onreadystatechange", Se), e.attachEvent("onload", Se);
                        var n = !1;
                        try {
                            n = null == e.frameElement && K.documentElement
                        } catch (i) {}
                        n && n.doScroll && ! function r() {
                            if (!ce.isReady) {
                                try {
                                    n.doScroll("left")
                                } catch (e) {
                                    return setTimeout(r, 50)
                                }
                                ke(), ce.ready()
                            }
                        }()
                    }
                    return q.promise(t)
                }, ce.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
                    ee["[object " + t + "]"] = t.toLowerCase()
                }), X = ce(K);
                var Ee = {};
                ce.Callbacks = function(e) {
                    e = "string" == typeof e ? Ee[e] || i(e) : ce.extend({}, e);
                    var n, r, o, a, s, l, d = [],
                        c = !e.once && [],
                        u = function(t) {
                            for (r = e.memory && t, o = !0, s = l || 0, l = 0, a = d.length, n = !0; d && a > s; s++)
                                if (d[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                                    r = !1;
                                    break
                                }
                            n = !1, d && (c ? c.length && u(c.shift()) : r ? d = [] : p.disable())
                        },
                        p = {
                            add: function() {
                                if (d) {
                                    var t = d.length;
                                    ! function i(t) {
                                        ce.each(t, function(t, n) {
                                            var r = ce.type(n);
                                            "function" === r ? e.unique && p.has(n) || d.push(n) : n && n.length && "string" !== r && i(n)
                                        })
                                    }(arguments), n ? a = d.length : r && (l = t, u(r))
                                }
                                return this
                            },
                            remove: function() {
                                return d && ce.each(arguments, function(e, t) {
                                    for (var i;
                                        (i = ce.inArray(t, d, i)) > -1;) d.splice(i, 1), n && (a >= i && a--, s >= i && s--)
                                }), this
                            },
                            has: function(e) {
                                return e ? ce.inArray(e, d) > -1 : !(!d || !d.length)
                            },
                            empty: function() {
                                return d = [], this
                            },
                            disable: function() {
                                return d = c = r = t, this
                            },
                            disabled: function() {
                                return !d
                            },
                            lock: function() {
                                return c = t, r || p.disable(), this
                            },
                            locked: function() {
                                return !c
                            },
                            fireWith: function(e, t) {
                                return t = t || [], t = [e, t.slice ? t.slice() : t], !d || o && !c || (n ? c.push(t) : u(t)), this
                            },
                            fire: function() {
                                return p.fireWith(this, arguments), this
                            },
                            fired: function() {
                                return !!o
                            }
                        };
                    return p
                }, ce.extend({
                    Deferred: function(e) {
                        var t = [
                                ["resolve", "done", ce.Callbacks("once memory"), "resolved"],
                                ["reject", "fail", ce.Callbacks("once memory"), "rejected"],
                                ["notify", "progress", ce.Callbacks("memory")]
                            ],
                            n = "pending",
                            i = {
                                state: function() {
                                    return n
                                },
                                always: function() {
                                    return r.done(arguments).fail(arguments), this
                                },
                                then: function() {
                                    var e = arguments;
                                    return ce.Deferred(function(n) {
                                        ce.each(t, function(t, o) {
                                            var a = o[0],
                                                s = ce.isFunction(e[t]) && e[t];
                                            r[o[1]](function() {
                                                var e = s && s.apply(this, arguments);
                                                e && ce.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === i ? n.promise() : this, s ? [e] : arguments)
                                            })
                                        }), e = null
                                    }).promise()
                                },
                                promise: function(e) {
                                    return null != e ? ce.extend(e, i) : i
                                }
                            },
                            r = {};
                        return i.pipe = i.then, ce.each(t, function(e, o) {
                            var a = o[2],
                                s = o[3];
                            i[o[1]] = a.add, s && a.add(function() {
                                n = s
                            }, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = function() {
                                return r[o[0] + "With"](this === r ? i : this, arguments), this
                            }, r[o[0] + "With"] = a.fireWith
                        }), i.promise(r), e && e.call(r, r), r
                    },
                    when: function(e) {
                        var t, n, i, r = 0,
                            o = oe.call(arguments),
                            a = o.length,
                            s = 1 !== a || e && ce.isFunction(e.promise) ? a : 0,
                            l = 1 === s ? e : ce.Deferred(),
                            d = function(e, n, i) {
                                return function(r) {
                                    n[e] = this, i[e] = arguments.length > 1 ? oe.call(arguments) : r, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                                }
                            };
                        if (a > 1)
                            for (t = new Array(a), n = new Array(a), i = new Array(a); a > r; r++) o[r] && ce.isFunction(o[r].promise) ? o[r].promise().done(d(r, i, o)).fail(l.reject).progress(d(r, n, t)) : --s;
                        return s || l.resolveWith(i, o), l.promise()
                    }
                }), ce.support = function() {
                    var t, n, i, r, o, a, s, l, d, c, u = K.createElement("div");
                    if (u.setAttribute("className", "t"), u.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = u.getElementsByTagName("*"), i = u.getElementsByTagName("a")[0], !n || !i || !n.length) return {};
                    o = K.createElement("select"), s = o.appendChild(K.createElement("option")), r = u.getElementsByTagName("input")[0], i.style.cssText = "top:1px;float:left;opacity:.5", t = {
                        getSetAttribute: "t" !== u.className,
                        leadingWhitespace: 3 === u.firstChild.nodeType,
                        tbody: !u.getElementsByTagName("tbody").length,
                        htmlSerialize: !!u.getElementsByTagName("link").length,
                        style: /top/.test(i.getAttribute("style")),
                        hrefNormalized: "/a" === i.getAttribute("href"),
                        opacity: /^0.5/.test(i.style.opacity),
                        cssFloat: !!i.style.cssFloat,
                        checkOn: !!r.value,
                        optSelected: s.selected,
                        enctype: !!K.createElement("form").enctype,
                        html5Clone: "<:nav></:nav>" !== K.createElement("nav").cloneNode(!0).outerHTML,
                        boxModel: "CSS1Compat" === K.compatMode,
                        deleteExpando: !0,
                        noCloneEvent: !0,
                        inlineBlockNeedsLayout: !1,
                        shrinkWrapBlocks: !1,
                        reliableMarginRight: !0,
                        boxSizingReliable: !0,
                        pixelPosition: !1
                    }, r.checked = !0, t.noCloneChecked = r.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !s.disabled;
                    try {
                        delete u.test
                    } catch (p) {
                        t.deleteExpando = !1
                    }
                    r = K.createElement("input"), r.setAttribute("value", ""), t.input = "" === r.getAttribute("value"), r.value = "t", r.setAttribute("type", "radio"), t.radioValue = "t" === r.value, r.setAttribute("checked", "t"), r.setAttribute("name", "t"), a = K.createDocumentFragment(), a.appendChild(r), t.appendChecked = r.checked, t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, u.attachEvent && (u.attachEvent("onclick", function() {
                        t.noCloneEvent = !1
                    }), u.cloneNode(!0).click());
                    for (c in {
                            submit: !0,
                            change: !0,
                            focusin: !0
                        }) u.setAttribute(l = "on" + c, "t"), t[c + "Bubbles"] = l in e || u.attributes[l].expando === !1;
                    return u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === u.style.backgroundClip, ce(function() {
                        var n, i, r, o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                            a = K.getElementsByTagName("body")[0];
                        a && (n = K.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(u), u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = u.getElementsByTagName("td"), r[0].style.cssText = "padding:0;margin:0;border:0;display:none", d = 0 === r[0].offsetHeight, r[0].style.display = "", r[1].style.display = "none", t.reliableHiddenOffsets = d && 0 === r[0].offsetHeight, u.innerHTML = "", u.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === u.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== a.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(u, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(u, null) || {
                            width: "4px"
                        }).width, i = u.appendChild(K.createElement("div")), i.style.cssText = u.style.cssText = o, i.style.marginRight = i.style.width = "0", u.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), typeof u.style.zoom !== Y && (u.innerHTML = "", u.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === u.offsetWidth, u.style.display = "block", u.innerHTML = "<div></div>", u.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== u.offsetWidth, t.inlineBlockNeedsLayout && (a.style.zoom = 1)), a.removeChild(n), n = u = r = i = null)
                    }), n = o = a = s = i = r = null, t
                }();
                var Te = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
                    _e = /([A-Z])/g;
                ce.extend({
                    cache: {},
                    expando: "jQuery" + (ne + Math.random()).replace(/\D/g, ""),
                    noData: {
                        embed: !0,
                        object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                        applet: !0
                    },
                    hasData: function(e) {
                        return e = e.nodeType ? ce.cache[e[ce.expando]] : e[ce.expando], !!e && !l(e)
                    },
                    data: function(e, t, n) {
                        return o(e, t, n)
                    },
                    removeData: function(e, t) {
                        return a(e, t)
                    },
                    _data: function(e, t, n) {
                        return o(e, t, n, !0)
                    },
                    _removeData: function(e, t) {
                        return a(e, t, !0)
                    },
                    acceptData: function(e) {
                        if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
                        var t = e.nodeName && ce.noData[e.nodeName.toLowerCase()];
                        return !t || t !== !0 && e.getAttribute("classid") === t
                    }
                }), ce.fn.extend({
                    data: function(e, n) {
                        var i, r, o = this[0],
                            a = 0,
                            l = null;
                        if (e === t) {
                            if (this.length && (l = ce.data(o), 1 === o.nodeType && !ce._data(o, "parsedAttrs"))) {
                                for (i = o.attributes; a < i.length; a++) r = i[a].name, r.indexOf("data-") || (r = ce.camelCase(r.slice(5)), s(o, r, l[r]));
                                ce._data(o, "parsedAttrs", !0)
                            }
                            return l
                        }
                        return "object" == typeof e ? this.each(function() {
                            ce.data(this, e)
                        }) : ce.access(this, function(n) {
                            return n === t ? o ? s(o, e, ce.data(o, e)) : null : void this.each(function() {
                                ce.data(this, e, n)
                            })
                        }, null, n, arguments.length > 1, null, !0)
                    },
                    removeData: function(e) {
                        return this.each(function() {
                            ce.removeData(this, e)
                        })
                    }
                }), ce.extend({
                    queue: function(e, t, n) {
                        var i;
                        return e ? (t = (t || "fx") + "queue", i = ce._data(e, t), n && (!i || ce.isArray(n) ? i = ce._data(e, t, ce.makeArray(n)) : i.push(n)), i || []) : void 0
                    },
                    dequeue: function(e, t) {
                        t = t || "fx";
                        var n = ce.queue(e, t),
                            i = n.length,
                            r = n.shift(),
                            o = ce._queueHooks(e, t),
                            a = function() {
                                ce.dequeue(e, t)
                            };
                        "inprogress" === r && (r = n.shift(), i--), o.cur = r, r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire()
                    },
                    _queueHooks: function(e, t) {
                        var n = t + "queueHooks";
                        return ce._data(e, n) || ce._data(e, n, {
                            empty: ce.Callbacks("once memory").add(function() {
                                ce._removeData(e, t + "queue"), ce._removeData(e, n)
                            })
                        })
                    }
                }), ce.fn.extend({
                    queue: function(e, n) {
                        var i = 2;
                        return "string" != typeof e && (n = e, e = "fx", i--), arguments.length < i ? ce.queue(this[0], e) : n === t ? this : this.each(function() {
                            var t = ce.queue(this, e, n);
                            ce._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ce.dequeue(this, e)
                        })
                    },
                    dequeue: function(e) {
                        return this.each(function() {
                            ce.dequeue(this, e)
                        })
                    },
                    delay: function(e, t) {
                        return e = ce.fx ? ce.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                            var i = setTimeout(t, e);
                            n.stop = function() {
                                clearTimeout(i)
                            }
                        })
                    },
                    clearQueue: function(e) {
                        return this.queue(e || "fx", [])
                    },
                    promise: function(e, n) {
                        var i, r = 1,
                            o = ce.Deferred(),
                            a = this,
                            s = this.length,
                            l = function() {
                                --r || o.resolveWith(a, [a])
                            };
                        for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;) i = ce._data(a[s], e + "queueHooks"), i && i.empty && (r++, i.empty.add(l));
                        return l(), o.promise(n)
                    }
                });
                var Le, Ie, De = /[\t\r\n]/g,
                    Ae = /\r/g,
                    Me = /^(?:input|select|textarea|button|object)$/i,
                    Be = /^(?:a|area)$/i,
                    Pe = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
                    He = /^(?:checked|selected)$/i,
                    Ne = ce.support.getSetAttribute,
                    ze = ce.support.input;
                ce.fn.extend({
                    attr: function(e, t) {
                        return ce.access(this, ce.attr, e, t, arguments.length > 1)
                    },
                    removeAttr: function(e) {
                        return this.each(function() {
                            ce.removeAttr(this, e)
                        })
                    },
                    prop: function(e, t) {
                        return ce.access(this, ce.prop, e, t, arguments.length > 1)
                    },
                    removeProp: function(e) {
                        return e = ce.propFix[e] || e, this.each(function() {
                            try {
                                this[e] = t, delete this[e]
                            } catch (n) {}
                        })
                    },
                    addClass: function(e) {
                        var t, n, i, r, o, a = 0,
                            s = this.length,
                            l = "string" == typeof e && e;
                        if (ce.isFunction(e)) return this.each(function(t) {
                            ce(this).addClass(e.call(this, t, this.className))
                        });
                        if (l)
                            for (t = (e || "").match(pe) || []; s > a; a++)
                                if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(De, " ") : " ")) {
                                    for (o = 0; r = t[o++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                                    n.className = ce.trim(i)
                                }
                        return this
                    },
                    removeClass: function(e) {
                        var t, n, i, r, o, a = 0,
                            s = this.length,
                            l = 0 === arguments.length || "string" == typeof e && e;
                        if (ce.isFunction(e)) return this.each(function(t) {
                            ce(this).removeClass(e.call(this, t, this.className))
                        });
                        if (l)
                            for (t = (e || "").match(pe) || []; s > a; a++)
                                if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(De, " ") : "")) {
                                    for (o = 0; r = t[o++];)
                                        for (; i.indexOf(" " + r + " ") >= 0;) i = i.replace(" " + r + " ", " ");
                                    n.className = e ? ce.trim(i) : ""
                                }
                        return this
                    },
                    toggleClass: function(e, t) {
                        var n = typeof e,
                            i = "boolean" == typeof t;
                        return ce.isFunction(e) ? this.each(function(n) {
                            ce(this).toggleClass(e.call(this, n, this.className, t), t)
                        }) : this.each(function() {
                            if ("string" === n)
                                for (var r, o = 0, a = ce(this), s = t, l = e.match(pe) || []; r = l[o++];) s = i ? s : !a.hasClass(r), a[s ? "addClass" : "removeClass"](r);
                            else(n === Y || "boolean" === n) && (this.className && ce._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ce._data(this, "__className__") || "")
                        })
                    },
                    hasClass: function(e) {
                        for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
                            if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(De, " ").indexOf(t) >= 0) return !0;
                        return !1
                    },
                    val: function(e) {
                        var n, i, r, o = this[0]; {
                            if (arguments.length) return r = ce.isFunction(e), this.each(function(n) {
                                var o, a = ce(this);
                                1 === this.nodeType && (o = r ? e.call(this, n, a.val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : ce.isArray(o) && (o = ce.map(o, function(e) {
                                    return null == e ? "" : e + ""
                                })), i = ce.valHooks[this.type] || ce.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, o, "value") !== t || (this.value = o))
                            });
                            if (o) return i = ce.valHooks[o.type] || ce.valHooks[o.nodeName.toLowerCase()], i && "get" in i && (n = i.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(Ae, "") : null == n ? "" : n)
                        }
                    }
                }), ce.extend({
                    valHooks: {
                        option: {
                            get: function(e) {
                                var t = e.attributes.value;
                                return !t || t.specified ? e.value : e.text
                            }
                        },
                        select: {
                            get: function(e) {
                                for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || 0 > r, a = o ? null : [], s = o ? r + 1 : i.length, l = 0 > r ? s : o ? r : 0; s > l; l++)
                                    if (n = i[l], (n.selected || l === r) && (ce.support.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ce.nodeName(n.parentNode, "optgroup"))) {
                                        if (t = ce(n).val(), o) return t;
                                        a.push(t)
                                    }
                                return a
                            },
                            set: function(e, t) {
                                var n = ce.makeArray(t);
                                return ce(e).find("option").each(function() {
                                    this.selected = ce.inArray(ce(this).val(), n) >= 0
                                }), n.length || (e.selectedIndex = -1), n
                            }
                        }
                    },
                    attr: function(e, n, i) {
                        var r, o, a, s = e.nodeType;
                        if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === Y ? ce.prop(e, n, i) : (o = 1 !== s || !ce.isXMLDoc(e), o && (n = n.toLowerCase(), r = ce.attrHooks[n] || (Pe.test(n) ? Ie : Le)), i === t ? r && o && "get" in r && null !== (a = r.get(e, n)) ? a : (typeof e.getAttribute !== Y && (a = e.getAttribute(n)), null == a ? t : a) : null !== i ? r && o && "set" in r && (a = r.set(e, i, n)) !== t ? a : (e.setAttribute(n, i + ""), i) : void ce.removeAttr(e, n))
                    },
                    removeAttr: function(e, t) {
                        var n, i, r = 0,
                            o = t && t.match(pe);
                        if (o && 1 === e.nodeType)
                            for (; n = o[r++];) i = ce.propFix[n] || n, Pe.test(n) ? !Ne && He.test(n) ? e[ce.camelCase("default-" + n)] = e[i] = !1 : e[i] = !1 : ce.attr(e, n, ""), e.removeAttribute(Ne ? n : i)
                    },
                    attrHooks: {
                        type: {
                            set: function(e, t) {
                                if (!ce.support.radioValue && "radio" === t && ce.nodeName(e, "input")) {
                                    var n = e.value;
                                    return e.setAttribute("type", t), n && (e.value = n), t
                                }
                            }
                        }
                    },
                    propFix: {
                        tabindex: "tabIndex",
                        readonly: "readOnly",
                        "for": "htmlFor",
                        "class": "className",
                        maxlength: "maxLength",
                        cellspacing: "cellSpacing",
                        cellpadding: "cellPadding",
                        rowspan: "rowSpan",
                        colspan: "colSpan",
                        usemap: "useMap",
                        frameborder: "frameBorder",
                        contenteditable: "contentEditable"
                    },
                    prop: function(e, n, i) {
                        var r, o, a, s = e.nodeType;
                        if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !ce.isXMLDoc(e), a && (n = ce.propFix[n] || n, o = ce.propHooks[n]), i !== t ? o && "set" in o && (r = o.set(e, i, n)) !== t ? r : e[n] = i : o && "get" in o && null !== (r = o.get(e, n)) ? r : e[n]
                    },
                    propHooks: {
                        tabIndex: {
                            get: function(e) {
                                var n = e.getAttributeNode("tabindex");
                                return n && n.specified ? parseInt(n.value, 10) : Me.test(e.nodeName) || Be.test(e.nodeName) && e.href ? 0 : t
                            }
                        }
                    }
                }), Ie = {
                    get: function(e, n) {
                        var i = ce.prop(e, n),
                            r = "boolean" == typeof i && e.getAttribute(n),
                            o = "boolean" == typeof i ? ze && Ne ? null != r : He.test(n) ? e[ce.camelCase("default-" + n)] : !!r : e.getAttributeNode(n);
                        return o && o.value !== !1 ? n.toLowerCase() : t
                    },
                    set: function(e, t, n) {
                        return t === !1 ? ce.removeAttr(e, n) : ze && Ne || !He.test(n) ? e.setAttribute(!Ne && ce.propFix[n] || n, n) : e[ce.camelCase("default-" + n)] = e[n] = !0, n
                    }
                }, ze && Ne || (ce.attrHooks.value = {
                    get: function(e, n) {
                        var i = e.getAttributeNode(n);
                        return ce.nodeName(e, "input") ? e.defaultValue : i && i.specified ? i.value : t
                    },
                    set: function(e, t, n) {
                        return ce.nodeName(e, "input") ? void(e.defaultValue = t) : Le && Le.set(e, t, n)
                    }
                }), Ne || (Le = ce.valHooks.button = {
                    get: function(e, n) {
                        var i = e.getAttributeNode(n);
                        return i && ("id" === n || "name" === n || "coords" === n ? "" !== i.value : i.specified) ? i.value : t
                    },
                    set: function(e, n, i) {
                        var r = e.getAttributeNode(i);
                        return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(i)), r.value = n += "", "value" === i || n === e.getAttribute(i) ? n : t
                    }
                }, ce.attrHooks.contenteditable = {
                    get: Le.get,
                    set: function(e, t, n) {
                        Le.set(e, "" === t ? !1 : t, n)
                    }
                }, ce.each(["width", "height"], function(e, t) {
                    ce.attrHooks[t] = ce.extend(ce.attrHooks[t], {
                        set: function(e, n) {
                            return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
                        }
                    })
                })), ce.support.hrefNormalized || (ce.each(["href", "src", "width", "height"], function(e, n) {
                    ce.attrHooks[n] = ce.extend(ce.attrHooks[n], {
                        get: function(e) {
                            var i = e.getAttribute(n, 2);
                            return null == i ? t : i
                        }
                    })
                }), ce.each(["href", "src"], function(e, t) {
                    ce.propHooks[t] = {
                        get: function(e) {
                            return e.getAttribute(t, 4)
                        }
                    }
                })), ce.support.style || (ce.attrHooks.style = {
                    get: function(e) {
                        return e.style.cssText || t
                    },
                    set: function(e, t) {
                        return e.style.cssText = t + ""
                    }
                }), ce.support.optSelected || (ce.propHooks.selected = ce.extend(ce.propHooks.selected, {
                    get: function(e) {
                        var t = e.parentNode;
                        return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
                    }
                })), ce.support.enctype || (ce.propFix.enctype = "encoding"), ce.support.checkOn || ce.each(["radio", "checkbox"], function() {
                    ce.valHooks[this] = {
                        get: function(e) {
                            return null === e.getAttribute("value") ? "on" : e.value
                        }
                    }
                }), ce.each(["radio", "checkbox"], function() {
                    ce.valHooks[this] = ce.extend(ce.valHooks[this], {
                        set: function(e, t) {
                            return ce.isArray(t) ? e.checked = ce.inArray(ce(e).val(), t) >= 0 : void 0
                        }
                    })
                });
                var Oe = /^(?:input|select|textarea)$/i,
                    Ue = /^key/,
                    $e = /^(?:mouse|contextmenu)|click/,
                    Re = /^(?:focusinfocus|focusoutblur)$/,
                    Fe = /^([^.]*)(?:\.(.+)|)$/;
                ce.event = {
                        global: {},
                        add: function(e, n, i, r, o) {
                            var a, s, l, d, c, u, p, h, g, f, m, v = ce._data(e);
                            if (v) {
                                for (i.handler && (d = i, i = d.handler, o = d.selector), i.guid || (i.guid = ce.guid++), (s = v.events) || (s = v.events = {}), (u = v.handle) || (u = v.handle = function(e) {
                                        return typeof ce === Y || e && ce.event.triggered === e.type ? t : ce.event.dispatch.apply(u.elem, arguments)
                                    }, u.elem = e), n = (n || "").match(pe) || [""], l = n.length; l--;) a = Fe.exec(n[l]) || [], g = m = a[1], f = (a[2] || "").split(".").sort(), c = ce.event.special[g] || {}, g = (o ? c.delegateType : c.bindType) || g, c = ce.event.special[g] || {}, p = ce.extend({
                                    type: g,
                                    origType: m,
                                    data: r,
                                    handler: i,
                                    guid: i.guid,
                                    selector: o,
                                    needsContext: o && ce.expr.match.needsContext.test(o),
                                    namespace: f.join(".")
                                }, d), (h = s[g]) || (h = s[g] = [], h.delegateCount = 0, c.setup && c.setup.call(e, r, f, u) !== !1 || (e.addEventListener ? e.addEventListener(g, u, !1) : e.attachEvent && e.attachEvent("on" + g, u))), c.add && (c.add.call(e, p), p.handler.guid || (p.handler.guid = i.guid)), o ? h.splice(h.delegateCount++, 0, p) : h.push(p), ce.event.global[g] = !0;
                                e = null
                            }
                        },
                        remove: function(e, t, n, i, r) {
                            var o, a, s, l, d, c, u, p, h, g, f, m = ce.hasData(e) && ce._data(e);
                            if (m && (c = m.events)) {
                                for (t = (t || "").match(pe) || [""], d = t.length; d--;)
                                    if (s = Fe.exec(t[d]) || [], h = f = s[1], g = (s[2] || "").split(".").sort(), h) {
                                        for (u = ce.event.special[h] || {}, h = (i ? u.delegateType : u.bindType) || h, p = c[h] || [], s = s[2] && new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = p.length; o--;) a = p[o], !r && f !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, u.remove && u.remove.call(e, a));
                                        l && !p.length && (u.teardown && u.teardown.call(e, g, m.handle) !== !1 || ce.removeEvent(e, h, m.handle), delete c[h])
                                    } else
                                        for (h in c) ce.event.remove(e, h + t[d], n, i, !0);
                                ce.isEmptyObject(c) && (delete m.handle, ce._removeData(e, "events"))
                            }
                        },
                        trigger: function(n, i, r, o) {
                            var a, s, l, d, c, u, p, h = [r || K],
                                g = le.call(n, "type") ? n.type : n,
                                f = le.call(n, "namespace") ? n.namespace.split(".") : [];
                            if (l = u = r = r || K, 3 !== r.nodeType && 8 !== r.nodeType && !Re.test(g + ce.event.triggered) && (g.indexOf(".") >= 0 && (f = g.split("."), g = f.shift(), f.sort()), s = g.indexOf(":") < 0 && "on" + g, n = n[ce.expando] ? n : new ce.Event(g, "object" == typeof n && n), n.isTrigger = !0, n.namespace = f.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = r), i = null == i ? [n] : ce.makeArray(i, [n]), c = ce.event.special[g] || {}, o || !c.trigger || c.trigger.apply(r, i) !== !1)) {
                                if (!o && !c.noBubble && !ce.isWindow(r)) {
                                    for (d = c.delegateType || g, Re.test(d + g) || (l = l.parentNode); l; l = l.parentNode) h.push(l), u = l;
                                    u === (r.ownerDocument || K) && h.push(u.defaultView || u.parentWindow || e)
                                }
                                for (p = 0;
                                    (l = h[p++]) && !n.isPropagationStopped();) n.type = p > 1 ? d : c.bindType || g, a = (ce._data(l, "events") || {})[n.type] && ce._data(l, "handle"), a && a.apply(l, i), a = s && l[s], a && ce.acceptData(l) && a.apply && a.apply(l, i) === !1 && n.preventDefault();
                                if (n.type = g, !o && !n.isDefaultPrevented() && (!c._default || c._default.apply(r.ownerDocument, i) === !1) && ("click" !== g || !ce.nodeName(r, "a")) && ce.acceptData(r) && s && r[g] && !ce.isWindow(r)) {
                                    u = r[s], u && (r[s] = null), ce.event.triggered = g;
                                    try {
                                        r[g]()
                                    } catch (m) {}
                                    ce.event.triggered = t, u && (r[s] = u)
                                }
                                return n.result
                            }
                        },
                        dispatch: function(e) {
                            e = ce.event.fix(e);
                            var n, i, r, o, a, s = [],
                                l = oe.call(arguments),
                                d = (ce._data(this, "events") || {})[e.type] || [],
                                c = ce.event.special[e.type] || {};
                            if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                                for (s = ce.event.handlers.call(this, e, d), n = 0;
                                    (o = s[n++]) && !e.isPropagationStopped();)
                                    for (e.currentTarget = o.elem, a = 0;
                                        (r = o.handlers[a++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, i = ((ce.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l), i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                                return c.postDispatch && c.postDispatch.call(this, e), e.result
                            }
                        },
                        handlers: function(e, n) {
                            var i, r, o, a, s = [],
                                l = n.delegateCount,
                                d = e.target;
                            if (l && d.nodeType && (!e.button || "click" !== e.type))
                                for (; d != this; d = d.parentNode || this)
                                    if (1 === d.nodeType && (d.disabled !== !0 || "click" !== e.type)) {
                                        for (o = [], a = 0; l > a; a++) r = n[a], i = r.selector + " ", o[i] === t && (o[i] = r.needsContext ? ce(i, this).index(d) >= 0 : ce.find(i, this, null, [d]).length), o[i] && o.push(r);
                                        o.length && s.push({
                                            elem: d,
                                            handlers: o
                                        })
                                    }
                            return l < n.length && s.push({
                                elem: this,
                                handlers: n.slice(l)
                            }), s
                        },
                        fix: function(e) {
                            if (e[ce.expando]) return e;
                            var t, n, i, r = e.type,
                                o = e,
                                a = this.fixHooks[r];
                            for (a || (this.fixHooks[r] = a = $e.test(r) ? this.mouseHooks : Ue.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new ce.Event(o), t = i.length; t--;) n = i[t], e[n] = o[n];
                            return e.target || (e.target = o.srcElement || K), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
                        },
                        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                        fixHooks: {},
                        keyHooks: {
                            props: "char charCode key keyCode".split(" "),
                            filter: function(e, t) {
                                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                            }
                        },
                        mouseHooks: {
                            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                            filter: function(e, n) {
                                var i, r, o, a = n.button,
                                    s = n.fromElement;
                                return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || K, o = r.documentElement, i = r.body, e.pageX = n.clientX + (o && o.scrollLeft || i && i.scrollLeft || 0) - (o && o.clientLeft || i && i.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || i && i.scrollTop || 0) - (o && o.clientTop || i && i.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
                            }
                        },
                        special: {
                            load: {
                                noBubble: !0
                            },
                            click: {
                                trigger: function() {
                                    return ce.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                                }
                            },
                            focus: {
                                trigger: function() {
                                    if (this !== K.activeElement && this.focus) try {
                                        return this.focus(), !1
                                    } catch (e) {}
                                },
                                delegateType: "focusin"
                            },
                            blur: {
                                trigger: function() {
                                    return this === K.activeElement && this.blur ? (this.blur(), !1) : void 0
                                },
                                delegateType: "focusout"
                            },
                            beforeunload: {
                                postDispatch: function(e) {
                                    e.result !== t && (e.originalEvent.returnValue = e.result)
                                }
                            }
                        },
                        simulate: function(e, t, n, i) {
                            var r = ce.extend(new ce.Event, n, {
                                type: e,
                                isSimulated: !0,
                                originalEvent: {}
                            });
                            i ? ce.event.trigger(r, null, t) : ce.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault()
                        }
                    }, ce.removeEvent = K.removeEventListener ? function(e, t, n) {
                        e.removeEventListener && e.removeEventListener(t, n, !1)
                    } : function(e, t, n) {
                        var i = "on" + t;
                        e.detachEvent && (typeof e[i] === Y && (e[i] = null), e.detachEvent(i, n))
                    }, ce.Event = function(e, t) {
                        return this instanceof ce.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? d : c) : this.type = e, t && ce.extend(this, t), this.timeStamp = e && e.timeStamp || ce.now(), void(this[ce.expando] = !0)) : new ce.Event(e, t)
                    }, ce.Event.prototype = {
                        isDefaultPrevented: c,
                        isPropagationStopped: c,
                        isImmediatePropagationStopped: c,
                        preventDefault: function() {
                            var e = this.originalEvent;
                            this.isDefaultPrevented = d, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
                        },
                        stopPropagation: function() {
                            var e = this.originalEvent;
                            this.isPropagationStopped = d, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
                        },
                        stopImmediatePropagation: function() {
                            this.isImmediatePropagationStopped = d, this.stopPropagation()
                        }
                    }, ce.each({
                        mouseenter: "mouseover",
                        mouseleave: "mouseout"
                    }, function(e, t) {
                        ce.event.special[e] = {
                            delegateType: t,
                            bindType: t,
                            handle: function(e) {
                                var n, i = this,
                                    r = e.relatedTarget,
                                    o = e.handleObj;
                                return (!r || r !== i && !ce.contains(i, r)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                            }
                        }
                    }), ce.support.submitBubbles || (ce.event.special.submit = {
                        setup: function() {
                            return ce.nodeName(this, "form") ? !1 : void ce.event.add(this, "click._submit keypress._submit", function(e) {
                                var n = e.target,
                                    i = ce.nodeName(n, "input") || ce.nodeName(n, "button") ? n.form : t;
                                i && !ce._data(i, "submitBubbles") && (ce.event.add(i, "submit._submit", function(e) {
                                    e._submit_bubble = !0
                                }), ce._data(i, "submitBubbles", !0))
                            })
                        },
                        postDispatch: function(e) {
                            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ce.event.simulate("submit", this.parentNode, e, !0))
                        },
                        teardown: function() {
                            return ce.nodeName(this, "form") ? !1 : void ce.event.remove(this, "._submit")
                        }
                    }), ce.support.changeBubbles || (ce.event.special.change = {
                        setup: function() {
                            return Oe.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ce.event.add(this, "propertychange._change", function(e) {
                                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
                            }), ce.event.add(this, "click._change", function(e) {
                                this._just_changed && !e.isTrigger && (this._just_changed = !1), ce.event.simulate("change", this, e, !0)
                            })), !1) : void ce.event.add(this, "beforeactivate._change", function(e) {
                                var t = e.target;
                                Oe.test(t.nodeName) && !ce._data(t, "changeBubbles") && (ce.event.add(t, "change._change", function(e) {
                                    !this.parentNode || e.isSimulated || e.isTrigger || ce.event.simulate("change", this.parentNode, e, !0)
                                }), ce._data(t, "changeBubbles", !0))
                            })
                        },
                        handle: function(e) {
                            var t = e.target;
                            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
                        },
                        teardown: function() {
                            return ce.event.remove(this, "._change"), !Oe.test(this.nodeName)
                        }
                    }), ce.support.focusinBubbles || ce.each({
                        focus: "focusin",
                        blur: "focusout"
                    }, function(e, t) {
                        var n = 0,
                            i = function(e) {
                                ce.event.simulate(t, e.target, ce.event.fix(e), !0)
                            };
                        ce.event.special[t] = {
                            setup: function() {
                                0 === n++ && K.addEventListener(e, i, !0)
                            },
                            teardown: function() {
                                0 === --n && K.removeEventListener(e, i, !0)
                            }
                        }
                    }), ce.fn.extend({
                        on: function(e, n, i, r, o) {
                            var a, s;
                            if ("object" == typeof e) {
                                "string" != typeof n && (i = i || n, n = t);
                                for (a in e) this.on(a, n, i, e[a], o);
                                return this
                            }
                            if (null == i && null == r ? (r = n, i = n = t) : null == r && ("string" == typeof n ? (r = i, i = t) : (r = i, i = n, n = t)), r === !1) r = c;
                            else if (!r) return this;
                            return 1 === o && (s = r, r = function(e) {
                                return ce().off(e), s.apply(this, arguments)
                            }, r.guid = s.guid || (s.guid = ce.guid++)), this.each(function() {
                                ce.event.add(this, e, r, i, n)
                            })
                        },
                        one: function(e, t, n, i) {
                            return this.on(e, t, n, i, 1)
                        },
                        off: function(e, n, i) {
                            var r, o;
                            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, ce(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                            if ("object" == typeof e) {
                                for (o in e) this.off(o, n, e[o]);
                                return this
                            }
                            return (n === !1 || "function" == typeof n) && (i = n, n = t), i === !1 && (i = c), this.each(function() {
                                ce.event.remove(this, e, i, n)
                            })
                        },
                        bind: function(e, t, n) {
                            return this.on(e, null, t, n)
                        },
                        unbind: function(e, t) {
                            return this.off(e, null, t)
                        },
                        delegate: function(e, t, n, i) {
                            return this.on(t, e, n, i)
                        },
                        undelegate: function(e, t, n) {
                            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                        },
                        trigger: function(e, t) {
                            return this.each(function() {
                                ce.event.trigger(e, t, this)
                            })
                        },
                        triggerHandler: function(e, t) {
                            var n = this[0];
                            return n ? ce.event.trigger(e, t, n, !0) : void 0
                        }
                    }),
                    function(e, t) {
                        function n(e) {
                            return fe.test(e + "")
                        }

                        function i() {
                            var e, t = [];
                            return e = function(n, i) {
                                return t.push(n += " ") > k.cacheLength && delete e[t.shift()], e[n] = i
                            }
                        }

                        function r(e) {
                            return e[$] = !0, e
                        }

                        function o(e) {
                            var t = A.createElement("div");
                            try {
                                return e(t)
                            } catch (n) {
                                return !1
                            } finally {
                                t = null
                            }
                        }

                        function a(e, t, n, i) {
                            var r, o, a, s, l, d, c, h, g, f;
                            if ((t ? t.ownerDocument || t : R) !== A && D(t), t = t || A, n = n || [], !e || "string" != typeof e) return n;
                            if (1 !== (s = t.nodeType) && 9 !== s) return [];
                            if (!P && !i) {
                                if (r = me.exec(e))
                                    if (a = r[1]) {
                                        if (9 === s) {
                                            if (o = t.getElementById(a), !o || !o.parentNode) return n;
                                            if (o.id === a) return n.push(o), n
                                        } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && O(t, o) && o.id === a) return n.push(o), n
                                    } else {
                                        if (r[2]) return J.apply(n, Z.call(t.getElementsByTagName(e), 0)), n;
                                        if ((a = r[3]) && F.getByClassName && t.getElementsByClassName) return J.apply(n, Z.call(t.getElementsByClassName(a), 0)), n
                                    }
                                if (F.qsa && !H.test(e)) {
                                    if (c = !0, h = $, g = t, f = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                                        for (d = u(e), (c = t.getAttribute("id")) ? h = c.replace(ye, "\\$&") : t.setAttribute("id", h), h = "[id='" + h + "'] ", l = d.length; l--;) d[l] = h + p(d[l]);
                                        g = ge.test(e) && t.parentNode || t, f = d.join(",")
                                    }
                                    if (f) try {
                                        return J.apply(n, Z.call(g.querySelectorAll(f), 0)), n
                                    } catch (m) {} finally {
                                        c || t.removeAttribute("id")
                                    }
                                }
                            }
                            return w(e.replace(se, "$1"), t, n, i)
                        }

                        function s(e, t) {
                            var n = t && e,
                                i = n && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
                            if (i) return i;
                            if (n)
                                for (; n = n.nextSibling;)
                                    if (n === t) return -1;
                            return e ? 1 : -1
                        }

                        function l(e) {
                            return function(t) {
                                var n = t.nodeName.toLowerCase();
                                return "input" === n && t.type === e
                            }
                        }

                        function d(e) {
                            return function(t) {
                                var n = t.nodeName.toLowerCase();
                                return ("input" === n || "button" === n) && t.type === e
                            }
                        }

                        function c(e) {
                            return r(function(t) {
                                return t = +t, r(function(n, i) {
                                    for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                                })
                            })
                        }

                        function u(e, t) {
                            var n, i, r, o, s, l, d, c = V[e + " "];
                            if (c) return t ? 0 : c.slice(0);
                            for (s = e, l = [], d = k.preFilter; s;) {
                                (!n || (i = le.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(r = [])), n = !1, (i = de.exec(s)) && (n = i.shift(), r.push({
                                    value: n,
                                    type: i[0].replace(se, " ")
                                }), s = s.slice(n.length));
                                for (o in k.filter) !(i = he[o].exec(s)) || d[o] && !(i = d[o](i)) || (n = i.shift(), r.push({
                                    value: n,
                                    type: o,
                                    matches: i
                                }), s = s.slice(n.length));
                                if (!n) break
                            }
                            return t ? s.length : s ? a.error(e) : V(e, l).slice(0)
                        }

                        function p(e) {
                            for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
                            return i
                        }

                        function h(e, t, n) {
                            var i = t.dir,
                                r = n && "parentNode" === i,
                                o = j++;
                            return t.first ? function(t, n, o) {
                                for (; t = t[i];)
                                    if (1 === t.nodeType || r) return e(t, n, o)
                            } : function(t, n, a) {
                                var s, l, d, c = G + " " + o;
                                if (a) {
                                    for (; t = t[i];)
                                        if ((1 === t.nodeType || r) && e(t, n, a)) return !0
                                } else
                                    for (; t = t[i];)
                                        if (1 === t.nodeType || r)
                                            if (d = t[$] || (t[$] = {}), (l = d[i]) && l[0] === c) {
                                                if ((s = l[1]) === !0 || s === S) return s === !0
                                            } else if (l = d[i] = [c], l[1] = e(t, n, a) || S, l[1] === !0) return !0
                            }
                        }

                        function g(e) {
                            return e.length > 1 ? function(t, n, i) {
                                for (var r = e.length; r--;)
                                    if (!e[r](t, n, i)) return !1;
                                return !0
                            } : e[0]
                        }

                        function f(e, t, n, i, r) {
                            for (var o, a = [], s = 0, l = e.length, d = null != t; l > s; s++)(o = e[s]) && (!n || n(o, i, r)) && (a.push(o), d && t.push(s));
                            return a
                        }

                        function m(e, t, n, i, o, a) {
                            return i && !i[$] && (i = m(i)), o && !o[$] && (o = m(o, a)), r(function(r, a, s, l) {
                                var d, c, u, p = [],
                                    h = [],
                                    g = a.length,
                                    m = r || y(t || "*", s.nodeType ? [s] : s, []),
                                    v = !e || !r && t ? m : f(m, p, e, s, l),
                                    b = n ? o || (r ? e : g || i) ? [] : a : v;
                                if (n && n(v, b, s, l), i)
                                    for (d = f(b, h), i(d, [], s, l), c = d.length; c--;)(u = d[c]) && (b[h[c]] = !(v[h[c]] = u));
                                if (r) {
                                    if (o || e) {
                                        if (o) {
                                            for (d = [], c = b.length; c--;)(u = b[c]) && d.push(v[c] = u);
                                            o(null, b = [], d, l)
                                        }
                                        for (c = b.length; c--;)(u = b[c]) && (d = o ? ee.call(r, u) : p[c]) > -1 && (r[d] = !(a[d] = u))
                                    }
                                } else b = f(b === a ? b.splice(g, b.length) : b), o ? o(null, a, b, l) : J.apply(a, b)
                            })
                        }

                        function v(e) {
                            for (var t, n, i, r = e.length, o = k.relative[e[0].type], a = o || k.relative[" "], s = o ? 1 : 0, l = h(function(e) {
                                    return e === t
                                }, a, !0), d = h(function(e) {
                                    return ee.call(t, e) > -1
                                }, a, !0), c = [function(e, n, i) {
                                    return !o && (i || n !== I) || ((t = n).nodeType ? l(e, n, i) : d(e, n, i))
                                }]; r > s; s++)
                                if (n = k.relative[e[s].type]) c = [h(g(c), n)];
                                else {
                                    if (n = k.filter[e[s].type].apply(null, e[s].matches), n[$]) {
                                        for (i = ++s; r > i && !k.relative[e[i].type]; i++);
                                        return m(s > 1 && g(c), s > 1 && p(e.slice(0, s - 1)).replace(se, "$1"), n, i > s && v(e.slice(s, i)), r > i && v(e = e.slice(i)), r > i && p(e))
                                    }
                                    c.push(n)
                                }
                            return g(c)
                        }

                        function b(e, t) {
                            var n = 0,
                                i = t.length > 0,
                                o = e.length > 0,
                                s = function(r, s, l, d, c) {
                                    var u, p, h, g = [],
                                        m = 0,
                                        v = "0",
                                        b = r && [],
                                        y = null != c,
                                        w = I,
                                        x = r || o && k.find.TAG("*", c && s.parentNode || s),
                                        C = G += null == w ? 1 : Math.random() || .1;
                                    for (y && (I = s !== A && s, S = n); null != (u = x[v]); v++) {
                                        if (o && u) {
                                            for (p = 0; h = e[p++];)
                                                if (h(u, s, l)) {
                                                    d.push(u);
                                                    break
                                                }
                                            y && (G = C, S = ++n)
                                        }
                                        i && ((u = !h && u) && m--, r && b.push(u))
                                    }
                                    if (m += v, i && v !== m) {
                                        for (p = 0; h = t[p++];) h(b, g, s, l);
                                        if (r) {
                                            if (m > 0)
                                                for (; v--;) b[v] || g[v] || (g[v] = Q.call(d));
                                            g = f(g)
                                        }
                                        J.apply(d, g), y && !r && g.length > 0 && m + t.length > 1 && a.uniqueSort(d)
                                    }
                                    return y && (G = C, I = w), b
                                };
                            return i ? r(s) : s
                        }

                        function y(e, t, n) {
                            for (var i = 0, r = t.length; r > i; i++) a(e, t[i], n);
                            return n
                        }

                        function w(e, t, n, i) {
                            var r, o, a, s, l, d = u(e);
                            if (!i && 1 === d.length) {
                                if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && 9 === t.nodeType && !P && k.relative[o[1].type]) {
                                    if (t = k.find.ID(a.matches[0].replace(xe, Ce), t)[0], !t) return n;
                                    e = e.slice(o.shift().value.length)
                                }
                                for (r = he.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !k.relative[s = a.type]);)
                                    if ((l = k.find[s]) && (i = l(a.matches[0].replace(xe, Ce), ge.test(o[0].type) && t.parentNode || t))) {
                                        if (o.splice(r, 1), e = i.length && p(o), !e) return J.apply(n, Z.call(i, 0)), n;
                                        break
                                    }
                            }
                            return _(e, d)(i, t, P, n, ge.test(e)), n
                        }

                        function x() {}
                        var C, S, k, E, T, _, L, I, D, A, M, P, H, N, z, O, U, $ = "sizzle" + -new Date,
                            R = e.document,
                            F = {},
                            G = 0,
                            j = 0,
                            W = i(),
                            V = i(),
                            q = i(),
                            X = typeof t,
                            Y = 1 << 31,
                            K = [],
                            Q = K.pop,
                            J = K.push,
                            Z = K.slice,
                            ee = K.indexOf || function(e) {
                                for (var t = 0, n = this.length; n > t; t++)
                                    if (this[t] === e) return t;
                                return -1
                            },
                            te = "[\\x20\\t\\r\\n\\f]",
                            ne = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                            ie = ne.replace("w", "w#"),
                            re = "([*^$|!~]?=)",
                            oe = "\\[" + te + "*(" + ne + ")" + te + "*(?:" + re + te + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ie + ")|)|)" + te + "*\\]",
                            ae = ":(" + ne + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + oe.replace(3, 8) + ")*)|.*)\\)|)",
                            se = new RegExp("^" + te + "+|((?:^|[^\\\\])(?:\\\\.)*)" + te + "+$", "g"),
                            le = new RegExp("^" + te + "*," + te + "*"),
                            de = new RegExp("^" + te + "*([\\x20\\t\\r\\n\\f>+~])" + te + "*"),
                            ue = new RegExp(ae),
                            pe = new RegExp("^" + ie + "$"),
                            he = {
                                ID: new RegExp("^#(" + ne + ")"),
                                CLASS: new RegExp("^\\.(" + ne + ")"),
                                NAME: new RegExp("^\\[name=['\"]?(" + ne + ")['\"]?\\]"),
                                TAG: new RegExp("^(" + ne.replace("w", "w*") + ")"),
                                ATTR: new RegExp("^" + oe),
                                PSEUDO: new RegExp("^" + ae),
                                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + te + "*(even|odd|(([+-]|)(\\d*)n|)" + te + "*(?:([+-]|)" + te + "*(\\d+)|))" + te + "*\\)|)", "i"),
                                needsContext: new RegExp("^" + te + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + te + "*((?:-\\d)?\\d*)" + te + "*\\)|)(?=[^-]|$)", "i")
                            },
                            ge = /[\x20\t\r\n\f]*[+~]/,
                            fe = /^[^{]+\{\s*\[native code/,
                            me = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                            ve = /^(?:input|select|textarea|button)$/i,
                            be = /^h\d$/i,
                            ye = /'|\\/g,
                            we = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                            xe = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
                            Ce = function(e, t) {
                                var n = "0x" + t - 65536;
                                return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
                            };
                        try {
                            Z.call(R.documentElement.childNodes, 0)[0].nodeType
                        } catch (Se) {
                            Z = function(e) {
                                for (var t, n = []; t = this[e++];) n.push(t);
                                return n
                            }
                        }
                        T = a.isXML = function(e) {
                            var t = e && (e.ownerDocument || e).documentElement;
                            return t ? "HTML" !== t.nodeName : !1
                        }, D = a.setDocument = function(e) {
                            var i = e ? e.ownerDocument || e : R;
                            return i !== A && 9 === i.nodeType && i.documentElement ? (A = i, M = i.documentElement, P = T(i), F.tagNameNoComments = o(function(e) {
                                return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
                            }), F.attributes = o(function(e) {
                                e.innerHTML = "<select></select>";
                                var t = typeof e.lastChild.getAttribute("multiple");
                                return "boolean" !== t && "string" !== t
                            }), F.getByClassName = o(function(e) {
                                return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
                            }), F.getByName = o(function(e) {
                                e.id = $ + 0, e.innerHTML = "<a name='" + $ + "'></a><div name='" + $ + "'></div>", M.insertBefore(e, M.firstChild);
                                var t = i.getElementsByName && i.getElementsByName($).length === 2 + i.getElementsByName($ + 0).length;
                                return F.getIdNotName = !i.getElementById($), M.removeChild(e), t
                            }), k.attrHandle = o(function(e) {
                                return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== X && "#" === e.firstChild.getAttribute("href")
                            }) ? {} : {
                                href: function(e) {
                                    return e.getAttribute("href", 2)
                                },
                                type: function(e) {
                                    return e.getAttribute("type")
                                }
                            }, F.getIdNotName ? (k.find.ID = function(e, t) {
                                if (typeof t.getElementById !== X && !P) {
                                    var n = t.getElementById(e);
                                    return n && n.parentNode ? [n] : []
                                }
                            }, k.filter.ID = function(e) {
                                var t = e.replace(xe, Ce);
                                return function(e) {
                                    return e.getAttribute("id") === t
                                }
                            }) : (k.find.ID = function(e, n) {
                                if (typeof n.getElementById !== X && !P) {
                                    var i = n.getElementById(e);
                                    return i ? i.id === e || typeof i.getAttributeNode !== X && i.getAttributeNode("id").value === e ? [i] : t : []
                                }
                            }, k.filter.ID = function(e) {
                                var t = e.replace(xe, Ce);
                                return function(e) {
                                    var n = typeof e.getAttributeNode !== X && e.getAttributeNode("id");
                                    return n && n.value === t
                                }
                            }), k.find.TAG = F.tagNameNoComments ? function(e, t) {
                                return typeof t.getElementsByTagName !== X ? t.getElementsByTagName(e) : void 0
                            } : function(e, t) {
                                var n, i = [],
                                    r = 0,
                                    o = t.getElementsByTagName(e);
                                if ("*" === e) {
                                    for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                                    return i
                                }
                                return o
                            }, k.find.NAME = F.getByName && function(e, t) {
                                return typeof t.getElementsByName !== X ? t.getElementsByName(name) : void 0
                            }, k.find.CLASS = F.getByClassName && function(e, t) {
                                return typeof t.getElementsByClassName === X || P ? void 0 : t.getElementsByClassName(e)
                            }, N = [], H = [":focus"], (F.qsa = n(i.querySelectorAll)) && (o(function(e) {
                                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || H.push("\\[" + te + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || H.push(":checked")
                            }), o(function(e) {
                                e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && H.push("[*^$]=" + te + "*(?:\"\"|'')"), e.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), H.push(",.*:")
                            })), (F.matchesSelector = n(z = M.matchesSelector || M.mozMatchesSelector || M.webkitMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && o(function(e) {
                                F.disconnectedMatch = z.call(e, "div"), z.call(e, "[s!='']:x"), N.push("!=", ae)
                            }), H = new RegExp(H.join("|")), N = new RegExp(N.join("|")), O = n(M.contains) || M.compareDocumentPosition ? function(e, t) {
                                var n = 9 === e.nodeType ? e.documentElement : e,
                                    i = t && t.parentNode;
                                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                            } : function(e, t) {
                                if (t)
                                    for (; t = t.parentNode;)
                                        if (t === e) return !0;
                                return !1
                            }, U = M.compareDocumentPosition ? function(e, t) {
                                var n;
                                return e === t ? (L = !0, 0) : (n = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & n || e.parentNode && 11 === e.parentNode.nodeType ? e === i || O(R, e) ? -1 : t === i || O(R, t) ? 1 : 0 : 4 & n ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                            } : function(e, t) {
                                var n, r = 0,
                                    o = e.parentNode,
                                    a = t.parentNode,
                                    l = [e],
                                    d = [t];
                                if (e === t) return L = !0, 0;
                                if (!o || !a) return e === i ? -1 : t === i ? 1 : o ? -1 : a ? 1 : 0;
                                if (o === a) return s(e, t);
                                for (n = e; n = n.parentNode;) l.unshift(n);
                                for (n = t; n = n.parentNode;) d.unshift(n);
                                for (; l[r] === d[r];) r++;
                                return r ? s(l[r], d[r]) : l[r] === R ? -1 : d[r] === R ? 1 : 0
                            }, L = !1, [0, 0].sort(U), F.detectDuplicates = L, A) : A
                        }, a.matches = function(e, t) {
                            return a(e, null, null, t)
                        }, a.matchesSelector = function(e, t) {
                            if ((e.ownerDocument || e) !== A && D(e), t = t.replace(we, "='$1']"), F.matchesSelector && !P && (!N || !N.test(t)) && !H.test(t)) try {
                                var n = z.call(e, t);
                                if (n || F.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                            } catch (i) {}
                            return a(t, A, null, [e]).length > 0
                        }, a.contains = function(e, t) {
                            return (e.ownerDocument || e) !== A && D(e), O(e, t)
                        }, a.attr = function(e, t) {
                            var n;
                            return (e.ownerDocument || e) !== A && D(e), P || (t = t.toLowerCase()), (n = k.attrHandle[t]) ? n(e) : P || F.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null
                        }, a.error = function(e) {
                            throw new B("Syntax error, unrecognized expression: " + e)
                        }, a.uniqueSort = function(e) {
                            var t, n = [],
                                i = 1,
                                r = 0;
                            if (L = !F.detectDuplicates, e.sort(U), L) {
                                for (; t = e[i]; i++) t === e[i - 1] && (r = n.push(i));
                                for (; r--;) e.splice(n[r], 1)
                            }
                            return e
                        }, E = a.getText = function(e) {
                            var t, n = "",
                                i = 0,
                                r = e.nodeType;
                            if (r) {
                                if (1 === r || 9 === r || 11 === r) {
                                    if ("string" == typeof e.textContent) return e.textContent;
                                    for (e = e.firstChild; e; e = e.nextSibling) n += E(e)
                                } else if (3 === r || 4 === r) return e.nodeValue
                            } else
                                for (; t = e[i]; i++) n += E(t);
                            return n
                        }, k = a.selectors = {
                            cacheLength: 50,
                            createPseudo: r,
                            match: he,
                            find: {},
                            relative: {
                                ">": {
                                    dir: "parentNode",
                                    first: !0
                                },
                                " ": {
                                    dir: "parentNode"
                                },
                                "+": {
                                    dir: "previousSibling",
                                    first: !0
                                },
                                "~": {
                                    dir: "previousSibling"
                                }
                            },
                            preFilter: {
                                ATTR: function(e) {
                                    return e[1] = e[1].replace(xe, Ce), e[3] = (e[4] || e[5] || "").replace(xe, Ce), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                                },
                                CHILD: function(e) {
                                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || a.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && a.error(e[0]), e
                                },
                                PSEUDO: function(e) {
                                    var t, n = !e[5] && e[2];
                                    return he.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && ue.test(n) && (t = u(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                                }
                            },
                            filter: {
                                TAG: function(e) {
                                    return "*" === e ? function() {
                                        return !0
                                    } : (e = e.replace(xe, Ce).toLowerCase(), function(t) {
                                        return t.nodeName && t.nodeName.toLowerCase() === e
                                    })
                                },
                                CLASS: function(e) {
                                    var t = W[e + " "];
                                    return t || (t = new RegExp("(^|" + te + ")" + e + "(" + te + "|$)")) && W(e, function(e) {
                                        return t.test(e.className || typeof e.getAttribute !== X && e.getAttribute("class") || "")
                                    })
                                },
                                ATTR: function(e, t, n) {
                                    return function(i) {
                                        var r = a.attr(i, e);
                                        return null == r ? "!=" === t : t ? (r += "", "=" === t ? r === n : "!=" === t ? r !== n : "^=" === t ? n && 0 === r.indexOf(n) : "*=" === t ? n && r.indexOf(n) > -1 : "$=" === t ? n && r.slice(-n.length) === n : "~=" === t ? (" " + r + " ").indexOf(n) > -1 : "|=" === t ? r === n || r.slice(0, n.length + 1) === n + "-" : !1) : !0
                                    }
                                },
                                CHILD: function(e, t, n, i, r) {
                                    var o = "nth" !== e.slice(0, 3),
                                        a = "last" !== e.slice(-4),
                                        s = "of-type" === t;
                                    return 1 === i && 0 === r ? function(e) {
                                        return !!e.parentNode
                                    } : function(t, n, l) {
                                        var d, c, u, p, h, g, f = o !== a ? "nextSibling" : "previousSibling",
                                            m = t.parentNode,
                                            v = s && t.nodeName.toLowerCase(),
                                            b = !l && !s;
                                        if (m) {
                                            if (o) {
                                                for (; f;) {
                                                    for (u = t; u = u[f];)
                                                        if (s ? u.nodeName.toLowerCase() === v : 1 === u.nodeType) return !1;
                                                    g = f = "only" === e && !g && "nextSibling"
                                                }
                                                return !0
                                            }
                                            if (g = [a ? m.firstChild : m.lastChild], a && b) {
                                                for (c = m[$] || (m[$] = {}), d = c[e] || [], h = d[0] === G && d[1], p = d[0] === G && d[2], u = h && m.childNodes[h]; u = ++h && u && u[f] || (p = h = 0) || g.pop();)
                                                    if (1 === u.nodeType && ++p && u === t) {
                                                        c[e] = [G, h, p];
                                                        break
                                                    }
                                            } else if (b && (d = (t[$] || (t[$] = {}))[e]) && d[0] === G) p = d[1];
                                            else
                                                for (;
                                                    (u = ++h && u && u[f] || (p = h = 0) || g.pop()) && ((s ? u.nodeName.toLowerCase() !== v : 1 !== u.nodeType) || !++p || (b && ((u[$] || (u[$] = {}))[e] = [G, p]), u !== t)););
                                            return p -= r, p === i || p % i === 0 && p / i >= 0
                                        }
                                    }
                                },
                                PSEUDO: function(e, t) {
                                    var n, i = k.pseudos[e] || k.setFilters[e.toLowerCase()] || a.error("unsupported pseudo: " + e);
                                    return i[$] ? i(t) : i.length > 1 ? (n = [e, e, "", t], k.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, n) {
                                        for (var r, o = i(e, t), a = o.length; a--;) r = ee.call(e, o[a]), e[r] = !(n[r] = o[a])
                                    }) : function(e) {
                                        return i(e, 0, n)
                                    }) : i
                                }
                            },
                            pseudos: {
                                not: r(function(e) {
                                    var t = [],
                                        n = [],
                                        i = _(e.replace(se, "$1"));
                                    return i[$] ? r(function(e, t, n, r) {
                                        for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                                    }) : function(e, r, o) {
                                        return t[0] = e, i(t, null, o, n), !n.pop()
                                    }
                                }),
                                has: r(function(e) {
                                    return function(t) {
                                        return a(e, t).length > 0
                                    }
                                }),
                                contains: r(function(e) {
                                    return function(t) {
                                        return (t.textContent || t.innerText || E(t)).indexOf(e) > -1
                                    }
                                }),
                                lang: r(function(e) {
                                    return pe.test(e || "") || a.error("unsupported lang: " + e), e = e.replace(xe, Ce).toLowerCase(),
                                        function(t) {
                                            var n;
                                            do
                                                if (n = P ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                                            return !1
                                        }
                                }),
                                target: function(t) {
                                    var n = e.location && e.location.hash;
                                    return n && n.slice(1) === t.id
                                },
                                root: function(e) {
                                    return e === M
                                },
                                focus: function(e) {
                                    return e === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                                },
                                enabled: function(e) {
                                    return e.disabled === !1
                                },
                                disabled: function(e) {
                                    return e.disabled === !0
                                },
                                checked: function(e) {
                                    var t = e.nodeName.toLowerCase();
                                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                                },
                                selected: function(e) {
                                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                                },
                                empty: function(e) {
                                    for (e = e.firstChild; e; e = e.nextSibling)
                                        if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                                    return !0
                                },
                                parent: function(e) {
                                    return !k.pseudos.empty(e)
                                },
                                header: function(e) {
                                    return be.test(e.nodeName)
                                },
                                input: function(e) {
                                    return ve.test(e.nodeName)
                                },
                                button: function(e) {
                                    var t = e.nodeName.toLowerCase();
                                    return "input" === t && "button" === e.type || "button" === t
                                },
                                text: function(e) {
                                    var t;
                                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                                },
                                first: c(function() {
                                    return [0]
                                }),
                                last: c(function(e, t) {
                                    return [t - 1]
                                }),
                                eq: c(function(e, t, n) {
                                    return [0 > n ? n + t : n]
                                }),
                                even: c(function(e, t) {
                                    for (var n = 0; t > n; n += 2) e.push(n);
                                    return e
                                }),
                                odd: c(function(e, t) {
                                    for (var n = 1; t > n; n += 2) e.push(n);
                                    return e
                                }),
                                lt: c(function(e, t, n) {
                                    for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
                                    return e
                                }),
                                gt: c(function(e, t, n) {
                                    for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
                                    return e
                                })
                            }
                        };
                        for (C in {
                                radio: !0,
                                checkbox: !0,
                                file: !0,
                                password: !0,
                                image: !0
                            }) k.pseudos[C] = l(C);
                        for (C in {
                                submit: !0,
                                reset: !0
                            }) k.pseudos[C] = d(C);
                        _ = a.compile = function(e, t) {
                            var n, i = [],
                                r = [],
                                o = q[e + " "];
                            if (!o) {
                                for (t || (t = u(e)), n = t.length; n--;) o = v(t[n]), o[$] ? i.push(o) : r.push(o);
                                o = q(e, b(r, i))
                            }
                            return o
                        }, k.pseudos.nth = k.pseudos.eq, k.filters = x.prototype = k.pseudos, k.setFilters = new x, D(), a.attr = ce.attr, ce.find = a, ce.expr = a.selectors, ce.expr[":"] = ce.expr.pseudos, ce.unique = a.uniqueSort, ce.text = a.getText, ce.isXMLDoc = a.isXML, ce.contains = a.contains
                    }(e);
                var Ge = /Until$/,
                    je = /^(?:parents|prev(?:Until|All))/,
                    We = /^.[^:#\[\.,]*$/,
                    Ve = ce.expr.match.needsContext,
                    qe = {
                        children: !0,
                        contents: !0,
                        next: !0,
                        prev: !0
                    };
                ce.fn.extend({
                    find: function(e) {
                        var t, n, i, r = this.length;
                        if ("string" != typeof e) return i = this, this.pushStack(ce(e).filter(function() {
                            for (t = 0; r > t; t++)
                                if (ce.contains(i[t], this)) return !0
                        }));
                        for (n = [], t = 0; r > t; t++) ce.find(e, this[t], n);
                        return n = this.pushStack(r > 1 ? ce.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, n
                    },
                    has: function(e) {
                        var t, n = ce(e, this),
                            i = n.length;
                        return this.filter(function() {
                            for (t = 0; i > t; t++)
                                if (ce.contains(this, n[t])) return !0
                        })
                    },
                    not: function(e) {
                        return this.pushStack(p(this, e, !1))
                    },
                    filter: function(e) {
                        return this.pushStack(p(this, e, !0))
                    },
                    is: function(e) {
                        return !!e && ("string" == typeof e ? Ve.test(e) ? ce(e, this.context).index(this[0]) >= 0 : ce.filter(e, this).length > 0 : this.filter(e).length > 0)
                    },
                    closest: function(e, t) {
                        for (var n, i = 0, r = this.length, o = [], a = Ve.test(e) || "string" != typeof e ? ce(e, t || this.context) : 0; r > i; i++)
                            for (n = this[i]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
                                if (a ? a.index(n) > -1 : ce.find.matchesSelector(n, e)) {
                                    o.push(n);
                                    break
                                }
                                n = n.parentNode
                            }
                        return this.pushStack(o.length > 1 ? ce.unique(o) : o)
                    },
                    index: function(e) {
                        return e ? "string" == typeof e ? ce.inArray(this[0], ce(e)) : ce.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    },
                    add: function(e, t) {
                        var n = "string" == typeof e ? ce(e, t) : ce.makeArray(e && e.nodeType ? [e] : e),
                            i = ce.merge(this.get(), n);
                        return this.pushStack(ce.unique(i))
                    },
                    addBack: function(e) {
                        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                    }
                }), ce.fn.andSelf = ce.fn.addBack, ce.each({
                    parent: function(e) {
                        var t = e.parentNode;
                        return t && 11 !== t.nodeType ? t : null
                    },
                    parents: function(e) {
                        return ce.dir(e, "parentNode")
                    },
                    parentsUntil: function(e, t, n) {
                        return ce.dir(e, "parentNode", n)
                    },
                    next: function(e) {
                        return u(e, "nextSibling")
                    },
                    prev: function(e) {
                        return u(e, "previousSibling")
                    },
                    nextAll: function(e) {
                        return ce.dir(e, "nextSibling")
                    },
                    prevAll: function(e) {
                        return ce.dir(e, "previousSibling")
                    },
                    nextUntil: function(e, t, n) {
                        return ce.dir(e, "nextSibling", n)
                    },
                    prevUntil: function(e, t, n) {
                        return ce.dir(e, "previousSibling", n)
                    },
                    siblings: function(e) {
                        return ce.sibling((e.parentNode || {}).firstChild, e)
                    },
                    children: function(e) {
                        return ce.sibling(e.firstChild)
                    },
                    contents: function(e) {
                        return ce.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ce.merge([], e.childNodes)
                    }
                }, function(e, t) {
                    ce.fn[e] = function(n, i) {
                        var r = ce.map(this, t, n);
                        return Ge.test(e) || (i = n), i && "string" == typeof i && (r = ce.filter(i, r)), r = this.length > 1 && !qe[e] ? ce.unique(r) : r, this.length > 1 && je.test(e) && (r = r.reverse()), this.pushStack(r)
                    }
                }), ce.extend({
                    filter: function(e, t, n) {
                        return n && (e = ":not(" + e + ")"), 1 === t.length ? ce.find.matchesSelector(t[0], e) ? [t[0]] : [] : ce.find.matches(e, t)
                    },
                    dir: function(e, n, i) {
                        for (var r = [], o = e[n]; o && 9 !== o.nodeType && (i === t || 1 !== o.nodeType || !ce(o).is(i));) 1 === o.nodeType && r.push(o), o = o[n];
                        return r
                    },
                    sibling: function(e, t) {
                        for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                        return n
                    }
                });
                var Xe = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                    Ye = / jQuery\d+="(?:null|\d+)"/g,
                    Ke = new RegExp("<(?:" + Xe + ")[\\s/>]", "i"),
                    Qe = /^\s+/,
                    Je = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                    Ze = /<([\w:]+)/,
                    et = /<tbody/i,
                    tt = /<|&#?\w+;/,
                    nt = /<(?:script|style|link)/i,
                    it = /^(?:checkbox|radio)$/i,
                    rt = /checked\s*(?:[^=]|=\s*.checked.)/i,
                    ot = /^$|\/(?:java|ecma)script/i,
                    at = /^true\/(.*)/,
                    st = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
                    lt = {
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        legend: [1, "<fieldset>", "</fieldset>"],
                        area: [1, "<map>", "</map>"],
                        param: [1, "<object>", "</object>"],
                        thead: [1, "<table>", "</table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        _default: ce.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
                    },
                    dt = h(K),
                    ct = dt.appendChild(K.createElement("div"));
                lt.optgroup = lt.option, lt.tbody = lt.tfoot = lt.colgroup = lt.caption = lt.thead, lt.th = lt.td, ce.fn.extend({
                    text: function(e) {
                        return ce.access(this, function(e) {
                            return e === t ? ce.text(this) : this.empty().append((this[0] && this[0].ownerDocument || K).createTextNode(e))
                        }, null, e, arguments.length)
                    },
                    wrapAll: function(e) {
                        if (ce.isFunction(e)) return this.each(function(t) {
                            ce(this).wrapAll(e.call(this, t))
                        });
                        if (this[0]) {
                            var t = ce(e, this[0].ownerDocument).eq(0).clone(!0);
                            this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                                for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                                return e
                            }).append(this)
                        }
                        return this
                    },
                    wrapInner: function(e) {
                        return ce.isFunction(e) ? this.each(function(t) {
                            ce(this).wrapInner(e.call(this, t))
                        }) : this.each(function() {
                            var t = ce(this),
                                n = t.contents();
                            n.length ? n.wrapAll(e) : t.append(e)
                        })
                    },
                    wrap: function(e) {
                        var t = ce.isFunction(e);
                        return this.each(function(n) {
                            ce(this).wrapAll(t ? e.call(this, n) : e)
                        })
                    },
                    unwrap: function() {
                        return this.parent().each(function() {
                            ce.nodeName(this, "body") || ce(this).replaceWith(this.childNodes)
                        }).end()
                    },
                    append: function() {
                        return this.domManip(arguments, !0, function(e) {
                            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e)
                        })
                    },
                    prepend: function() {
                        return this.domManip(arguments, !0, function(e) {
                            (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild)
                        })
                    },
                    before: function() {
                        return this.domManip(arguments, !1, function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this)
                        })
                    },
                    after: function() {
                        return this.domManip(arguments, !1, function(e) {
                            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                        })
                    },
                    remove: function(e, t) {
                        for (var n, i = 0; null != (n = this[i]); i++)(!e || ce.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || ce.cleanData(w(n)), n.parentNode && (t && ce.contains(n.ownerDocument, n) && v(w(n, "script")), n.parentNode.removeChild(n)));
                        return this
                    },
                    empty: function() {
                        for (var e, t = 0; null != (e = this[t]); t++) {
                            for (1 === e.nodeType && ce.cleanData(w(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                            e.options && ce.nodeName(e, "select") && (e.options.length = 0)
                        }
                        return this
                    },
                    clone: function(e, t) {
                        return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                            return ce.clone(this, e, t)
                        })
                    },
                    html: function(e) {
                        return ce.access(this, function(e) {
                            var n = this[0] || {},
                                i = 0,
                                r = this.length;
                            if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Ye, "") : t;
                            if ("string" == typeof e && !nt.test(e) && (ce.support.htmlSerialize || !Ke.test(e)) && (ce.support.leadingWhitespace || !Qe.test(e)) && !lt[(Ze.exec(e) || ["", ""])[1].toLowerCase()]) {
                                e = e.replace(Je, "<$1></$2>");
                                try {
                                    for (; r > i; i++) n = this[i] || {}, 1 === n.nodeType && (ce.cleanData(w(n, !1)), n.innerHTML = e);
                                    n = 0
                                } catch (o) {}
                            }
                            n && this.empty().append(e)
                        }, null, e, arguments.length)
                    },
                    replaceWith: function(e) {
                        var t = ce.isFunction(e);
                        return t || "string" == typeof e || (e = ce(e).not(this).detach()), this.domManip([e], !0, function(e) {
                            var t = this.nextSibling,
                                n = this.parentNode;
                            n && (ce(this).remove(), n.insertBefore(e, t))
                        })
                    },
                    detach: function(e) {
                        return this.remove(e, !0)
                    },
                    domManip: function(e, n, i) {
                        e = ie.apply([], e);
                        var r, o, a, s, l, d, c = 0,
                            u = this.length,
                            p = this,
                            h = u - 1,
                            v = e[0],
                            b = ce.isFunction(v);
                        if (b || !(1 >= u || "string" != typeof v || ce.support.checkClone) && rt.test(v)) return this.each(function(r) {
                            var o = p.eq(r);
                            b && (e[0] = v.call(this, r, n ? o.html() : t)), o.domManip(e, n, i)
                        });
                        if (u && (d = ce.buildFragment(e, this[0].ownerDocument, !1, this), r = d.firstChild, 1 === d.childNodes.length && (d = r), r)) {
                            for (n = n && ce.nodeName(r, "tr"), s = ce.map(w(d, "script"), f), a = s.length; u > c; c++) o = d, c !== h && (o = ce.clone(o, !0, !0), a && ce.merge(s, w(o, "script"))), i.call(n && ce.nodeName(this[c], "table") ? g(this[c], "tbody") : this[c], o, c);
                            if (a)
                                for (l = s[s.length - 1].ownerDocument, ce.map(s, m), c = 0; a > c; c++) o = s[c], ot.test(o.type || "") && !ce._data(o, "globalEval") && ce.contains(l, o) && (o.src ? ce.ajax({
                                    url: o.src,
                                    type: "GET",
                                    dataType: "script",
                                    async: !1,
                                    global: !1,
                                    "throws": !0
                                }) : ce.globalEval((o.text || o.textContent || o.innerHTML || "").replace(st, "")));
                            d = r = null
                        }
                        return this
                    }
                }), ce.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                }, function(e, t) {
                    ce.fn[e] = function(e) {
                        for (var n, i = 0, r = [], o = ce(e), a = o.length - 1; a >= i; i++) n = i === a ? this : this.clone(!0), ce(o[i])[t](n), re.apply(r, n.get());
                        return this.pushStack(r)
                    }
                }), ce.extend({
                    clone: function(e, t, n) {
                        var i, r, o, a, s, l = ce.contains(e.ownerDocument, e);
                        if (ce.support.html5Clone || ce.isXMLDoc(e) || !Ke.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ct.innerHTML = e.outerHTML, ct.removeChild(o = ct.firstChild)), !(ce.support.noCloneEvent && ce.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ce.isXMLDoc(e)))
                            for (i = w(o), s = w(e), a = 0; null != (r = s[a]); ++a) i[a] && y(r, i[a]);
                        if (t)
                            if (n)
                                for (s = s || w(e), i = i || w(o), a = 0; null != (r = s[a]); a++) b(r, i[a]);
                            else b(e, o);
                        return i = w(o, "script"), i.length > 0 && v(i, !l && w(e, "script")), i = s = r = null, o
                    },
                    buildFragment: function(e, t, n, i) {
                        for (var r, o, a, s, l, d, c, u = e.length, p = h(t), g = [], f = 0; u > f; f++)
                            if (o = e[f], o || 0 === o)
                                if ("object" === ce.type(o)) ce.merge(g, o.nodeType ? [o] : o);
                                else if (tt.test(o)) {
                            for (s = s || p.appendChild(t.createElement("div")), l = (Ze.exec(o) || ["", ""])[1].toLowerCase(), c = lt[l] || lt._default, s.innerHTML = c[1] + o.replace(Je, "<$1></$2>") + c[2], r = c[0]; r--;) s = s.lastChild;
                            if (!ce.support.leadingWhitespace && Qe.test(o) && g.push(t.createTextNode(Qe.exec(o)[0])), !ce.support.tbody)
                                for (o = "table" !== l || et.test(o) ? "<table>" !== c[1] || et.test(o) ? 0 : s : s.firstChild, r = o && o.childNodes.length; r--;) ce.nodeName(d = o.childNodes[r], "tbody") && !d.childNodes.length && o.removeChild(d);
                            for (ce.merge(g, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                            s = p.lastChild
                        } else g.push(t.createTextNode(o));
                        for (s && p.removeChild(s), ce.support.appendChecked || ce.grep(w(g, "input"), x), f = 0; o = g[f++];)
                            if ((!i || -1 === ce.inArray(o, i)) && (a = ce.contains(o.ownerDocument, o), s = w(p.appendChild(o), "script"), a && v(s), n))
                                for (r = 0; o = s[r++];) ot.test(o.type || "") && n.push(o);
                        return s = null, p
                    },
                    cleanData: function(e, t) {
                        for (var n, i, r, o, a = 0, s = ce.expando, l = ce.cache, d = ce.support.deleteExpando, c = ce.event.special; null != (n = e[a]); a++)
                            if ((t || ce.acceptData(n)) && (r = n[s], o = r && l[r])) {
                                if (o.events)
                                    for (i in o.events) c[i] ? ce.event.remove(n, i) : ce.removeEvent(n, i, o.handle);
                                l[r] && (delete l[r], d ? delete n[s] : typeof n.removeAttribute !== Y ? n.removeAttribute(s) : n[s] = null, te.push(r))
                            }
                    }
                });
                var ut, pt, ht, gt = /alpha\([^)]*\)/i,
                    ft = /opacity\s*=\s*([^)]*)/,
                    mt = /^(top|right|bottom|left)$/,
                    vt = /^(none|table(?!-c[ea]).+)/,
                    bt = /^margin/,
                    yt = new RegExp("^(" + ue + ")(.*)$", "i"),
                    wt = new RegExp("^(" + ue + ")(?!px)[a-z%]+$", "i"),
                    xt = new RegExp("^([+-])=(" + ue + ")", "i"),
                    Ct = {
                        BODY: "block"
                    },
                    St = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    kt = {
                        letterSpacing: 0,
                        fontWeight: 400
                    },
                    Et = ["Top", "Right", "Bottom", "Left"],
                    Tt = ["Webkit", "O", "Moz", "ms"];
                ce.fn.extend({
                    css: function(e, n) {
                        return ce.access(this, function(e, n, i) {
                            var r, o, a = {},
                                s = 0;
                            if (ce.isArray(n)) {
                                for (o = pt(e), r = n.length; r > s; s++) a[n[s]] = ce.css(e, n[s], !1, o);
                                return a
                            }
                            return i !== t ? ce.style(e, n, i) : ce.css(e, n)
                        }, e, n, arguments.length > 1)
                    },
                    show: function() {
                        return k(this, !0)
                    },
                    hide: function() {
                        return k(this)
                    },
                    toggle: function(e) {
                        var t = "boolean" == typeof e;
                        return this.each(function() {
                            (t ? e : S(this)) ? ce(this).show(): ce(this).hide()
                        })
                    }
                }), ce.extend({
                    cssHooks: {
                        opacity: {
                            get: function(e, t) {
                                if (t) {
                                    var n = ht(e, "opacity");
                                    return "" === n ? "1" : n
                                }
                            }
                        }
                    },
                    cssNumber: {
                        columnCount: !0,
                        fillOpacity: !0,
                        fontWeight: !0,
                        lineHeight: !0,
                        opacity: !0,
                        orphans: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0
                    },
                    cssProps: {
                        "float": ce.support.cssFloat ? "cssFloat" : "styleFloat"
                    },
                    style: function(e, n, i, r) {
                        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                            var o, a, s, l = ce.camelCase(n),
                                d = e.style;
                            if (n = ce.cssProps[l] || (ce.cssProps[l] = C(d, l)), s = ce.cssHooks[n] || ce.cssHooks[l], i === t) return s && "get" in s && (o = s.get(e, !1, r)) !== t ? o : d[n];
                            if (a = typeof i, "string" === a && (o = xt.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(ce.css(e, n)), a = "number"), !(null == i || "number" === a && isNaN(i) || ("number" !== a || ce.cssNumber[l] || (i += "px"), ce.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (d[n] = "inherit"), s && "set" in s && (i = s.set(e, i, r)) === t))) try {
                                d[n] = i
                            } catch (c) {}
                        }
                    },
                    css: function(e, n, i, r) {
                        var o, a, s, l = ce.camelCase(n);
                        return n = ce.cssProps[l] || (ce.cssProps[l] = C(e.style, l)), s = ce.cssHooks[n] || ce.cssHooks[l], s && "get" in s && (a = s.get(e, !0, i)), a === t && (a = ht(e, n, r)), "normal" === a && n in kt && (a = kt[n]), "" === i || i ? (o = parseFloat(a), i === !0 || ce.isNumeric(o) ? o || 0 : a) : a
                    },
                    swap: function(e, t, n, i) {
                        var r, o, a = {};
                        for (o in t) a[o] = e.style[o], e.style[o] = t[o];
                        r = n.apply(e, i || []);
                        for (o in t) e.style[o] = a[o];
                        return r
                    }
                }), e.getComputedStyle ? (pt = function(t) {
                    return e.getComputedStyle(t, null)
                }, ht = function(e, n, i) {
                    var r, o, a, s = i || pt(e),
                        l = s ? s.getPropertyValue(n) || s[n] : t,
                        d = e.style;
                    return s && ("" !== l || ce.contains(e.ownerDocument, e) || (l = ce.style(e, n)), wt.test(l) && bt.test(n) && (r = d.width, o = d.minWidth, a = d.maxWidth, d.minWidth = d.maxWidth = d.width = l, l = s.width, d.width = r, d.minWidth = o, d.maxWidth = a)), l
                }) : K.documentElement.currentStyle && (pt = function(e) {
                    return e.currentStyle
                }, ht = function(e, n, i) {
                    var r, o, a, s = i || pt(e),
                        l = s ? s[n] : t,
                        d = e.style;
                    return null == l && d && d[n] && (l = d[n]), wt.test(l) && !mt.test(n) && (r = d.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), d.left = "fontSize" === n ? "1em" : l, l = d.pixelLeft + "px", d.left = r, a && (o.left = a)), "" === l ? "auto" : l
                }), ce.each(["height", "width"], function(e, t) {
                    ce.cssHooks[t] = {
                        get: function(e, n, i) {
                            return n ? 0 === e.offsetWidth && vt.test(ce.css(e, "display")) ? ce.swap(e, St, function() {
                                return _(e, t, i)
                            }) : _(e, t, i) : void 0
                        },
                        set: function(e, n, i) {
                            var r = i && pt(e);
                            return E(e, n, i ? T(e, t, i, ce.support.boxSizing && "border-box" === ce.css(e, "boxSizing", !1, r), r) : 0)
                        }
                    }
                }), ce.support.opacity || (ce.cssHooks.opacity = {
                    get: function(e, t) {
                        return ft.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
                    },
                    set: function(e, t) {
                        var n = e.style,
                            i = e.currentStyle,
                            r = ce.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                            o = i && i.filter || n.filter || "";
                        n.zoom = 1, (t >= 1 || "" === t) && "" === ce.trim(o.replace(gt, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = gt.test(o) ? o.replace(gt, r) : o + " " + r)
                    }
                }), ce(function() {
                    ce.support.reliableMarginRight || (ce.cssHooks.marginRight = {
                        get: function(e, t) {
                            return t ? ce.swap(e, {
                                display: "inline-block"
                            }, ht, [e, "marginRight"]) : void 0
                        }
                    }), !ce.support.pixelPosition && ce.fn.position && ce.each(["top", "left"], function(e, t) {
                        ce.cssHooks[t] = {
                            get: function(e, n) {
                                return n ? (n = ht(e, t), wt.test(n) ? ce(e).position()[t] + "px" : n) : void 0
                            }
                        }
                    })
                }), ce.expr && ce.expr.filters && (ce.expr.filters.hidden = function(e) {
                    return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ce.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ce.css(e, "display"))
                }, ce.expr.filters.visible = function(e) {
                    return !ce.expr.filters.hidden(e)
                }), ce.each({
                    margin: "",
                    padding: "",
                    border: "Width"
                }, function(e, t) {
                    ce.cssHooks[e + t] = {
                        expand: function(n) {
                            for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) r[e + Et[i] + t] = o[i] || o[i - 2] || o[0];
                            return r
                        }
                    }, bt.test(e) || (ce.cssHooks[e + t].set = E)
                });
                var _t = /%20/g,
                    Lt = /\[\]$/,
                    It = /\r?\n/g,
                    Dt = /^(?:submit|button|image|reset|file)$/i,
                    At = /^(?:input|select|textarea|keygen)/i;
                ce.fn.extend({
                    serialize: function() {
                        return ce.param(this.serializeArray())
                    },
                    serializeArray: function() {
                        return this.map(function() {
                            var e = ce.prop(this, "elements");
                            return e ? ce.makeArray(e) : this
                        }).filter(function() {
                            var e = this.type;
                            return this.name && !ce(this).is(":disabled") && At.test(this.nodeName) && !Dt.test(e) && (this.checked || !it.test(e))
                        }).map(function(e, t) {
                            var n = ce(this).val();
                            return null == n ? null : ce.isArray(n) ? ce.map(n, function(e) {
                                return {
                                    name: t.name,
                                    value: e.replace(It, "\r\n")
                                }
                            }) : {
                                name: t.name,
                                value: n.replace(It, "\r\n")
                            }
                        }).get()
                    }
                }), ce.param = function(e, n) {
                    var i, r = [],
                        o = function(e, t) {
                            t = ce.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                        };
                    if (n === t && (n = ce.ajaxSettings && ce.ajaxSettings.traditional), ce.isArray(e) || e.jquery && !ce.isPlainObject(e)) ce.each(e, function() {
                        o(this.name, this.value)
                    });
                    else
                        for (i in e) D(i, e[i], n, o);
                    return r.join("&").replace(_t, "+")
                }, ce.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
                    ce.fn[t] = function(e, n) {
                        return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                    }
                }), ce.fn.hover = function(e, t) {
                    return this.mouseenter(e).mouseleave(t || e)
                };
                var Mt, Bt, Pt = ce.now(),
                    Ht = /\?/,
                    Nt = /#.*$/,
                    zt = /([?&])_=[^&]*/,
                    Ot = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
                    Ut = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                    $t = /^(?:GET|HEAD)$/,
                    Rt = /^\/\//,
                    Ft = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
                    Gt = ce.fn.load,
                    jt = {},
                    Wt = {},
                    Vt = "*/".concat("*");
                try {
                    Bt = Q.href
                } catch (qt) {
                    Bt = K.createElement("a"), Bt.href = "", Bt = Bt.href
                }
                Mt = Ft.exec(Bt.toLowerCase()) || [], ce.fn.load = function(e, n, i) {
                    if ("string" != typeof e && Gt) return Gt.apply(this, arguments);
                    var r, o, a, s = this,
                        l = e.indexOf(" ");
                    return l >= 0 && (r = e.slice(l, e.length), e = e.slice(0, l)), ce.isFunction(n) ? (i = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && ce.ajax({
                        url: e,
                        type: a,
                        dataType: "html",
                        data: n
                    }).done(function(e) {
                        o = arguments, s.html(r ? ce("<div>").append(ce.parseHTML(e)).find(r) : e)
                    }).complete(i && function(e, t) {
                        s.each(i, o || [e.responseText, t, e])
                    }), this
                }, ce.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
                    ce.fn[t] = function(e) {
                        return this.on(t, e)
                    }
                }), ce.each(["get", "post"], function(e, n) {
                    ce[n] = function(e, i, r, o) {
                        return ce.isFunction(i) && (o = o || r, r = i, i = t), ce.ajax({
                            url: e,
                            type: n,
                            dataType: o,
                            data: i,
                            success: r
                        })
                    }
                }), ce.extend({
                    active: 0,
                    lastModified: {},
                    etag: {},
                    ajaxSettings: {
                        url: Bt,
                        type: "GET",
                        isLocal: Ut.test(Mt[1]),
                        global: !0,
                        processData: !0,
                        async: !0,
                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                        accepts: {
                            "*": Vt,
                            text: "text/plain",
                            html: "text/html",
                            xml: "application/xml, text/xml",
                            json: "application/json, text/javascript"
                        },
                        contents: {
                            xml: /xml/,
                            html: /html/,
                            json: /json/
                        },
                        responseFields: {
                            xml: "responseXML",
                            text: "responseText"
                        },
                        converters: {
                            "* text": e.String,
                            "text html": !0,
                            "text json": ce.parseJSON,
                            "text xml": ce.parseXML
                        },
                        flatOptions: {
                            url: !0,
                            context: !0
                        }
                    },
                    ajaxSetup: function(e, t) {
                        return t ? P(P(e, ce.ajaxSettings), t) : P(ce.ajaxSettings, e)
                    },
                    ajaxPrefilter: A(jt),
                    ajaxTransport: A(Wt),
                    ajax: function(e, n) {
                        function i(e, n, i, r) {
                            var o, u, b, y, x, S = n;
                            2 !== w && (w = 2, l && clearTimeout(l), c = t, s = r || "", C.readyState = e > 0 ? 4 : 0, i && (y = H(p, C, i)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (x = C.getResponseHeader("Last-Modified"), x && (ce.lastModified[a] = x), x = C.getResponseHeader("etag"), x && (ce.etag[a] = x)), 204 === e ? (o = !0, S = "nocontent") : 304 === e ? (o = !0, S = "notmodified") : (o = N(p, y), S = o.state, u = o.data, b = o.error, o = !b)) : (b = S, (e || !S) && (S = "error", 0 > e && (e = 0))), C.status = e, C.statusText = (n || S) + "", o ? f.resolveWith(h, [u, S, C]) : f.rejectWith(h, [C, S, b]), C.statusCode(v), v = t, d && g.trigger(o ? "ajaxSuccess" : "ajaxError", [C, p, o ? u : b]), m.fireWith(h, [C, S]), d && (g.trigger("ajaxComplete", [C, p]), --ce.active || ce.event.trigger("ajaxStop")))
                        }
                        "object" == typeof e && (n = e, e = t), n = n || {};
                        var r, o, a, s, l, d, c, u, p = ce.ajaxSetup({}, n),
                            h = p.context || p,
                            g = p.context && (h.nodeType || h.jquery) ? ce(h) : ce.event,
                            f = ce.Deferred(),
                            m = ce.Callbacks("once memory"),
                            v = p.statusCode || {},
                            b = {},
                            y = {},
                            w = 0,
                            x = "canceled",
                            C = {
                                readyState: 0,
                                getResponseHeader: function(e) {
                                    var t;
                                    if (2 === w) {
                                        if (!u)
                                            for (u = {}; t = Ot.exec(s);) u[t[1].toLowerCase()] = t[2];
                                        t = u[e.toLowerCase()]
                                    }
                                    return null == t ? null : t
                                },
                                getAllResponseHeaders: function() {
                                    return 2 === w ? s : null
                                },
                                setRequestHeader: function(e, t) {
                                    var n = e.toLowerCase();
                                    return w || (e = y[n] = y[n] || e, b[e] = t), this
                                },
                                overrideMimeType: function(e) {
                                    return w || (p.mimeType = e), this
                                },
                                statusCode: function(e) {
                                    var t;
                                    if (e)
                                        if (2 > w)
                                            for (t in e) v[t] = [v[t], e[t]];
                                        else C.always(e[C.status]);
                                    return this
                                },
                                abort: function(e) {
                                    var t = e || x;
                                    return c && c.abort(t), i(0, t), this
                                }
                            };
                        if (f.promise(C).complete = m.add, C.success = C.done, C.error = C.fail, p.url = ((e || p.url || Bt) + "").replace(Nt, "").replace(Rt, Mt[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ce.trim(p.dataType || "*").toLowerCase().match(pe) || [""], null == p.crossDomain && (r = Ft.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === Mt[1] && r[2] === Mt[2] && (r[3] || ("http:" === r[1] ? 80 : 443)) == (Mt[3] || ("http:" === Mt[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = ce.param(p.data, p.traditional)), M(jt, p, n, C), 2 === w) return C;
                        d = p.global, d && 0 === ce.active++ && ce.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !$t.test(p.type), a = p.url, p.hasContent || (p.data && (a = p.url += (Ht.test(a) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = zt.test(a) ? a.replace(zt, "$1_=" + Pt++) : a + (Ht.test(a) ? "&" : "?") + "_=" + Pt++)), p.ifModified && (ce.lastModified[a] && C.setRequestHeader("If-Modified-Since", ce.lastModified[a]), ce.etag[a] && C.setRequestHeader("If-None-Match", ce.etag[a])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", p.contentType), C.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Vt + "; q=0.01" : "") : p.accepts["*"]);
                        for (o in p.headers) C.setRequestHeader(o, p.headers[o]);
                        if (p.beforeSend && (p.beforeSend.call(h, C, p) === !1 || 2 === w)) return C.abort();
                        x = "abort";
                        for (o in {
                                success: 1,
                                error: 1,
                                complete: 1
                            }) C[o](p[o]);
                        if (c = M(Wt, p, n, C)) {
                            C.readyState = 1, d && g.trigger("ajaxSend", [C, p]), p.async && p.timeout > 0 && (l = setTimeout(function() {
                                C.abort("timeout")
                            }, p.timeout));
                            try {
                                w = 1, c.send(b, i)
                            } catch (S) {
                                if (!(2 > w)) throw S;
                                i(-1, S)
                            }
                        } else i(-1, "No Transport");
                        return C
                    },
                    getScript: function(e, n) {
                        return ce.get(e, t, n, "script")
                    },
                    getJSON: function(e, t, n) {
                        return ce.get(e, t, n, "json")
                    }
                }), ce.ajaxSetup({
                    accepts: {
                        script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                    },
                    contents: {
                        script: /(?:java|ecma)script/
                    },
                    converters: {
                        "text script": function(e) {
                            return ce.globalEval(e), e
                        }
                    }
                }), ce.ajaxPrefilter("script", function(e) {
                    e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
                }), ce.ajaxTransport("script", function(e) {
                    if (e.crossDomain) {
                        var n, i = K.head || ce("head")[0] || K.documentElement;
                        return {
                            send: function(t, r) {
                                n = K.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
                                    (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || r(200, "success"))
                                }, i.insertBefore(n, i.firstChild)
                            },
                            abort: function() {
                                n && n.onload(t, !0)
                            }
                        }
                    }
                });
                var Xt = [],
                    Yt = /(=)\?(?=&|$)|\?\?/;
                ce.ajaxSetup({
                    jsonp: "callback",
                    jsonpCallback: function() {
                        var e = Xt.pop() || ce.expando + "_" + Pt++;
                        return this[e] = !0, e
                    }
                }), ce.ajaxPrefilter("json jsonp", function(n, i, r) {
                    var o, a, s, l = n.jsonp !== !1 && (Yt.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Yt.test(n.data) && "data");
                    return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = ce.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Yt, "$1" + o) : n.jsonp !== !1 && (n.url += (Ht.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
                        return s || ce.error(o + " was not called"), s[0]
                    }, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
                        s = arguments
                    }, r.always(function() {
                        e[o] = a, n[o] && (n.jsonpCallback = i.jsonpCallback, Xt.push(o)), s && ce.isFunction(a) && a(s[0]), s = a = t
                    }), "script") : void 0
                });
                var Kt, Qt, Jt = 0,
                    Zt = e.ActiveXObject && function() {
                        var e;
                        for (e in Kt) Kt[e](t, !0)
                    };
                ce.ajaxSettings.xhr = e.ActiveXObject ? function() {
                    return !this.isLocal && z() || O()
                } : z, Qt = ce.ajaxSettings.xhr(), ce.support.cors = !!Qt && "withCredentials" in Qt, Qt = ce.support.ajax = !!Qt, Qt && ce.ajaxTransport(function(n) {
                    if (!n.crossDomain || ce.support.cors) {
                        var i;
                        return {
                            send: function(r, o) {
                                var a, s, l = n.xhr();
                                if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields)
                                    for (s in n.xhrFields) l[s] = n.xhrFields[s];
                                n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                                try {
                                    for (s in r) l.setRequestHeader(s, r[s])
                                } catch (d) {}
                                l.send(n.hasContent && n.data || null), i = function(e, r) {
                                    var s, d, c, u;
                                    try {
                                        if (i && (r || 4 === l.readyState))
                                            if (i = t, a && (l.onreadystatechange = ce.noop, Zt && delete Kt[a]), r) 4 !== l.readyState && l.abort();
                                            else {
                                                u = {}, s = l.status, d = l.getAllResponseHeaders(), "string" == typeof l.responseText && (u.text = l.responseText);
                                                try {
                                                    c = l.statusText
                                                } catch (p) {
                                                    c = ""
                                                }
                                                s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404
                                            }
                                    } catch (h) {
                                        r || o(-1, h)
                                    }
                                    u && o(s, c, u, d)
                                }, n.async ? 4 === l.readyState ? setTimeout(i) : (a = ++Jt, Zt && (Kt || (Kt = {}, ce(e).unload(Zt)), Kt[a] = i), l.onreadystatechange = i) : i()
                            },
                            abort: function() {
                                i && i(t, !0)
                            }
                        }
                    }
                });
                var en, tn, nn = /^(?:toggle|show|hide)$/,
                    rn = new RegExp("^(?:([+-])=|)(" + ue + ")([a-z%]*)$", "i"),
                    on = /queueHooks$/,
                    an = [G],
                    sn = {
                        "*": [function(e, t) {
                            var n, i, r = this.createTween(e, t),
                                o = rn.exec(t),
                                a = r.cur(),
                                s = +a || 0,
                                l = 1,
                                d = 20;
                            if (o) {
                                if (n = +o[2], i = o[3] || (ce.cssNumber[e] ? "" : "px"), "px" !== i && s) {
                                    s = ce.css(r.elem, e, !0) || n || 1;
                                    do l = l || ".5", s /= l, ce.style(r.elem, e, s + i); while (l !== (l = r.cur() / a) && 1 !== l && --d)
                                }
                                r.unit = i, r.start = s, r.end = o[1] ? s + (o[1] + 1) * n : n
                            }
                            return r
                        }]
                    };
                ce.Animation = ce.extend(R, {
                    tweener: function(e, t) {
                        ce.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                        for (var n, i = 0, r = e.length; r > i; i++) n = e[i], sn[n] = sn[n] || [], sn[n].unshift(t)
                    },
                    prefilter: function(e, t) {
                        t ? an.unshift(e) : an.push(e)
                    }
                }), ce.Tween = j, j.prototype = {
                    constructor: j,
                    init: function(e, t, n, i, r, o) {
                        this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (ce.cssNumber[n] ? "" : "px")
                    },
                    cur: function() {
                        var e = j.propHooks[this.prop];
                        return e && e.get ? e.get(this) : j.propHooks._default.get(this)
                    },
                    run: function(e) {
                        var t, n = j.propHooks[this.prop];
                        return this.options.duration ? this.pos = t = ce.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : j.propHooks._default.set(this), this
                    }
                }, j.prototype.init.prototype = j.prototype, j.propHooks = {
                    _default: {
                        get: function(e) {
                            var t;
                            return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ce.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                        },
                        set: function(e) {
                            ce.fx.step[e.prop] ? ce.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ce.cssProps[e.prop]] || ce.cssHooks[e.prop]) ? ce.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                        }
                    }
                }, j.propHooks.scrollTop = j.propHooks.scrollLeft = {
                    set: function(e) {
                        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                    }
                }, ce.each(["toggle", "show", "hide"], function(e, t) {
                    var n = ce.fn[t];
                    ce.fn[t] = function(e, i, r) {
                        return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(W(t, !0), e, i, r)
                    }
                }), ce.fn.extend({
                    fadeTo: function(e, t, n, i) {
                        return this.filter(S).css("opacity", 0).show().end().animate({
                            opacity: t
                        }, e, n, i)
                    },
                    animate: function(e, t, n, i) {
                        var r = ce.isEmptyObject(e),
                            o = ce.speed(t, n, i),
                            a = function() {
                                var t = R(this, ce.extend({}, e), o);
                                a.finish = function() {
                                    t.stop(!0)
                                }, (r || ce._data(this, "finish")) && t.stop(!0)
                            };
                        return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
                    },
                    stop: function(e, n, i) {
                        var r = function(e) {
                            var t = e.stop;
                            delete e.stop, t(i)
                        };
                        return "string" != typeof e && (i = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                            var t = !0,
                                n = null != e && e + "queueHooks",
                                o = ce.timers,
                                a = ce._data(this);
                            if (n) a[n] && a[n].stop && r(a[n]);
                            else
                                for (n in a) a[n] && a[n].stop && on.test(n) && r(a[n]);
                            for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(i), t = !1, o.splice(n, 1));
                            (t || !i) && ce.dequeue(this, e)
                        })
                    },
                    finish: function(e) {
                        return e !== !1 && (e = e || "fx"), this.each(function() {
                            var t, n = ce._data(this),
                                i = n[e + "queue"],
                                r = n[e + "queueHooks"],
                                o = ce.timers,
                                a = i ? i.length : 0;
                            for (n.finish = !0, ce.queue(this, e, []), r && r.cur && r.cur.finish && r.cur.finish.call(this), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                            for (t = 0; a > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                            delete n.finish
                        })
                    }
                }), ce.each({
                    slideDown: W("show"),
                    slideUp: W("hide"),
                    slideToggle: W("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function(e, t) {
                    ce.fn[e] = function(e, n, i) {
                        return this.animate(t, e, n, i)
                    }
                }), ce.speed = function(e, t, n) {
                    var i = e && "object" == typeof e ? ce.extend({}, e) : {
                        complete: n || !n && t || ce.isFunction(e) && e,
                        duration: e,
                        easing: n && t || t && !ce.isFunction(t) && t
                    };
                    return i.duration = ce.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ce.fx.speeds ? ce.fx.speeds[i.duration] : ce.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                        ce.isFunction(i.old) && i.old.call(this), i.queue && ce.dequeue(this, i.queue)
                    }, i
                }, ce.easing = {
                    linear: function(e) {
                        return e
                    },
                    swing: function(e) {
                        return .5 - Math.cos(e * Math.PI) / 2
                    }
                }, ce.timers = [], ce.fx = j.prototype.init, ce.fx.tick = function() {
                    var e, n = ce.timers,
                        i = 0;
                    for (en = ce.now(); i < n.length; i++) e = n[i], e() || n[i] !== e || n.splice(i--, 1);
                    n.length || ce.fx.stop(), en = t
                }, ce.fx.timer = function(e) {
                    e() && ce.timers.push(e) && ce.fx.start()
                }, ce.fx.interval = 13, ce.fx.start = function() {
                    tn || (tn = setInterval(ce.fx.tick, ce.fx.interval))
                }, ce.fx.stop = function() {
                    clearInterval(tn), tn = null
                }, ce.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, ce.fx.step = {}, ce.expr && ce.expr.filters && (ce.expr.filters.animated = function(e) {
                    return ce.grep(ce.timers, function(t) {
                        return e === t.elem
                    }).length
                }), ce.fn.offset = function(e) {
                    if (arguments.length) return e === t ? this : this.each(function(t) {
                        ce.offset.setOffset(this, e, t)
                    });
                    var n, i, r = {
                            top: 0,
                            left: 0
                        },
                        o = this[0],
                        a = o && o.ownerDocument;
                    if (a) return n = a.documentElement, ce.contains(n, o) ? (typeof o.getBoundingClientRect !== Y && (r = o.getBoundingClientRect()), i = V(a), {
                        top: r.top + (i.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                        left: r.left + (i.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
                    }) : r
                }, ce.offset = {
                    setOffset: function(e, t, n) {
                        var i = ce.css(e, "position");
                        "static" === i && (e.style.position = "relative");
                        var r, o, a = ce(e),
                            s = a.offset(),
                            l = ce.css(e, "top"),
                            d = ce.css(e, "left"),
                            c = ("absolute" === i || "fixed" === i) && ce.inArray("auto", [l, d]) > -1,
                            u = {},
                            p = {};
                        c ? (p = a.position(), r = p.top, o = p.left) : (r = parseFloat(l) || 0, o = parseFloat(d) || 0), ce.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (u.top = t.top - s.top + r), null != t.left && (u.left = t.left - s.left + o), "using" in t ? t.using.call(e, u) : a.css(u)
                    }
                }, ce.fn.extend({
                    position: function() {
                        if (this[0]) {
                            var e, t, n = {
                                    top: 0,
                                    left: 0
                                },
                                i = this[0];
                            return "fixed" === ce.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ce.nodeName(e[0], "html") || (n = e.offset()), n.top += ce.css(e[0], "borderTopWidth", !0), n.left += ce.css(e[0], "borderLeftWidth", !0)), {
                                top: t.top - n.top - ce.css(i, "marginTop", !0),
                                left: t.left - n.left - ce.css(i, "marginLeft", !0)
                            }
                        }
                    },
                    offsetParent: function() {
                        return this.map(function() {
                            for (var e = this.offsetParent || K.documentElement; e && !ce.nodeName(e, "html") && "static" === ce.css(e, "position");) e = e.offsetParent;
                            return e || K.documentElement
                        })
                    }
                }), ce.each({
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                }, function(e, n) {
                    var i = /Y/.test(n);
                    ce.fn[e] = function(r) {
                        return ce.access(this, function(e, r, o) {
                            var a = V(e);
                            return o === t ? a ? n in a ? a[n] : a.document.documentElement[r] : e[r] : void(a ? a.scrollTo(i ? ce(a).scrollLeft() : o, i ? o : ce(a).scrollTop()) : e[r] = o)
                        }, e, r, arguments.length, null)
                    }
                }), ce.each({
                    Height: "height",
                    Width: "width"
                }, function(e, n) {
                    ce.each({
                        padding: "inner" + e,
                        content: n,
                        "": "outer" + e
                    }, function(i, r) {
                        ce.fn[r] = function(r, o) {
                            var a = arguments.length && (i || "boolean" != typeof r),
                                s = i || (r === !0 || o === !0 ? "margin" : "border");
                            return ce.access(this, function(n, i, r) {
                                var o;
                                return ce.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : r === t ? ce.css(n, i, s) : ce.style(n, i, r, s)
                            }, n, a ? r : t, a, null)
                        }
                    })
                }), e.jQuery = e.$ = ce, r = function() {
                    return ce
                }()
            }(window),
            function() {
                function e(e, t, n) {
                    for (var i = (n || 0) - 1, r = e ? e.length : 0; ++i < r;)
                        if (e[i] === t) return i;
                    return -1
                }

                function t(t, n) {
                    var i = typeof n;
                    if (t = t.cache, "boolean" == i || null == n) return t[n] ? 0 : -1;
                    "number" != i && "string" != i && (i = "object");
                    var r = "number" == i ? n : w + n;
                    return t = (t = t[i]) && t[r], "object" == i ? t && e(t, n) > -1 ? 0 : -1 : t ? 0 : -1
                }

                function n(e) {
                    var t = this.cache,
                        n = typeof e;
                    if ("boolean" == n || null == e) t[e] = !0;
                    else {
                        "number" != n && "string" != n && (n = "object");
                        var i = "number" == n ? e : w + e,
                            r = t[n] || (t[n] = {});
                        "object" == n ? (r[i] || (r[i] = [])).push(e) : r[i] = !0
                    }
                }

                function i(e) {
                    return e.charCodeAt(0)
                }

                function r(e, t) {
                    for (var n = e.criteria, i = t.criteria, r = -1, o = n.length; ++r < o;) {
                        var a = n[r],
                            s = i[r];
                        if (a !== s) {
                            if (a > s || "undefined" == typeof a) return 1;
                            if (s > a || "undefined" == typeof s) return -1
                        }
                    }
                    return e.index - t.index
                }

                function a(e) {
                    var t = -1,
                        i = e.length,
                        r = e[0],
                        o = e[i / 2 | 0],
                        a = e[i - 1];
                    if (r && "object" == typeof r && o && "object" == typeof o && a && "object" == typeof a) return !1;
                    var s = d();
                    s["false"] = s["null"] = s["true"] = s.undefined = !1;
                    var l = d();
                    for (l.array = e, l.cache = s, l.push = n; ++t < i;) l.push(e[t]);
                    return l
                }

                function s(e) {
                    return "\\" + ee[e]
                }

                function l() {
                    return m.pop() || []
                }

                function d() {
                    return v.pop() || {
                        array: null,
                        cache: null,
                        criteria: null,
                        "false": !1,
                        index: 0,
                        "null": !1,
                        number: null,
                        object: null,
                        push: null,
                        string: null,
                        "true": !1,
                        undefined: !1,
                        value: null
                    }
                }

                function c(e) {
                    return "function" != typeof e.toString && "string" == typeof(e + "")
                }

                function u(e) {
                    e.length = 0, m.length < C && m.push(e)
                }

                function p(e) {
                    var t = e.cache;
                    t && p(t), e.array = e.cache = e.criteria = e.object = e.number = e.string = e.value = null, v.length < C && v.push(e)
                }

                function h(e, t, n) {
                    t || (t = 0), "undefined" == typeof n && (n = e ? e.length : 0);
                    for (var i = -1, r = n - t || 0, o = Array(0 > r ? 0 : r); ++i < r;) o[i] = e[t + i];
                    return o
                }

                function g(n) {
                    function o(e) {
                        return e && "object" == typeof e && !ui(e) && jn.call(e, "__wrapped__") ? e : new m(e)
                    }

                    function m(e, t) {
                        this.__chain__ = !!t, this.__wrapped__ = e
                    }

                    function v(e) {
                        function t() {
                            if (i) {
                                var e = h(i);
                                Wn.apply(e, arguments)
                            }
                            if (this instanceof t) {
                                var o = ee(n.prototype),
                                    a = n.apply(o, e || arguments);
                                return ze(a) ? a : o
                            }
                            return n.apply(r, e || arguments)
                        }
                        var n = e[0],
                            i = e[2],
                            r = e[4];
                        return ci(t, e), t
                    }

                    function C(e, t, n, i, r) {
                        if (n) {
                            var o = n(e);
                            if ("undefined" != typeof o) return o
                        }
                        var a = ze(e);
                        if (!a) return e;
                        var s = zn.call(e);
                        if (!Y[s] || !li.nodeClass && c(e)) return e;
                        var d = ai[s];
                        switch (s) {
                            case R:
                            case F:
                                return new d(+e);
                            case W:
                            case X:
                                return new d(e);
                            case q:
                                return o = d(e.source, I.exec(e)), o.lastIndex = e.lastIndex, o
                        }
                        var p = ui(e);
                        if (t) {
                            var g = !i;
                            i || (i = l()), r || (r = l());
                            for (var f = i.length; f--;)
                                if (i[f] == e) return r[f];
                            o = p ? d(e.length) : {}
                        } else o = p ? h(e) : Ci({}, e);
                        return p && (jn.call(e, "index") && (o.index = e.index), jn.call(e, "input") && (o.input = e.input)), t ? (i.push(e), r.push(o), (p ? xi : Ei)(e, function(e, a) {
                            o[a] = C(e, t, n, i, r)
                        }), g && (u(i), u(r)), o) : o
                    }

                    function ee(e, t) {
                        return ze(e) ? Qn(e) : {}
                    }

                    function ne(e, t, n) {
                        if ("function" != typeof e) return on;
                        if ("undefined" == typeof t || !("prototype" in e)) return e;
                        var i = e.__bindData__;
                        if ("undefined" == typeof i && (li.funcNames && (i = !e.name), i = i || !li.funcDecomp, !i)) {
                            var r = Fn.call(e);
                            li.funcNames || (i = !D.test(r)), i || (i = P.test(r), ci(e, i))
                        }
                        if (i === !1 || i !== !0 && 1 & i[1]) return e;
                        switch (n) {
                            case 1:
                                return function(n) {
                                    return e.call(t, n)
                                };
                            case 2:
                                return function(n, i) {
                                    return e.call(t, n, i)
                                };
                            case 3:
                                return function(n, i, r) {
                                    return e.call(t, n, i, r)
                                };
                            case 4:
                                return function(n, i, r, o) {
                                    return e.call(t, n, i, r, o)
                                }
                        }
                        return Rt(e, t)
                    }

                    function ie(e) {
                        function t() {
                            var e = l ? a : this;
                            if (r) {
                                var g = h(r);
                                Wn.apply(g, arguments)
                            }
                            if ((o || c) && (g || (g = h(arguments)), o && Wn.apply(g, o), c && g.length < s)) return i |= 16, ie([n, u ? i : -4 & i, g, null, a, s]);
                            if (g || (g = arguments), d && (n = e[p]), this instanceof t) {
                                e = ee(n.prototype);
                                var f = n.apply(e, g);
                                return ze(f) ? f : e
                            }
                            return n.apply(e, g)
                        }
                        var n = e[0],
                            i = e[1],
                            r = e[2],
                            o = e[3],
                            a = e[4],
                            s = e[5],
                            l = 1 & i,
                            d = 2 & i,
                            c = 4 & i,
                            u = 8 & i,
                            p = n;
                        return ci(t, e), t
                    }

                    function re(n, i) {
                        var r = -1,
                            o = fe(),
                            s = n ? n.length : 0,
                            l = s >= x && o === e,
                            d = [];
                        if (l) {
                            var c = a(i);
                            c ? (o = t, i = c) : l = !1
                        }
                        for (; ++r < s;) {
                            var u = n[r];
                            o(i, u) < 0 && d.push(u)
                        }
                        return l && p(i), d
                    }

                    function ae(e, t, n, i) {
                        for (var r = (i || 0) - 1, o = e ? e.length : 0, a = []; ++r < o;) {
                            var s = e[r];
                            if (s && "object" == typeof s && "number" == typeof s.length && (ui(s) || ye(s))) {
                                t || (s = ae(s, t, n));
                                var l = -1,
                                    d = s.length,
                                    c = a.length;
                                for (a.length += d; ++l < d;) a[c++] = s[l]
                            } else n || a.push(s)
                        }
                        return a
                    }

                    function se(e, t, n, i, r, o) {
                        if (n) {
                            var a = n(e, t);
                            if ("undefined" != typeof a) return !!a
                        }
                        if (e === t) return 0 !== e || 1 / e == 1 / t;
                        var s = typeof e,
                            d = typeof t;
                        if (!(e !== e || e && Z[s] || t && Z[d])) return !1;
                        if (null == e || null == t) return e === t;
                        var p = zn.call(e),
                            h = zn.call(t);
                        if (p == U && (p = V), h == U && (h = V), p != h) return !1;
                        switch (p) {
                            case R:
                            case F:
                                return +e == +t;
                            case W:
                                return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
                            case q:
                            case X:
                                return e == Dn(t)
                        }
                        var g = p == $;
                        if (!g) {
                            var f = jn.call(e, "__wrapped__"),
                                m = jn.call(t, "__wrapped__");
                            if (f || m) return se(f ? e.__wrapped__ : e, m ? t.__wrapped__ : t, n, i, r, o);
                            if (p != V || !li.nodeClass && (c(e) || c(t))) return !1;
                            var v = !li.argsObject && ye(e) ? Ln : e.constructor,
                                b = !li.argsObject && ye(t) ? Ln : t.constructor;
                            if (v != b && !(Ne(v) && v instanceof v && Ne(b) && b instanceof b) && "constructor" in e && "constructor" in t) return !1
                        }
                        var y = !r;
                        r || (r = l()), o || (o = l());
                        for (var w = r.length; w--;)
                            if (r[w] == e) return o[w] == t;
                        var x = 0;
                        if (a = !0, r.push(e), o.push(t), g) {
                            if (w = e.length, x = t.length, a = x == w, a || i)
                                for (; x--;) {
                                    var C = w,
                                        S = t[x];
                                    if (i)
                                        for (; C-- && !(a = se(e[C], S, n, i, r, o)););
                                    else if (!(a = se(e[x], S, n, i, r, o))) break
                                }
                        } else ki(t, function(t, s, l) {
                            return jn.call(l, s) ? (x++, a = jn.call(e, s) && se(e[s], t, n, i, r, o)) : void 0
                        }), a && !i && ki(e, function(e, t, n) {
                            return jn.call(n, t) ? a = --x > -1 : void 0
                        });
                        return r.pop(), o.pop(), y && (u(r), u(o)), a
                    }

                    function le(e, t, n, i, r) {
                        (ui(t) ? it : Ei)(t, function(t, o) {
                            var a, s, l = t,
                                d = e[o];
                            if (t && ((s = ui(t)) || Ti(t))) {
                                for (var c = i.length; c--;)
                                    if (a = i[c] == t) {
                                        d = r[c];
                                        break
                                    }
                                if (!a) {
                                    var u;
                                    n && (l = n(d, t), (u = "undefined" != typeof l) && (d = l)), u || (d = s ? ui(d) ? d : [] : Ti(d) ? d : {}), i.push(t), r.push(d), u || le(d, t, n, i, r)
                                }
                            } else n && (l = n(d, t), "undefined" == typeof l && (l = t)), "undefined" != typeof l && (d = l);
                            e[o] = d
                        })
                    }

                    function de(e, t) {
                        return e + Rn(oi() * (t - e + 1))
                    }

                    function ce(n, i, r) {
                        var o = -1,
                            s = fe(),
                            d = n ? n.length : 0,
                            c = [],
                            h = !i && d >= x && s === e,
                            g = r || h ? l() : c;
                        if (h) {
                            var f = a(g);
                            s = t, g = f
                        }
                        for (; ++o < d;) {
                            var m = n[o],
                                v = r ? r(m, o, n) : m;
                            (i ? !o || g[g.length - 1] !== v : s(g, v) < 0) && ((r || h) && g.push(v), c.push(m))
                        }
                        return h ? (u(g.array), p(g)) : r && u(g), c
                    }

                    function ue(e) {
                        return function(t, n, i) {
                            var r = {};
                            if (n = o.createCallback(n, i, 3), ui(t))
                                for (var a = -1, s = t.length; ++a < s;) {
                                    var l = t[a];
                                    e(r, l, n(l, a, t), t)
                                } else xi(t, function(t, i, o) {
                                    e(r, t, n(t, i, o), o)
                                });
                            return r
                        }
                    }

                    function pe(e, t, n, i, r, o) {
                        var a = 1 & t,
                            s = 2 & t,
                            l = 4 & t,
                            d = 16 & t,
                            c = 32 & t;
                        if (!s && !Ne(e)) throw new An;
                        d && !n.length && (t &= -17, d = n = !1), c && !i.length && (t &= -33, c = i = !1);
                        var u = e && e.__bindData__;
                        if (u && u !== !0) return u = h(u), u[2] && (u[2] = h(u[2])), u[3] && (u[3] = h(u[3])), !a || 1 & u[1] || (u[4] = r), !a && 1 & u[1] && (t |= 8), !l || 4 & u[1] || (u[5] = o), d && Wn.apply(u[2] || (u[2] = []), n), c && Yn.apply(u[3] || (u[3] = []), i), u[1] |= t, pe.apply(null, u);
                        var p = 1 == t || 17 === t ? v : ie;
                        return p([e, t, n, i, r, o])
                    }

                    function he() {
                        J.shadowedProps = z, J.array = J.bottom = J.loop = J.top = "", J.init = "iterable", J.useHas = !0;
                        for (var e, t = 0; e = arguments[t]; t++)
                            for (var n in e) J[n] = e[n];
                        var i = J.args;
                        J.firstArg = /^[^,]+/.exec(i)[0];
                        var r = En("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString", "return function(" + i + ") {\n" + di(J) + "\n}");
                        return r(ne, G, Bn, jn, y, ye, ui, Fe, J.keys, Pn, Z, si, X, Hn, zn)
                    }

                    function ge(e) {
                        return vi[e]
                    }

                    function fe() {
                        var t = (t = o.indexOf) === kt ? e : t;
                        return t
                    }

                    function me(e) {
                        return "function" == typeof e && On.test(e)
                    }

                    function ve(e) {
                        var t, n;
                        return !e || zn.call(e) != V || (t = e.constructor, Ne(t) && !(t instanceof t)) || !li.argsClass && ye(e) || !li.nodeClass && c(e) ? !1 : li.ownLast ? (ki(e, function(e, t, i) {
                            return n = jn.call(i, t), !1
                        }), n !== !1) : (ki(e, function(e, t) {
                            n = t
                        }), "undefined" == typeof n || jn.call(e, n))
                    }

                    function be(e) {
                        return bi[e]
                    }

                    function ye(e) {
                        return e && "object" == typeof e && "number" == typeof e.length && zn.call(e) == U || !1
                    }

                    function we(e, t, n, i) {
                        return "boolean" != typeof t && null != t && (i = n, n = t, t = !1), C(e, t, "function" == typeof n && ne(n, i, 1))
                    }

                    function xe(e, t, n) {
                        return C(e, !0, "function" == typeof t && ne(t, n, 1))
                    }

                    function Ce(e, t) {
                        var n = ee(e);
                        return t ? Ci(n, t) : n
                    }

                    function Se(e, t, n) {
                        var i;
                        return t = o.createCallback(t, n, 3), Ei(e, function(e, n, r) {
                            return t(e, n, r) ? (i = n, !1) : void 0
                        }), i
                    }

                    function ke(e, t, n) {
                        var i;
                        return t = o.createCallback(t, n, 3), Te(e, function(e, n, r) {
                            return t(e, n, r) ? (i = n, !1) : void 0
                        }), i
                    }

                    function Ee(e, t, n) {
                        var i = [];
                        ki(e, function(e, t) {
                            i.push(t, e)
                        });
                        var r = i.length;
                        for (t = ne(t, n, 3); r-- && t(i[r--], i[r], e) !== !1;);
                        return e
                    }

                    function Te(e, t, n) {
                        var i = hi(e),
                            r = i.length;
                        for (t = ne(t, n, 3); r--;) {
                            var o = i[r];
                            if (t(e[o], o, e) === !1) break
                        }
                        return e
                    }

                    function _e(e) {
                        var t = [];
                        return ki(e, function(e, n) {
                            Ne(e) && t.push(n)
                        }), t.sort()
                    }

                    function Le(e, t) {
                        return e ? jn.call(e, t) : !1
                    }

                    function Ie(e) {
                        for (var t = -1, n = hi(e), i = n.length, r = {}; ++t < i;) {
                            var o = n[t];
                            r[e[o]] = o
                        }
                        return r
                    }

                    function De(e) {
                        return e === !0 || e === !1 || e && "object" == typeof e && zn.call(e) == R || !1
                    }

                    function Ae(e) {
                        return e && "object" == typeof e && zn.call(e) == F || !1
                    }

                    function Me(e) {
                        return e && 1 === e.nodeType || !1
                    }

                    function Be(e) {
                        var t = !0;
                        if (!e) return t;
                        var n = zn.call(e),
                            i = e.length;
                        return n == $ || n == X || (li.argsClass ? n == U : ye(e)) || n == V && "number" == typeof i && Ne(e.splice) ? !i : (Ei(e, function() {
                            return t = !1
                        }), t)
                    }

                    function Pe(e, t, n, i) {
                        return se(e, t, "function" == typeof n && ne(n, i, 2))
                    }

                    function He(e) {
                        return Zn(e) && !ei(parseFloat(e))
                    }

                    function Ne(e) {
                        return "function" == typeof e
                    }

                    function ze(e) {
                        return !(!e || !Z[typeof e])
                    }

                    function Oe(e) {
                        return $e(e) && e != +e
                    }

                    function Ue(e) {
                        return null === e
                    }

                    function $e(e) {
                        return "number" == typeof e || e && "object" == typeof e && zn.call(e) == W || !1
                    }

                    function Re(e) {
                        return e && Z[typeof e] && zn.call(e) == q || !1
                    }

                    function Fe(e) {
                        return "string" == typeof e || e && "object" == typeof e && zn.call(e) == X || !1
                    }

                    function Ge(e) {
                        return "undefined" == typeof e
                    }

                    function je(e, t, n) {
                        var i = {};
                        return t = o.createCallback(t, n, 3), Ei(e, function(e, n, r) {
                            i[n] = t(e, n, r)
                        }), i
                    }

                    function We(e) {
                        var t = arguments,
                            n = 2;
                        if (!ze(e)) return e;
                        if ("number" != typeof t[2] && (n = t.length), n > 3 && "function" == typeof t[n - 2]) var i = ne(t[--n - 1], t[n--], 2);
                        else n > 2 && "function" == typeof t[n - 1] && (i = t[--n]);
                        for (var r = h(arguments, 1, n), o = -1, a = l(), s = l(); ++o < n;) le(e, r[o], i, a, s);
                        return u(a), u(s), e
                    }

                    function Ve(e, t, n) {
                        var i = {};
                        if ("function" != typeof t) {
                            var r = [];
                            ki(e, function(e, t) {
                                r.push(t)
                            }), r = re(r, ae(arguments, !0, !1, 1));
                            for (var a = -1, s = r.length; ++a < s;) {
                                var l = r[a];
                                i[l] = e[l]
                            }
                        } else t = o.createCallback(t, n, 3), ki(e, function(e, n, r) {
                            t(e, n, r) || (i[n] = e)
                        });
                        return i
                    }

                    function qe(e) {
                        for (var t = -1, n = hi(e), i = n.length, r = xn(i); ++t < i;) {
                            var o = n[t];
                            r[t] = [o, e[o]]
                        }
                        return r
                    }

                    function Xe(e, t, n) {
                        var i = {};
                        if ("function" != typeof t)
                            for (var r = -1, a = ae(arguments, !0, !1, 1), s = ze(e) ? a.length : 0; ++r < s;) {
                                var l = a[r];
                                l in e && (i[l] = e[l])
                            } else t = o.createCallback(t, n, 3), ki(e, function(e, n, r) {
                                t(e, n, r) && (i[n] = e)
                            });
                        return i
                    }

                    function Ye(e, t, n, i) {
                        var r = ui(e);
                        if (null == n)
                            if (r) n = [];
                            else {
                                var a = e && e.constructor,
                                    s = a && a.prototype;
                                n = ee(s)
                            }
                        return t && (t = o.createCallback(t, i, 4), (r ? xi : Ei)(e, function(e, i, r) {
                            return t(n, e, i, r)
                        })), n
                    }

                    function Ke(e) {
                        for (var t = -1, n = hi(e), i = n.length, r = xn(i); ++t < i;) r[t] = e[n[t]];
                        return r
                    }

                    function Qe(e) {
                        var t = arguments,
                            n = -1,
                            i = ae(t, !0, !1, 1),
                            r = t[2] && t[2][t[1]] === e ? 1 : i.length,
                            o = xn(r);
                        for (li.unindexedChars && Fe(e) && (e = e.split("")); ++n < r;) o[n] = e[i[n]];
                        return o
                    }

                    function Je(e, t, n) {
                        var i = -1,
                            r = fe(),
                            o = e ? e.length : 0,
                            a = !1;
                        return n = (0 > n ? ni(0, o + n) : n) || 0, ui(e) ? a = r(e, t, n) > -1 : "number" == typeof o ? a = (Fe(e) ? e.indexOf(t, n) : r(e, t, n)) > -1 : xi(e, function(e) {
                            return ++i >= n ? !(a = e === t) : void 0
                        }), a
                    }

                    function Ze(e, t, n) {
                        var i = !0;
                        if (t = o.createCallback(t, n, 3), ui(e))
                            for (var r = -1, a = e.length; ++r < a && (i = !!t(e[r], r, e)););
                        else xi(e, function(e, n, r) {
                            return i = !!t(e, n, r)
                        });
                        return i
                    }

                    function et(e, t, n) {
                        var i = [];
                        if (t = o.createCallback(t, n, 3), ui(e))
                            for (var r = -1, a = e.length; ++r < a;) {
                                var s = e[r];
                                t(s, r, e) && i.push(s)
                            } else xi(e, function(e, n, r) {
                                t(e, n, r) && i.push(e)
                            });
                        return i
                    }

                    function tt(e, t, n) {
                        if (t = o.createCallback(t, n, 3), !ui(e)) {
                            var i;
                            return xi(e, function(e, n, r) {
                                return t(e, n, r) ? (i = e, !1) : void 0
                            }), i
                        }
                        for (var r = -1, a = e.length; ++r < a;) {
                            var s = e[r];
                            if (t(s, r, e)) return s
                        }
                    }

                    function nt(e, t, n) {
                        var i;
                        return t = o.createCallback(t, n, 3), rt(e, function(e, n, r) {
                            return t(e, n, r) ? (i = e, !1) : void 0
                        }), i
                    }

                    function it(e, t, n) {
                        if (t && "undefined" == typeof n && ui(e))
                            for (var i = -1, r = e.length; ++i < r && t(e[i], i, e) !== !1;);
                        else xi(e, t, n);
                        return e
                    }

                    function rt(e, t, n) {
                        var i = e,
                            r = e ? e.length : 0;
                        if (t = t && "undefined" == typeof n ? t : ne(t, n, 3), ui(e))
                            for (; r-- && t(e[r], r, e) !== !1;);
                        else {
                            if ("number" != typeof r) {
                                var o = hi(e);
                                r = o.length
                            } else li.unindexedChars && Fe(e) && (i = e.split(""));
                            xi(e, function(e, n, a) {
                                return n = o ? o[--r] : --r, t(i[n], n, a)
                            })
                        }
                        return e
                    }

                    function ot(e, t) {
                        var n = h(arguments, 2),
                            i = -1,
                            r = "function" == typeof t,
                            o = e ? e.length : 0,
                            a = xn("number" == typeof o ? o : 0);
                        return it(e, function(e) {
                            a[++i] = (r ? t : e[t]).apply(e, n)
                        }), a
                    }

                    function at(e, t, n) {
                        var i = -1,
                            r = e ? e.length : 0,
                            a = xn("number" == typeof r ? r : 0);
                        if (t = o.createCallback(t, n, 3), ui(e))
                            for (; ++i < r;) a[i] = t(e[i], i, e);
                        else xi(e, function(e, n, r) {
                            a[++i] = t(e, n, r)
                        });
                        return a
                    }

                    function st(e, t, n) {
                        var r = -(1 / 0),
                            a = r;
                        if ("function" != typeof t && n && n[t] === e && (t = null), null == t && ui(e))
                            for (var s = -1, l = e.length; ++s < l;) {
                                var d = e[s];
                                d > a && (a = d)
                            } else t = null == t && Fe(e) ? i : o.createCallback(t, n, 3), xi(e, function(e, n, i) {
                                var o = t(e, n, i);
                                o > r && (r = o, a = e)
                            });
                        return a
                    }

                    function lt(e, t, n) {
                        var r = 1 / 0,
                            a = r;
                        if ("function" != typeof t && n && n[t] === e && (t = null), null == t && ui(e))
                            for (var s = -1, l = e.length; ++s < l;) {
                                var d = e[s];
                                a > d && (a = d)
                            } else t = null == t && Fe(e) ? i : o.createCallback(t, n, 3), xi(e, function(e, n, i) {
                                var o = t(e, n, i);
                                r > o && (r = o, a = e)
                            });
                        return a
                    }

                    function dt(e, t, n, i) {
                        var r = arguments.length < 3;
                        if (t = o.createCallback(t, i, 4), ui(e)) {
                            var a = -1,
                                s = e.length;
                            for (r && (n = e[++a]); ++a < s;) n = t(n, e[a], a, e)
                        } else xi(e, function(e, i, o) {
                            n = r ? (r = !1, e) : t(n, e, i, o)
                        });
                        return n
                    }

                    function ct(e, t, n, i) {
                        var r = arguments.length < 3;
                        return t = o.createCallback(t, i, 4), rt(e, function(e, i, o) {
                            n = r ? (r = !1, e) : t(n, e, i, o)
                        }), n
                    }

                    function ut(e, t, n) {
                        return t = o.createCallback(t, n, 3), et(e, function(e, n, i) {
                            return !t(e, n, i)
                        })
                    }

                    function pt(e, t, n) {
                        if (e && "number" != typeof e.length ? e = Ke(e) : li.unindexedChars && Fe(e) && (e = e.split("")), null == t || n) return e ? e[de(0, e.length - 1)] : f;
                        var i = ht(e);
                        return i.length = ii(ni(0, t), i.length), i
                    }

                    function ht(e) {
                        var t = -1,
                            n = e ? e.length : 0,
                            i = xn("number" == typeof n ? n : 0);
                        return it(e, function(e) {
                            var n = de(0, ++t);
                            i[t] = i[n], i[n] = e
                        }), i
                    }

                    function gt(e) {
                        var t = e ? e.length : 0;
                        return "number" == typeof t ? t : hi(e).length
                    }

                    function ft(e, t, n) {
                        var i;
                        if (t = o.createCallback(t, n, 3), ui(e))
                            for (var r = -1, a = e.length; ++r < a && !(i = t(e[r], r, e)););
                        else xi(e, function(e, n, r) {
                            return !(i = t(e, n, r))
                        });
                        return !!i
                    }

                    function mt(e, t, n) {
                        var i = -1,
                            a = ui(t),
                            s = e ? e.length : 0,
                            c = xn("number" == typeof s ? s : 0);
                        for (a || (t = o.createCallback(t, n, 3)), it(e, function(e, n, r) {
                                var o = c[++i] = d();
                                a ? o.criteria = at(t, function(t) {
                                    return e[t]
                                }) : (o.criteria = l())[0] = t(e, n, r), o.index = i, o.value = e
                            }), s = c.length, c.sort(r); s--;) {
                            var h = c[s];
                            c[s] = h.value, a || u(h.criteria), p(h)
                        }
                        return c
                    }

                    function vt(e) {
                        return e && "number" == typeof e.length ? li.unindexedChars && Fe(e) ? e.split("") : h(e) : Ke(e)
                    }

                    function bt(e) {
                        for (var t = -1, n = e ? e.length : 0, i = []; ++t < n;) {
                            var r = e[t];
                            r && i.push(r)
                        }
                        return i
                    }

                    function yt(e) {
                        return re(e, ae(arguments, !0, !0, 1))
                    }

                    function wt(e, t, n) {
                        var i = -1,
                            r = e ? e.length : 0;
                        for (t = o.createCallback(t, n, 3); ++i < r;)
                            if (t(e[i], i, e)) return i;
                        return -1
                    }

                    function xt(e, t, n) {
                        var i = e ? e.length : 0;
                        for (t = o.createCallback(t, n, 3); i--;)
                            if (t(e[i], i, e)) return i;
                        return -1
                    }

                    function Ct(e, t, n) {
                        var i = 0,
                            r = e ? e.length : 0;
                        if ("number" != typeof t && null != t) {
                            var a = -1;
                            for (t = o.createCallback(t, n, 3); ++a < r && t(e[a], a, e);) i++
                        } else if (i = t, null == i || n) return e ? e[0] : f;
                        return h(e, 0, ii(ni(0, i), r))
                    }

                    function St(e, t, n, i) {
                        return "boolean" != typeof t && null != t && (i = n, n = "function" != typeof t && i && i[t] === e ? null : t, t = !1), null != n && (e = at(e, n, i)), ae(e, t)
                    }

                    function kt(t, n, i) {
                        if ("number" == typeof i) {
                            var r = t ? t.length : 0;
                            i = 0 > i ? ni(0, r + i) : i || 0
                        } else if (i) {
                            var o = Bt(t, n);
                            return t[o] === n ? o : -1
                        }
                        return e(t, n, i)
                    }

                    function Et(e, t, n) {
                        var i = 0,
                            r = e ? e.length : 0;
                        if ("number" != typeof t && null != t) {
                            var a = r;
                            for (t = o.createCallback(t, n, 3); a-- && t(e[a], a, e);) i++
                        } else i = null == t || n ? 1 : t || i;
                        return h(e, 0, ii(ni(0, r - i), r))
                    }

                    function Tt() {
                        for (var n = [], i = -1, r = arguments.length, o = l(), s = fe(), d = s === e, c = l(); ++i < r;) {
                            var h = arguments[i];
                            (ui(h) || ye(h)) && (n.push(h), o.push(d && h.length >= x && a(i ? n[i] : c)))
                        }
                        var g = n[0],
                            f = -1,
                            m = g ? g.length : 0,
                            v = [];
                        e: for (; ++f < m;) {
                            var b = o[0];
                            if (h = g[f], (b ? t(b, h) : s(c, h)) < 0) {
                                for (i = r, (b || c).push(h); --i;)
                                    if (b = o[i], (b ? t(b, h) : s(n[i], h)) < 0) continue e;
                                v.push(h)
                            }
                        }
                        for (; r--;) b = o[r], b && p(b);
                        return u(o), u(c), v
                    }

                    function _t(e, t, n) {
                        var i = 0,
                            r = e ? e.length : 0;
                        if ("number" != typeof t && null != t) {
                            var a = r;
                            for (t = o.createCallback(t, n, 3); a-- && t(e[a], a, e);) i++
                        } else if (i = t, null == i || n) return e ? e[r - 1] : f;
                        return h(e, ni(0, r - i))
                    }

                    function Lt(e, t, n) {
                        var i = e ? e.length : 0;
                        for ("number" == typeof n && (i = (0 > n ? ni(0, i + n) : ii(n, i - 1)) + 1); i--;)
                            if (e[i] === t) return i;
                        return -1
                    }

                    function It(e) {
                        for (var t = arguments, n = 0, i = t.length, r = e ? e.length : 0; ++n < i;)
                            for (var o = -1, a = t[n]; ++o < r;) e[o] === a && (Xn.call(e, o--, 1), r--);
                        return e
                    }

                    function Dt(e, t, n) {
                        e = +e || 0, n = "number" == typeof n ? n : +n || 1, null == t && (t = e, e = 0);
                        for (var i = -1, r = ni(0, Un((t - e) / (n || 1))), o = xn(r); ++i < r;) o[i] = e, e += n;
                        return o
                    }

                    function At(e, t, n) {
                        var i = -1,
                            r = e ? e.length : 0,
                            a = [];
                        for (t = o.createCallback(t, n, 3); ++i < r;) {
                            var s = e[i];
                            t(s, i, e) && (a.push(s), Xn.call(e, i--, 1), r--)
                        }
                        return a
                    }

                    function Mt(e, t, n) {
                        if ("number" != typeof t && null != t) {
                            var i = 0,
                                r = -1,
                                a = e ? e.length : 0;
                            for (t = o.createCallback(t, n, 3); ++r < a && t(e[r], r, e);) i++
                        } else i = null == t || n ? 1 : ni(0, t);
                        return h(e, i)
                    }

                    function Bt(e, t, n, i) {
                        var r = 0,
                            a = e ? e.length : r;
                        for (n = n ? o.createCallback(n, i, 1) : on, t = n(t); a > r;) {
                            var s = r + a >>> 1;
                            n(e[s]) < t ? r = s + 1 : a = s
                        }
                        return r
                    }

                    function Pt() {
                        return ce(ae(arguments, !0, !0))
                    }

                    function Ht(e, t, n, i) {
                        return "boolean" != typeof t && null != t && (i = n, n = "function" != typeof t && i && i[t] === e ? null : t, t = !1), null != n && (n = o.createCallback(n, i, 3)), ce(e, t, n)
                    }

                    function Nt(e) {
                        return re(e, h(arguments, 1))
                    }

                    function zt() {
                        for (var e = -1, t = arguments.length; ++e < t;) {
                            var n = arguments[e];
                            if (ui(n) || ye(n)) var i = i ? ce(re(i, n).concat(re(n, i))) : n
                        }
                        return i || []
                    }

                    function Ot() {
                        for (var e = arguments.length > 1 ? arguments : arguments[0], t = -1, n = e ? st(Di(e, "length")) : 0, i = xn(0 > n ? 0 : n); ++t < n;) i[t] = Di(e, t);
                        return i
                    }

                    function Ut(e, t) {
                        var n = -1,
                            i = e ? e.length : 0,
                            r = {};
                        for (t || !i || ui(e[0]) || (t = []); ++n < i;) {
                            var o = e[n];
                            t ? r[o] = t[n] : o && (r[o[0]] = o[1])
                        }
                        return r
                    }

                    function $t(e, t) {
                        if (!Ne(t)) throw new An;
                        return function() {
                            return --e < 1 ? t.apply(this, arguments) : void 0
                        }
                    }

                    function Rt(e, t) {
                        return arguments.length > 2 ? pe(e, 17, h(arguments, 2), null, t) : pe(e, 1, null, null, t)
                    }

                    function Ft(e) {
                        for (var t = arguments.length > 1 ? ae(arguments, !0, !1, 1) : _e(e), n = -1, i = t.length; ++n < i;) {
                            var r = t[n];
                            e[r] = pe(e[r], 1, null, null, e)
                        }
                        return e
                    }

                    function Gt(e, t) {
                        return arguments.length > 2 ? pe(t, 19, h(arguments, 2), null, e) : pe(t, 3, null, null, e)
                    }

                    function jt() {
                        for (var e = arguments, t = e.length; t--;)
                            if (!Ne(e[t])) throw new An;
                        return function() {
                            for (var t = arguments, n = e.length; n--;) t = [e[n].apply(this, t)];
                            return t[0]
                        }
                    }

                    function Wt(e, t) {
                        return t = "number" == typeof t ? t : +t || e.length, pe(e, 4, null, null, null, t)
                    }

                    function Vt(e, t, n) {
                        var i, r, o, a, s, l, d, c = 0,
                            u = !1,
                            p = !0;
                        if (!Ne(e)) throw new An;
                        if (t = ni(0, t) || 0, n === !0) {
                            var h = !0;
                            p = !1
                        } else ze(n) && (h = n.leading, u = "maxWait" in n && (ni(t, n.maxWait) || 0), p = "trailing" in n ? n.trailing : p);
                        var g = function() {
                                var n = t - (Mi() - a);
                                if (0 >= n) {
                                    r && $n(r);
                                    var u = d;
                                    r = l = d = f, u && (c = Mi(), o = e.apply(s, i), l || r || (i = s = null))
                                } else l = qn(g, n)
                            },
                            m = function() {
                                l && $n(l), r = l = d = f, (p || u !== t) && (c = Mi(), o = e.apply(s, i), l || r || (i = s = null))
                            };
                        return function() {
                            if (i = arguments, a = Mi(), s = this, d = p && (l || !h), u === !1) var n = h && !l;
                            else {
                                r || h || (c = a);
                                var f = u - (a - c),
                                    v = 0 >= f;
                                v ? (r && (r = $n(r)), c = a, o = e.apply(s, i)) : r || (r = qn(m, f))
                            }
                            return v && l ? l = $n(l) : l || t === u || (l = qn(g, t)), n && (v = !0, o = e.apply(s, i)), !v || l || r || (i = s = null), o
                        }
                    }

                    function qt(e) {
                        if (!Ne(e)) throw new An;
                        var t = h(arguments, 1);
                        return qn(function() {
                            e.apply(f, t)
                        }, 1)
                    }

                    function Xt(e, t) {
                        if (!Ne(e)) throw new An;
                        var n = h(arguments, 2);
                        return qn(function() {
                            e.apply(f, n)
                        }, t)
                    }

                    function Yt(e, t) {
                        if (!Ne(e)) throw new An;
                        var n = function() {
                            var i = n.cache,
                                r = t ? t.apply(this, arguments) : w + arguments[0];
                            return jn.call(i, r) ? i[r] : i[r] = e.apply(this, arguments)
                        };
                        return n.cache = {}, n
                    }

                    function Kt(e) {
                        var t, n;
                        if (!Ne(e)) throw new An;
                        return function() {
                            return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
                        }
                    }

                    function Qt(e) {
                        return pe(e, 16, h(arguments, 1))
                    }

                    function Jt(e) {
                        return pe(e, 32, null, h(arguments, 1))
                    }

                    function Zt(e, t, n) {
                        var i = !0,
                            r = !0;
                        if (!Ne(e)) throw new An;
                        return n === !1 ? i = !1 : ze(n) && (i = "leading" in n ? n.leading : i, r = "trailing" in n ? n.trailing : r), K.leading = i, K.maxWait = t, K.trailing = r, Vt(e, t, K)
                    }

                    function en(e, t) {
                        return pe(t, 16, [e])
                    }

                    function tn(e) {
                        return function() {
                            return e
                        }
                    }

                    function nn(e, t, n) {
                        var i = typeof e;
                        if (null == e || "function" == i) return ne(e, t, n);
                        if ("object" != i) return dn(e);
                        var r = hi(e),
                            o = r[0],
                            a = e[o];
                        return 1 != r.length || a !== a || ze(a) ? function(t) {
                            for (var n = r.length, i = !1; n-- && (i = se(t[r[n]], e[r[n]], null, !0)););
                            return i
                        } : function(e) {
                            var t = e[o];
                            return a === t && (0 !== a || 1 / a == 1 / t)
                        }
                    }

                    function rn(e) {
                        return null == e ? "" : Dn(e).replace(wi, ge)
                    }

                    function on(e) {
                        return e
                    }

                    function an(e, t, n) {
                        var i = !0,
                            r = t && _e(t);
                        t && (n || r.length) || (null == n && (n = t), a = m, t = e, e = o, r = _e(t)), n === !1 ? i = !1 : ze(n) && "chain" in n && (i = n.chain);
                        var a = e,
                            s = Ne(a);
                        it(r, function(n) {
                            var r = e[n] = t[n];
                            s && (a.prototype[n] = function() {
                                var t = this.__chain__,
                                    n = this.__wrapped__,
                                    o = [n];
                                Wn.apply(o, arguments);
                                var s = r.apply(e, o);
                                if (i || t) {
                                    if (n === s && ze(s)) return this;
                                    s = new a(s), s.__chain__ = t
                                }
                                return s
                            })
                        })
                    }

                    function sn() {
                        return n._ = Nn, this
                    }

                    function ln() {}

                    function dn(e) {
                        return function(t) {
                            return t[e]
                        }
                    }

                    function cn(e, t, n) {
                        var i = null == e,
                            r = null == t;
                        if (null == n && ("boolean" == typeof e && r ? (n = e, e = 1) : r || "boolean" != typeof t || (n = t, r = !0)), i && r && (t = 1), e = +e || 0, r ? (t = e, e = 0) : t = +t || 0, n || e % 1 || t % 1) {
                            var o = oi();
                            return ii(e + o * (t - e + parseFloat("1e-" + ((o + "").length - 1))), t)
                        }
                        return de(e, t)
                    }

                    function un(e, t) {
                        if (e) {
                            var n = e[t];
                            return Ne(n) ? e[t]() : n
                        }
                    }

                    function pn(e, t, n) {
                        var i = o.templateSettings;
                        e = Dn(e || ""), n = Si({}, n, i);
                        var r, a = Si({}, n.imports, i.imports),
                            l = hi(a),
                            d = Ke(a),
                            c = 0,
                            u = n.interpolate || B,
                            p = "__p += '",
                            h = In((n.escape || B).source + "|" + u.source + "|" + (u === A ? L : B).source + "|" + (n.evaluate || B).source + "|$", "g");
                        e.replace(h, function(t, n, i, o, a, l) {
                            return i || (i = o), p += e.slice(c, l).replace(H, s), n && (p += "' +\n__e(" + n + ") +\n'"), a && (r = !0, p += "';\n" + a + ";\n__p += '"), i && (p += "' +\n((__t = (" + i + ")) == null ? '' : __t) +\n'"), c = l + t.length, t
                        }), p += "';\n";
                        var g = n.variable,
                            m = g;
                        m || (g = "obj", p = "with (" + g + ") {\n" + p + "\n}\n"), p = (r ? p.replace(E, "") : p).replace(T, "$1").replace(_, "$1;"), p = "function(" + g + ") {\n" + (m ? "" : g + " || (" + g + " = {});\n") + "var __t, __p = '', __e = _.escape" + (r ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + p + "return __p\n}";
                        var v = "\n/*\n//# sourceURL=" + (n.sourceURL || "/lodash/template/source[" + O++ + "]") + "\n*/";
                        try {
                            var b = En(l, "return " + p + v).apply(f, d)
                        } catch (y) {
                            throw y.source = p, y
                        }
                        return t ? b(t) : (b.source = p, b)
                    }

                    function hn(e, t, n) {
                        e = (e = +e) > -1 ? e : 0;
                        var i = -1,
                            r = xn(e);
                        for (t = ne(t, n, 1); ++i < e;) r[i] = t(i);
                        return r
                    }

                    function gn(e) {
                        return null == e ? "" : Dn(e).replace(yi, be)
                    }

                    function fn(e) {
                        var t = ++b;
                        return Dn(null == e ? "" : e) + t
                    }

                    function mn(e) {
                        return e = new m(e), e.__chain__ = !0, e
                    }

                    function vn(e, t) {
                        return t(e), e
                    }

                    function bn() {
                        return this.__chain__ = !0, this
                    }

                    function yn() {
                        return Dn(this.__wrapped__)
                    }

                    function wn() {
                        return this.__wrapped__
                    }
                    n = n ? oe.defaults(te.Object(), n, oe.pick(te, N)) : te;
                    var xn = n.Array,
                        Cn = n.Boolean,
                        Sn = n.Date,
                        kn = n.Error,
                        En = n.Function,
                        Tn = n.Math,
                        _n = n.Number,
                        Ln = n.Object,
                        In = n.RegExp,
                        Dn = n.String,
                        An = n.TypeError,
                        Mn = [],
                        Bn = kn.prototype,
                        Pn = Ln.prototype,
                        Hn = Dn.prototype,
                        Nn = n._,
                        zn = Pn.toString,
                        On = In("^" + Dn(zn).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
                        Un = Tn.ceil,
                        $n = n.clearTimeout,
                        Rn = Tn.floor,
                        Fn = En.prototype.toString,
                        Gn = me(Gn = Ln.getPrototypeOf) && Gn,
                        jn = Pn.hasOwnProperty,
                        Wn = Mn.push,
                        Vn = Pn.propertyIsEnumerable,
                        qn = n.setTimeout,
                        Xn = Mn.splice,
                        Yn = Mn.unshift,
                        Kn = function() {
                            try {
                                var e = {},
                                    t = me(t = Ln.defineProperty) && t,
                                    n = t(e, e, e) && t
                            } catch (i) {}
                            return n
                        }(),
                        Qn = me(Qn = Ln.create) && Qn,
                        Jn = me(Jn = xn.isArray) && Jn,
                        Zn = n.isFinite,
                        ei = n.isNaN,
                        ti = me(ti = Ln.keys) && ti,
                        ni = Tn.max,
                        ii = Tn.min,
                        ri = n.parseInt,
                        oi = Tn.random,
                        ai = {};
                    ai[$] = xn, ai[R] = Cn, ai[F] = Sn, ai[j] = En, ai[V] = Ln, ai[W] = _n, ai[q] = In, ai[X] = Dn;
                    var si = {};
                    si[$] = si[F] = si[W] = {
                            constructor: !0,
                            toLocaleString: !0,
                            toString: !0,
                            valueOf: !0
                        }, si[R] = si[X] = {
                            constructor: !0,
                            toString: !0,
                            valueOf: !0
                        }, si[G] = si[j] = si[q] = {
                            constructor: !0,
                            toString: !0
                        }, si[V] = {
                            constructor: !0
                        },
                        function() {
                            for (var e = z.length; e--;) {
                                var t = z[e];
                                for (var n in si) jn.call(si, n) && !jn.call(si[n], t) && (si[n][t] = !1)
                            }
                        }(), m.prototype = o.prototype;
                    var li = o.support = {};
                    ! function() {
                        var e = function() {
                                this.x = 1
                            },
                            t = {
                                0: 1,
                                length: 1
                            },
                            i = [];
                        e.prototype = {
                            valueOf: 1,
                            y: 1
                        };
                        for (var r in new e) i.push(r);
                        for (r in arguments);
                        li.argsClass = zn.call(arguments) == U, li.argsObject = arguments.constructor == Ln && !(arguments instanceof xn), li.enumErrorProps = Vn.call(Bn, "message") || Vn.call(Bn, "name"), li.enumPrototypes = Vn.call(e, "prototype"), li.funcDecomp = !me(n.WinRTError) && P.test(g), li.funcNames = "string" == typeof En.name, li.nonEnumArgs = 0 != r, li.nonEnumShadows = !/valueOf/.test(i), li.ownLast = "x" != i[0], li.spliceObjects = (Mn.splice.call(t, 0, 1), !t[0]), li.unindexedChars = "x" [0] + Ln("x")[0] != "xx";
                        try {
                            li.nodeClass = !(zn.call(document) == V && !({
                                toString: 0
                            } + ""))
                        } catch (o) {
                            li.nodeClass = !0
                        }
                    }(1), o.templateSettings = {
                        escape: /<%-([\s\S]+?)%>/g,
                        evaluate: /<%([\s\S]+?)%>/g,
                        interpolate: A,
                        variable: "",
                        imports: {
                            _: o
                        }
                    };
                    var di = function(e) {
                        var t = "var index, iterable = " + e.firstArg + ", result = " + e.init + ";\nif (!iterable) return result;\n" + e.top + ";";
                        e.array ? (t += "\nvar length = iterable.length; index = -1;\nif (" + e.array + ") {  ", li.unindexedChars && (t += "\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "), t += "\n  while (++index < length) {\n    " + e.loop + ";\n  }\n}\nelse {  ") : li.nonEnumArgs && (t += "\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      " + e.loop + ";\n    }\n  } else {  "), li.enumPrototypes && (t += "\n  var skipProto = typeof iterable == 'function';\n  "), li.enumErrorProps && (t += "\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ");
                        var n = [];
                        if (li.enumPrototypes && n.push('!(skipProto && index == "prototype")'), li.enumErrorProps && n.push('!(skipErrorProps && (index == "message" || index == "name"))'), e.useHas && e.keys) t += "\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n", n.length && (t += "    if (" + n.join(" && ") + ") {\n  "), t += e.loop + ";    ", n.length && (t += "\n    }"), t += "\n  }  ";
                        else if (t += "\n  for (index in iterable) {\n", e.useHas && n.push("hasOwnProperty.call(iterable, index)"), n.length && (t += "    if (" + n.join(" && ") + ") {\n  "), t += e.loop + ";    ", n.length && (t += "\n    }"), t += "\n  }    ", li.nonEnumShadows) {
                            for (t += "\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ", k = 0; k < 7; k++) t += "\n    index = '" + e.shadowedProps[k] + "';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))", e.useHas || (t += " || (!nonEnum[index] && iterable[index] !== objectProto[index])"), t += ") {\n      " + e.loop + ";\n    }      ";
                            t += "\n  }    "
                        }
                        return (e.array || li.nonEnumArgs) && (t += "\n}"), t += e.bottom + ";\nreturn result"
                    };
                    Qn || (ee = function() {
                        function e() {}
                        return function(t) {
                            if (ze(t)) {
                                e.prototype = t;
                                var i = new e;
                                e.prototype = null
                            }
                            return i || n.Object()
                        }
                    }());
                    var ci = Kn ? function(e, t) {
                        Q.value = t, Kn(e, "__bindData__", Q)
                    } : ln;
                    li.argsClass || (ye = function(e) {
                        return e && "object" == typeof e && "number" == typeof e.length && jn.call(e, "callee") && !Vn.call(e, "callee") || !1
                    });
                    var ui = Jn || function(e) {
                            return e && "object" == typeof e && "number" == typeof e.length && zn.call(e) == $ || !1
                        },
                        pi = he({
                            args: "object",
                            init: "[]",
                            top: "if (!(objectTypes[typeof object])) return result",
                            loop: "result.push(index)"
                        }),
                        hi = ti ? function(e) {
                            return ze(e) ? li.enumPrototypes && "function" == typeof e || li.nonEnumArgs && e.length && ye(e) ? pi(e) : ti(e) : []
                        } : pi,
                        gi = {
                            args: "collection, callback, thisArg",
                            top: "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
                            array: "typeof length == 'number'",
                            keys: hi,
                            loop: "if (callback(iterable[index], index, collection) === false) return result"
                        },
                        fi = {
                            args: "object, source, guard",
                            top: "var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",
                            keys: hi,
                            loop: "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
                            bottom: "  }\n}"
                        },
                        mi = {
                            top: "if (!objectTypes[typeof iterable]) return result;\n" + gi.top,
                            array: !1
                        },
                        vi = {
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;",
                            "'": "&#39;"
                        },
                        bi = Ie(vi),
                        yi = In("(" + hi(bi).join("|") + ")", "g"),
                        wi = In("[" + hi(vi).join("") + "]", "g"),
                        xi = he(gi),
                        Ci = he(fi, {
                            top: fi.top.replace(";", ";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"),
                            loop: "result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"
                        }),
                        Si = he(fi),
                        ki = he(gi, mi, {
                            useHas: !1
                        }),
                        Ei = he(gi, mi);
                    Ne(/x/) && (Ne = function(e) {
                        return "function" == typeof e && zn.call(e) == j
                    });
                    var Ti = Gn ? function(e) {
                            if (!e || zn.call(e) != V || !li.argsClass && ye(e)) return !1;
                            var t = e.valueOf,
                                n = me(t) && (n = Gn(t)) && Gn(n);
                            return n ? e == n || Gn(e) == n : ve(e)
                        } : ve,
                        _i = ue(function(e, t, n) {
                            jn.call(e, n) ? e[n]++ : e[n] = 1
                        }),
                        Li = ue(function(e, t, n) {
                            (jn.call(e, n) ? e[n] : e[n] = []).push(t)
                        }),
                        Ii = ue(function(e, t, n) {
                            e[n] = t
                        }),
                        Di = at,
                        Ai = et,
                        Mi = me(Mi = Sn.now) && Mi || function() {
                            return (new Sn).getTime()
                        },
                        Bi = 8 == ri(S + "08") ? ri : function(e, t) {
                            return ri(Fe(e) ? e.replace(M, "") : e, t || 0)
                        };
                    return o.after = $t, o.assign = Ci, o.at = Qe, o.bind = Rt, o.bindAll = Ft, o.bindKey = Gt, o.chain = mn, o.compact = bt, o.compose = jt, o.constant = tn, o.countBy = _i, o.create = Ce, o.createCallback = nn, o.curry = Wt, o.debounce = Vt, o.defaults = Si, o.defer = qt, o.delay = Xt, o.difference = yt, o.filter = et, o.flatten = St, o.forEach = it, o.forEachRight = rt, o.forIn = ki, o.forInRight = Ee, o.forOwn = Ei, o.forOwnRight = Te, o.functions = _e, o.groupBy = Li, o.indexBy = Ii, o.initial = Et, o.intersection = Tt, o.invert = Ie, o.invoke = ot, o.keys = hi, o.map = at, o.mapValues = je, o.max = st, o.memoize = Yt, o.merge = We, o.min = lt, o.omit = Ve, o.once = Kt, o.pairs = qe, o.partial = Qt, o.partialRight = Jt, o.pick = Xe, o.pluck = Di, o.property = dn, o.pull = It, o.range = Dt, o.reject = ut, o.remove = At, o.rest = Mt, o.shuffle = ht, o.sortBy = mt, o.tap = vn, o.throttle = Zt, o.times = hn, o.toArray = vt, o.transform = Ye, o.union = Pt, o.uniq = Ht, o.values = Ke, o.where = Ai, o.without = Nt, o.wrap = en, o.xor = zt, o.zip = Ot, o.zipObject = Ut, o.collect = at, o.drop = Mt, o.each = it, o.eachRight = rt, o.extend = Ci, o.methods = _e, o.object = Ut, o.select = et, o.tail = Mt, o.unique = Ht, o.unzip = Ot, an(o), o.clone = we, o.cloneDeep = xe, o.contains = Je, o.escape = rn, o.every = Ze, o.find = tt, o.findIndex = wt, o.findKey = Se, o.findLast = nt, o.findLastIndex = xt, o.findLastKey = ke, o.has = Le, o.identity = on, o.indexOf = kt, o.isArguments = ye, o.isArray = ui, o.isBoolean = De, o.isDate = Ae, o.isElement = Me, o.isEmpty = Be, o.isEqual = Pe, o.isFinite = He, o.isFunction = Ne, o.isNaN = Oe, o.isNull = Ue, o.isNumber = $e, o.isObject = ze, o.isPlainObject = Ti, o.isRegExp = Re, o.isString = Fe, o.isUndefined = Ge, o.lastIndexOf = Lt, o.mixin = an, o.noConflict = sn, o.noop = ln, o.now = Mi, o.parseInt = Bi, o.random = cn, o.reduce = dt, o.reduceRight = ct, o.result = un, o.runInContext = g, o.size = gt, o.some = ft, o.sortedIndex = Bt, o.template = pn, o.unescape = gn, o.uniqueId = fn, o.all = Ze, o.any = ft, o.detect = tt, o.findWhere = tt, o.foldl = dt, o.foldr = ct, o.include = Je, o.inject = dt, an(function() {
                        var e = {};
                        return Ei(o, function(t, n) {
                            o.prototype[n] || (e[n] = t)
                        }), e
                    }(), !1), o.first = Ct, o.last = _t, o.sample = pt, o.take = Ct, o.head = Ct, Ei(o, function(e, t) {
                        var n = "sample" !== t;
                        o.prototype[t] || (o.prototype[t] = function(t, i) {
                            var r = this.__chain__,
                                o = e(this.__wrapped__, t, i);
                            return r || null != t && (!i || n && "function" == typeof t) ? new m(o, r) : o
                        })
                    }), o.VERSION = "2.4.1", o.prototype.chain = bn, o.prototype.toString = yn, o.prototype.value = wn, o.prototype.valueOf = wn, xi(["join", "pop", "shift"], function(e) {
                        var t = Mn[e];
                        o.prototype[e] = function() {
                            var e = this.__chain__,
                                n = t.apply(this.__wrapped__, arguments);
                            return e ? new m(n, e) : n
                        }
                    }), xi(["push", "reverse", "sort", "unshift"], function(e) {
                        var t = Mn[e];
                        o.prototype[e] = function() {
                            return t.apply(this.__wrapped__, arguments), this
                        }
                    }), xi(["concat", "slice", "splice"], function(e) {
                        var t = Mn[e];
                        o.prototype[e] = function() {
                            return new m(t.apply(this.__wrapped__, arguments), this.__chain__)
                        }
                    }), li.spliceObjects || xi(["pop", "shift", "splice"], function(e) {
                        var t = Mn[e],
                            n = "splice" == e;
                        o.prototype[e] = function() {
                            var e = this.__chain__,
                                i = this.__wrapped__,
                                r = t.apply(i, arguments);
                            return 0 === i.length && delete i[0], e || n ? new m(r, e) : r
                        }
                    }), o
                }
                var f, m = [],
                    v = [],
                    b = 0,
                    y = {},
                    w = +new Date + "",
                    x = 75,
                    C = 40,
                    S = "   \x0B\f \ufeff\n\r\u2028\u2029 ᠎             　",
                    E = /\b__p \+= '';/g,
                    T = /\b(__p \+=) '' \+/g,
                    _ = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
                    L = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                    I = /\w*$/,
                    D = /^\s*function[ \n\r\t]+\w/,
                    A = /<%=([\s\S]+?)%>/g,
                    M = RegExp("^[" + S + "]*0+(?=.$)"),
                    B = /($^)/,
                    P = /\bthis\b/,
                    H = /['\n\r\t\u2028\u2029\\]/g,
                    N = ["Array", "Boolean", "Date", "Error", "Function", "Math", "Number", "Object", "RegExp", "String", "_", "attachEvent", "clearTimeout", "isFinite", "isNaN", "parseInt", "setTimeout"],
                    z = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
                    O = 0,
                    U = "[object Arguments]",
                    $ = "[object Array]",
                    R = "[object Boolean]",
                    F = "[object Date]",
                    G = "[object Error]",
                    j = "[object Function]",
                    W = "[object Number]",
                    V = "[object Object]",
                    q = "[object RegExp]",
                    X = "[object String]",
                    Y = {};
                Y[j] = !1, Y[U] = Y[$] = Y[R] = Y[F] = Y[W] = Y[V] = Y[q] = Y[X] = !0;
                var K = {
                        leading: !1,
                        maxWait: 0,
                        trailing: !1
                    },
                    Q = {
                        configurable: !1,
                        enumerable: !1,
                        value: null,
                        writable: !1
                    },
                    J = {
                        args: "",
                        array: null,
                        bottom: "",
                        firstArg: "",
                        init: "",
                        keys: null,
                        loop: "",
                        shadowedProps: null,
                        support: null,
                        top: "",
                        useHas: !1
                    },
                    Z = {
                        "boolean": !1,
                        "function": !0,
                        object: !0,
                        number: !1,
                        string: !1,
                        undefined: !1
                    },
                    ee = {
                        "\\": "\\",
                        "'": "'",
                        "\n": "n",
                        "\r": "r",
                        "   ": "t",
                        "\u2028": "u2028",
                        "\u2029": "u2029"
                    },
                    te = Z[typeof window] && window || this,
                    ne = Z[typeof exports] && exports && !exports.nodeType && exports,
                    ie = Z[typeof module] && module && !module.nodeType && module,
                    re = (ie && ie.exports === ne && ne, Z[typeof global] && global);
                !re || re.global !== re && re.window !== re || (te = re);
                var oe = g();
                te._ = oe, o = function() {
                    return oe
                }()
            }.call(this),
            function(e, t) {
                a = function(n, i, r) {
                    return e.Backbone = t(e, r, n, i), r
                }(o, r, {})
            }(this, function(e, t, n, i) {
                var r = e.Backbone,
                    o = [],
                    a = (o.push, o.slice);
                o.splice;
                t.VERSION = "1.1.1", t.$ = i, t.noConflict = function() {
                    return e.Backbone = r, this
                }, t.emulateHTTP = !1, t.emulateJSON = !1;
                var s = t.Events = {
                        on: function(e, t, n) {
                            if (!d(this, "on", e, [t, n]) || !t) return this;
                            this._events || (this._events = {});
                            var i = this._events[e] || (this._events[e] = []);
                            return i.push({
                                callback: t,
                                context: n,
                                ctx: n || this
                            }), this
                        },
                        once: function(e, t, i) {
                            if (!d(this, "once", e, [t, i]) || !t) return this;
                            var r = this,
                                o = n.once(function() {
                                    r.off(e, o), t.apply(this, arguments)
                                });
                            return o._callback = t, this.on(e, o, i)
                        },
                        off: function(e, t, i) {
                            var r, o, a, s, l, c, u, p;
                            if (!this._events || !d(this, "off", e, [t, i])) return this;
                            if (!e && !t && !i) return this._events = void 0, this;
                            for (s = e ? [e] : n.keys(this._events), l = 0, c = s.length; c > l; l++)
                                if (e = s[l], a = this._events[e]) {
                                    if (this._events[e] = r = [], t || i)
                                        for (u = 0, p = a.length; p > u; u++) o = a[u], (t && t !== o.callback && t !== o.callback._callback || i && i !== o.context) && r.push(o);
                                    r.length || delete this._events[e]
                                }
                            return this
                        },
                        trigger: function(e) {
                            if (!this._events) return this;
                            var t = a.call(arguments, 1);
                            if (!d(this, "trigger", e, t)) return this;
                            var n = this._events[e],
                                i = this._events.all;
                            return n && c(n, t), i && c(i, arguments), this
                        },
                        stopListening: function(e, t, i) {
                            var r = this._listeningTo;
                            if (!r) return this;
                            var o = !t && !i;
                            i || "object" != typeof t || (i = this), e && ((r = {})[e._listenId] = e);
                            for (var a in r) e = r[a], e.off(t, i, this), (o || n.isEmpty(e._events)) && delete this._listeningTo[a];
                            return this
                        }
                    },
                    l = /\s+/,
                    d = function(e, t, n, i) {
                        if (!n) return !0;
                        if ("object" == typeof n) {
                            for (var r in n) e[t].apply(e, [r, n[r]].concat(i));
                            return !1
                        }
                        if (l.test(n)) {
                            for (var o = n.split(l), a = 0, s = o.length; s > a; a++) e[t].apply(e, [o[a]].concat(i));
                            return !1
                        }
                        return !0
                    },
                    c = function(e, t) {
                        var n, i = -1,
                            r = e.length,
                            o = t[0],
                            a = t[1],
                            s = t[2];
                        switch (t.length) {
                            case 0:
                                for (; ++i < r;)(n = e[i]).callback.call(n.ctx);
                                return;
                            case 1:
                                for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o);
                                return;
                            case 2:
                                for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o, a);
                                return;
                            case 3:
                                for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o, a, s);
                                return;
                            default:
                                for (; ++i < r;)(n = e[i]).callback.apply(n.ctx, t);
                                return
                        }
                    },
                    u = {
                        listenTo: "on",
                        listenToOnce: "once"
                    };
                n.each(u, function(e, t) {
                    s[t] = function(t, i, r) {
                        var o = this._listeningTo || (this._listeningTo = {}),
                            a = t._listenId || (t._listenId = n.uniqueId("l"));
                        return o[a] = t, r || "object" != typeof i || (r = this), t[e](i, r, this), this
                    }
                }), s.bind = s.on, s.unbind = s.off, n.extend(t, s);
                var p = t.Model = function(e, t) {
                    var i = e || {};
                    t || (t = {}), this.cid = n.uniqueId("c"), this.attributes = {}, t.collection && (this.collection = t.collection), t.parse && (i = this.parse(i, t) || {}), i = n.defaults({}, i, n.result(this, "defaults")), this.set(i, t), this.changed = {}, this.initialize.apply(this, arguments)
                };
                n.extend(p.prototype, s, {
                    changed: null,
                    validationError: null,
                    idAttribute: "id",
                    initialize: function() {},
                    toJSON: function(e) {
                        return n.clone(this.attributes)
                    },
                    sync: function() {
                        return t.sync.apply(this, arguments)
                    },
                    get: function(e) {
                        return this.attributes[e]
                    },
                    escape: function(e) {
                        return n.escape(this.get(e))
                    },
                    has: function(e) {
                        return null != this.get(e)
                    },
                    set: function(e, t, i) {
                        var r, o, a, s, l, d, c, u;
                        if (null == e) return this;
                        if ("object" == typeof e ? (o = e, i = t) : (o = {})[e] = t, i || (i = {}), !this._validate(o, i)) return !1;
                        a = i.unset, l = i.silent, s = [], d = this._changing, this._changing = !0, d || (this._previousAttributes = n.clone(this.attributes), this.changed = {}), u = this.attributes, c = this._previousAttributes, this.idAttribute in o && (this.id = o[this.idAttribute]);
                        for (r in o) t = o[r], n.isEqual(u[r], t) || s.push(r), n.isEqual(c[r], t) ? delete this.changed[r] : this.changed[r] = t, a ? delete u[r] : u[r] = t;
                        if (!l) {
                            s.length && (this._pending = i);
                            for (var p = 0, h = s.length; h > p; p++) this.trigger("change:" + s[p], this, u[s[p]], i)
                        }
                        if (d) return this;
                        if (!l)
                            for (; this._pending;) i = this._pending, this._pending = !1, this.trigger("change", this, i);
                        return this._pending = !1, this._changing = !1, this
                    },
                    unset: function(e, t) {
                        return this.set(e, void 0, n.extend({}, t, {
                            unset: !0
                        }))
                    },
                    clear: function(e) {
                        var t = {};
                        for (var i in this.attributes) t[i] = void 0;
                        return this.set(t, n.extend({}, e, {
                            unset: !0
                        }))
                    },
                    hasChanged: function(e) {
                        return null == e ? !n.isEmpty(this.changed) : n.has(this.changed, e)
                    },
                    changedAttributes: function(e) {
                        if (!e) return this.hasChanged() ? n.clone(this.changed) : !1;
                        var t, i = !1,
                            r = this._changing ? this._previousAttributes : this.attributes;
                        for (var o in e) n.isEqual(r[o], t = e[o]) || ((i || (i = {}))[o] = t);
                        return i
                    },
                    previous: function(e) {
                        return null != e && this._previousAttributes ? this._previousAttributes[e] : null
                    },
                    previousAttributes: function() {
                        return n.clone(this._previousAttributes)
                    },
                    fetch: function(e) {
                        e = e ? n.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
                        var t = this,
                            i = e.success;
                        return e.success = function(n) {
                            return t.set(t.parse(n, e), e) ? (i && i(t, n, e), void t.trigger("sync", t, n, e)) : !1
                        }, O(this, e), this.sync("read", this, e)
                    },
                    save: function(e, t, i) {
                        var r, o, a, s = this.attributes;
                        if (null == e || "object" == typeof e ? (r = e, i = t) : (r = {})[e] = t, i = n.extend({
                                validate: !0
                            }, i), r && !i.wait) {
                            if (!this.set(r, i)) return !1
                        } else if (!this._validate(r, i)) return !1;
                        r && i.wait && (this.attributes = n.extend({}, s, r)), void 0 === i.parse && (i.parse = !0);
                        var l = this,
                            d = i.success;
                        return i.success = function(e) {
                            l.attributes = s;
                            var t = l.parse(e, i);
                            return i.wait && (t = n.extend(r || {}, t)), n.isObject(t) && !l.set(t, i) ? !1 : (d && d(l, e, i), void l.trigger("sync", l, e, i))
                        }, O(this, i), o = this.isNew() ? "create" : i.patch ? "patch" : "update", "patch" === o && (i.attrs = r), a = this.sync(o, this, i), r && i.wait && (this.attributes = s), a
                    },
                    destroy: function(e) {
                        e = e ? n.clone(e) : {};
                        var t = this,
                            i = e.success,
                            r = function() {
                                t.trigger("destroy", t, t.collection, e)
                            };
                        if (e.success = function(n) {
                                (e.wait || t.isNew()) && r(), i && i(t, n, e), t.isNew() || t.trigger("sync", t, n, e)
                            }, this.isNew()) return e.success(), !1;
                        O(this, e);
                        var o = this.sync("delete", this, e);
                        return e.wait || r(), o
                    },
                    url: function() {
                        var e = n.result(this, "urlRoot") || n.result(this.collection, "url") || z();
                        return this.isNew() ? e : e.replace(/([^\/])$/, "$1/") + encodeURIComponent(this.id)
                    },
                    parse: function(e, t) {
                        return e
                    },
                    clone: function() {
                        return new this.constructor(this.attributes)
                    },
                    isNew: function() {
                        return !this.has(this.idAttribute)
                    },
                    isValid: function(e) {
                        return this._validate({}, n.extend(e || {}, {
                            validate: !0
                        }))
                    },
                    _validate: function(e, t) {
                        if (!t.validate || !this.validate) return !0;
                        e = n.extend({}, this.attributes, e);
                        var i = this.validationError = this.validate(e, t) || null;
                        return i ? (this.trigger("invalid", this, i, n.extend(t, {
                            validationError: i
                        })), !1) : !0
                    }
                });
                var h = ["keys", "values", "pairs", "invert", "pick", "omit"];
                n.each(h, function(e) {
                    p.prototype[e] = function() {
                        var t = a.call(arguments);
                        return t.unshift(this.attributes), n[e].apply(n, t)
                    }
                });
                var g = t.Collection = function(e, t) {
                        t || (t = {}), t.model && (this.model = t.model), void 0 !== t.comparator && (this.comparator = t.comparator), this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, n.extend({
                            silent: !0
                        }, t))
                    },
                    f = {
                        add: !0,
                        remove: !0,
                        merge: !0
                    },
                    m = {
                        add: !0,
                        remove: !1
                    };
                n.extend(g.prototype, s, {
                    model: p,
                    initialize: function() {},
                    toJSON: function(e) {
                        return this.map(function(t) {
                            return t.toJSON(e)
                        })
                    },
                    sync: function() {
                        return t.sync.apply(this, arguments)
                    },
                    add: function(e, t) {
                        return this.set(e, n.extend({
                            merge: !1
                        }, t, m))
                    },
                    remove: function(e, t) {
                        var i = !n.isArray(e);
                        e = i ? [e] : n.clone(e), t || (t = {});
                        var r, o, a, s;
                        for (r = 0, o = e.length; o > r; r++) s = e[r] = this.get(e[r]), s && (delete this._byId[s.id], delete this._byId[s.cid], a = this.indexOf(s), this.models.splice(a, 1), this.length--, t.silent || (t.index = a, s.trigger("remove", s, this, t)), this._removeReference(s, t));
                        return i ? e[0] : e
                    },
                    set: function(e, t) {
                        t = n.defaults({}, t, f), t.parse && (e = this.parse(e, t));
                        var i = !n.isArray(e);
                        e = i ? e ? [e] : [] : n.clone(e);
                        var r, o, a, s, l, d, c, u = t.at,
                            h = this.model,
                            g = this.comparator && null == u && t.sort !== !1,
                            m = n.isString(this.comparator) ? this.comparator : null,
                            v = [],
                            b = [],
                            y = {},
                            w = t.add,
                            x = t.merge,
                            C = t.remove,
                            S = !g && w && C ? [] : !1;
                        for (r = 0, o = e.length; o > r; r++) {
                            if (l = e[r] || {}, a = l instanceof p ? s = l : l[h.prototype.idAttribute || "id"], d = this.get(a)) C && (y[d.cid] = !0), x && (l = l === s ? s.attributes : l, t.parse && (l = d.parse(l, t)), d.set(l, t), g && !c && d.hasChanged(m) && (c = !0)), e[r] = d;
                            else if (w) {
                                if (s = e[r] = this._prepareModel(l, t), !s) continue;
                                v.push(s), this._addReference(s, t)
                            }
                            s = d || s, !S || !s.isNew() && y[s.id] || S.push(s), y[s.id] = !0
                        }
                        if (C) {
                            for (r = 0, o = this.length; o > r; ++r) y[(s = this.models[r]).cid] || b.push(s);
                            b.length && this.remove(b, t)
                        }
                        if (v.length || S && S.length)
                            if (g && (c = !0), this.length += v.length, null != u)
                                for (r = 0, o = v.length; o > r; r++) this.models.splice(u + r, 0, v[r]);
                            else {
                                S && (this.models.length = 0);
                                var k = S || v;
                                for (r = 0, o = k.length; o > r; r++) this.models.push(k[r])
                            }
                        if (c && this.sort({
                                silent: !0
                            }), !t.silent) {
                            for (r = 0, o = v.length; o > r; r++)(s = v[r]).trigger("add", s, this, t);
                            (c || S && S.length) && this.trigger("sort", this, t)
                        }
                        return i ? e[0] : e
                    },
                    reset: function(e, t) {
                        t || (t = {});
                        for (var i = 0, r = this.models.length; r > i; i++) this._removeReference(this.models[i], t);
                        return t.previousModels = this.models, this._reset(), e = this.add(e, n.extend({
                            silent: !0
                        }, t)), t.silent || this.trigger("reset", this, t), e
                    },
                    push: function(e, t) {
                        return this.add(e, n.extend({
                            at: this.length
                        }, t))
                    },
                    pop: function(e) {
                        var t = this.at(this.length - 1);
                        return this.remove(t, e), t
                    },
                    unshift: function(e, t) {
                        return this.add(e, n.extend({
                            at: 0
                        }, t))
                    },
                    shift: function(e) {
                        var t = this.at(0);
                        return this.remove(t, e), t
                    },
                    slice: function() {
                        return a.apply(this.models, arguments)
                    },
                    get: function(e) {
                        return null != e ? this._byId[e] || this._byId[e.id] || this._byId[e.cid] : void 0
                    },
                    at: function(e) {
                        return this.models[e]
                    },
                    where: function(e, t) {
                        return n.isEmpty(e) ? t ? void 0 : [] : this[t ? "find" : "filter"](function(t) {
                            for (var n in e)
                                if (e[n] !== t.get(n)) return !1;
                            return !0
                        })
                    },
                    findWhere: function(e) {
                        return this.where(e, !0)
                    },
                    sort: function(e) {
                        if (!this.comparator) throw new B("Cannot sort a set without a comparator");
                        return e || (e = {}), n.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(n.bind(this.comparator, this)), e.silent || this.trigger("sort", this, e), this
                    },
                    pluck: function(e) {
                        return n.invoke(this.models, "get", e)
                    },
                    fetch: function(e) {
                        e = e ? n.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
                        var t = e.success,
                            i = this;
                        return e.success = function(n) {
                            var r = e.reset ? "reset" : "set";
                            i[r](n, e), t && t(i, n, e), i.trigger("sync", i, n, e)
                        }, O(this, e), this.sync("read", this, e)
                    },
                    create: function(e, t) {
                        if (t = t ? n.clone(t) : {}, !(e = this._prepareModel(e, t))) return !1;
                        t.wait || this.add(e, t);
                        var i = this,
                            r = t.success;
                        return t.success = function(e, n) {
                            t.wait && i.add(e, t), r && r(e, n, t)
                        }, e.save(null, t), e
                    },
                    parse: function(e, t) {
                        return e
                    },
                    clone: function() {
                        return new this.constructor(this.models)
                    },
                    _reset: function() {
                        this.length = 0, this.models = [], this._byId = {}
                    },
                    _prepareModel: function(e, t) {
                        if (e instanceof p) return e;
                        t = t ? n.clone(t) : {}, t.collection = this;
                        var i = new this.model(e, t);
                        return i.validationError ? (this.trigger("invalid", this, i.validationError, t), !1) : i
                    },
                    _addReference: function(e, t) {
                        this._byId[e.cid] = e, null != e.id && (this._byId[e.id] = e), e.collection || (e.collection = this), e.on("all", this._onModelEvent, this)
                    },
                    _removeReference: function(e, t) {
                        this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
                    },
                    _onModelEvent: function(e, t, n, i) {
                        ("add" !== e && "remove" !== e || n === this) && ("destroy" === e && this.remove(t, i), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], null != t.id && (this._byId[t.id] = t)), this.trigger.apply(this, arguments))
                    }
                });
                var v = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain", "sample"];
                n.each(v, function(e) {
                    g.prototype[e] = function() {
                        var t = a.call(arguments);
                        return t.unshift(this.models), n[e].apply(n, t)
                    }
                });
                var b = ["groupBy", "countBy", "sortBy", "indexBy"];
                n.each(b, function(e) {
                    g.prototype[e] = function(t, i) {
                        var r = n.isFunction(t) ? t : function(e) {
                            return e.get(t)
                        };
                        return n[e](this.models, r, i)
                    }
                });
                var y = t.View = function(e) {
                        this.cid = n.uniqueId("view"), e || (e = {}), n.extend(this, n.pick(e, x)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
                    },
                    w = /^(\S+)\s*(.*)$/,
                    x = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
                n.extend(y.prototype, s, {
                    tagName: "div",
                    $: function(e) {
                        return this.$el.find(e)
                    },
                    initialize: function() {},
                    render: function() {
                        return this
                    },
                    remove: function() {
                        return this.$el.remove(), this.stopListening(), this
                    },
                    setElement: function(e, n) {
                        return this.$el && this.undelegateEvents(), this.$el = e instanceof t.$ ? e : t.$(e), this.el = this.$el[0], n !== !1 && this.delegateEvents(), this
                    },
                    delegateEvents: function(e) {
                        if (!e && !(e = n.result(this, "events"))) return this;
                        this.undelegateEvents();
                        for (var t in e) {
                            var i = e[t];
                            if (n.isFunction(i) || (i = this[e[t]]), i) {
                                var r = t.match(w),
                                    o = r[1],
                                    a = r[2];
                                i = n.bind(i, this), o += ".delegateEvents" + this.cid, "" === a ? this.$el.on(o, i) : this.$el.on(o, a, i)
                            }
                        }
                        return this
                    },
                    undelegateEvents: function() {
                        return this.$el.off(".delegateEvents" + this.cid), this
                    },
                    _ensureElement: function() {
                        if (this.el) this.setElement(n.result(this, "el"), !1);
                        else {
                            var e = n.extend({}, n.result(this, "attributes"));
                            this.id && (e.id = n.result(this, "id")), this.className && (e["class"] = n.result(this, "className"));
                            var i = t.$("<" + n.result(this, "tagName") + ">").attr(e);
                            this.setElement(i, !1)
                        }
                    }
                }), t.sync = function(e, i, r) {
                    var o = S[e];
                    n.defaults(r || (r = {}), {
                        emulateHTTP: t.emulateHTTP,
                        emulateJSON: t.emulateJSON
                    });
                    var a = {
                        type: o,
                        dataType: "json"
                    };
                    if (r.url || (a.url = n.result(i, "url") || z()), null != r.data || !i || "create" !== e && "update" !== e && "patch" !== e || (a.contentType = "application/json", a.data = JSON.stringify(r.attrs || i.toJSON(r))), r.emulateJSON && (a.contentType = "application/x-www-form-urlencoded", a.data = a.data ? {
                            model: a.data
                        } : {}), r.emulateHTTP && ("PUT" === o || "DELETE" === o || "PATCH" === o)) {
                        a.type = "POST", r.emulateJSON && (a.data._method = o);
                        var s = r.beforeSend;
                        r.beforeSend = function(e) {
                            return e.setRequestHeader("X-HTTP-Method-Override", o), s ? s.apply(this, arguments) : void 0
                        }
                    }
                    "GET" === a.type || r.emulateJSON || (a.processData = !1), "PATCH" === a.type && C && (a.xhr = function() {
                        return new ActiveXObject("Microsoft.XMLHTTP")
                    });
                    var l = r.xhr = t.ajax(n.extend(a, r));
                    return i.trigger("request", i, l, r), l
                };
                var C = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
                    S = {
                        create: "POST",
                        update: "PUT",
                        patch: "PATCH",
                        "delete": "DELETE",
                        read: "GET"
                    };
                t.ajax = function() {
                    return t.$.ajax.apply(t.$, arguments)
                };
                var k = t.Router = function(e) {
                        e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
                    },
                    E = /\((.*?)\)/g,
                    T = /(\(\?)?:\w+/g,
                    _ = /\*\w+/g,
                    L = /[\-{}\[\]+?.,\\\^$|#\s]/g;
                n.extend(k.prototype, s, {
                    initialize: function() {},
                    route: function(e, i, r) {
                        n.isRegExp(e) || (e = this._routeToRegExp(e)), n.isFunction(i) && (r = i, i = ""), r || (r = this[i]);
                        var o = this;
                        return t.history.route(e, function(n) {
                            var a = o._extractParameters(e, n);
                            o.execute(r, a), o.trigger.apply(o, ["route:" + i].concat(a)), o.trigger("route", i, a), t.history.trigger("route", o, i, a)
                        }), this
                    },
                    execute: function(e, t) {
                        e && e.apply(this, t)
                    },
                    navigate: function(e, n) {
                        return t.history.navigate(e, n), this
                    },
                    _bindRoutes: function() {
                        if (this.routes) {
                            this.routes = n.result(this, "routes");
                            for (var e, t = n.keys(this.routes); null != (e = t.pop());) this.route(e, this.routes[e])
                        }
                    },
                    _routeToRegExp: function(e) {
                        return e = e.replace(L, "\\$&").replace(E, "(?:$1)?").replace(T, function(e, t) {
                            return t ? e : "([^/?]+)"
                        }).replace(_, "([^?]*?)"), new RegExp("^" + e + "(?:\\?(.*))?$")
                    },
                    _extractParameters: function(e, t) {
                        var i = e.exec(t).slice(1);
                        return n.map(i, function(e, t) {
                            return t === i.length - 1 ? e || null : e ? decodeURIComponent(e) : null
                        })
                    }
                });
                var I = t.History = function() {
                        this.handlers = [], n.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
                    },
                    D = /^[#\/]|\s+$/g,
                    A = /^\/+|\/+$/g,
                    M = /msie [\w.]+/,
                    P = /\/$/,
                    H = /#.*$/;
                I.started = !1, n.extend(I.prototype, s, {
                    interval: 50,
                    atRoot: function() {
                        return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root
                    },
                    getHash: function(e) {
                        var t = (e || this).location.href.match(/#(.*)$/);
                        return t ? t[1] : ""
                    },
                    getFragment: function(e, t) {
                        if (null == e)
                            if (this._hasPushState || !this._wantsHashChange || t) {
                                e = decodeURI(this.location.pathname + this.location.search);
                                var n = this.root.replace(P, "");
                                e.indexOf(n) || (e = e.slice(n.length))
                            } else e = this.getHash();
                        return e.replace(D, "")
                    },
                    start: function(e) {
                        if (I.started) throw new B("Backbone.history has already been started");
                        I.started = !0, this.options = n.extend({
                            root: "/"
                        }, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                        var i = this.getFragment(),
                            r = document.documentMode,
                            o = M.exec(navigator.userAgent.toLowerCase()) && (!r || 7 >= r);
                        if (this.root = ("/" + this.root + "/").replace(A, "/"), o && this._wantsHashChange) {
                            var a = t.$('<iframe src="javascript:0" tabindex="-1">');
                            this.iframe = a.hide().appendTo("body")[0].contentWindow, this.navigate(i)
                        }
                        this._hasPushState ? t.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !o ? t.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = i;
                        var s = this.location;
                        if (this._wantsHashChange && this._wantsPushState) {
                            if (!this._hasPushState && !this.atRoot()) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + "#" + this.fragment), !0;
                            this._hasPushState && this.atRoot() && s.hash && (this.fragment = this.getHash().replace(D, ""), this.history.replaceState({}, document.title, this.root + this.fragment))
                        }
                        return this.options.silent ? void 0 : this.loadUrl()
                    },
                    stop: function() {
                        t.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), I.started = !1
                    },
                    route: function(e, t) {
                        this.handlers.unshift({
                            route: e,
                            callback: t
                        })
                    },
                    checkUrl: function(e) {
                        var t = this.getFragment();
                        return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t === this.fragment ? !1 : (this.iframe && this.navigate(t), void this.loadUrl())
                    },
                    loadUrl: function(e) {
                        return e = this.fragment = this.getFragment(e), n.any(this.handlers, function(t) {
                            return t.route.test(e) ? (t.callback(e), !0) : void 0
                        })
                    },
                    navigate: function(e, t) {
                        if (!I.started) return !1;
                        t && t !== !0 || (t = {
                            trigger: !!t
                        });
                        var n = this.root + (e = this.getFragment(e || ""));
                        if (e = e.replace(H, ""), this.fragment !== e) {
                            if (this.fragment = e, "" === e && "/" !== n && (n = n.slice(0, -1)), this._hasPushState) this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n);
                            else {
                                if (!this._wantsHashChange) return this.location.assign(n);
                                this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, t.replace))
                            }
                            return t.trigger ? this.loadUrl(e) : void 0
                        }
                    },
                    _updateHash: function(e, t, n) {
                        if (n) {
                            var i = e.href.replace(/(javascript:|#).*$/, "");
                            e.replace(i + "#" + t)
                        } else e.hash = "#" + t
                    }
                }), t.history = new I;
                var N = function(e, t) {
                    var i, r = this;
                    i = e && n.has(e, "constructor") ? e.constructor : function() {
                        return r.apply(this, arguments)
                    }, n.extend(i, r, t);
                    var o = function() {
                        this.constructor = i
                    };
                    return o.prototype = r.prototype, i.prototype = new o, e && n.extend(i.prototype, e), i.__super__ = r.prototype, i
                };
                p.extend = g.extend = k.extend = y.extend = I.extend = N;
                var z = function() {
                        throw new B('A "url" property or function must be specified')
                    },
                    O = function(e, t) {
                        var n = t.error;
                        t.error = function(i) {
                            n && n(e, i, t), e.trigger("error", e, i, t)
                        }
                    };
                return t
            }), l = function(e, t) {
                var n = t.Model.extend({
                    initialize: function() {
                        this.on("change", function(e) {
                            e.serialize()
                        })
                    },
                    defaults: {
                        languageId: "en-US",
                        preview: !1,
                        activeView: ""
                    },
                    deserialize: function() {
                        return ServerSide.Lib.Utils.SsgSerialiser.deserialise("ViewData") || {}
                    },
                    serialize: function() {
                        ServerSide.Lib.Utils.SsgSerialiser.serialise("ViewData", this)
                    },
                    validate: function(e) {}
                });
                return new n
            }(r, a), d = '<!-- ================= FLAT GENERIC V2 ============================ -->\r\n    <div id="breadcrumbBar" class="bgCol_2">\r\n        <div class="bc-section bgCol_1" id="designStep"></div\r\n            ><div id="chevron1" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron2.svg" ></div>\r\n        <div class="bc-section bgCol_2" id="previewStep"></div\r\n            ><div id="chevron2" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron_inactive.svg" ></div>\r\n        <div class="bc-section bgCol_2" id="dataCapStep"></div>\r\n\r\n        <div id="topBarControls">           \r\n            <a id="fullscreen-button" title="Full screen on/off" class="tb-item hint  tab-item" ><img  class="svg vCentre" src="<%= aamd.resourceLocation %>fg_fullscreen.svg" ><span ref="fullscr"></a>\r\n        </div>\r\n    </div>\r\n \r\n    <div id="imageContols" class="parent">            \r\n            <a class="img-control hint tab-item"  id="wrench-button" ><img  class="svg centre" src="<%= aamd.resourceLocation %>fg_wrench.svg" ><span ref="wrench"></span></a>\r\n            <a class="img-control hint tab-item"  id="flip-button"   ><img  class="svg centre" src="<%= aamd.resourceLocation %>fg_flip.svg" ><span ref="flip"></a>\r\n            <a class="img-control hint tab-item"  id="rotate-button" ><img  class="svg centre" src="<%= aamd.resourceLocation %>fg_rotate.svg" ><span ref="rotate"></a>\r\n            <a class="img-control hint tab-item"  id="center-button" eventname="onmovecenter"><img class="svg centre"  src="<%= aamd.resourceLocation %>fg_resetPos.svg" ><span ref="reset"></a>\r\n    </div>\r\n\r\n       <!--  =========== expanding toolbox ====================  -->\r\n    <div id="slidingPanel" class="borderCol_1">\r\n        <a  id="panelWrench"                                   class="textCol_1 tab-item"   ><img class="svg panelImg"  src="<%= aamd.resourceLocation %>fg_wrench.svg" ><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>\r\n        <a  id="left-button" eventname="onmoveleft"            class="textCol_1 tab-item"   ><img class="svg panelImg"  src="<%= aamd.resourceLocation %>fg_moveLeft.svg" ><span ref="moveL"></span></a>\r\n        <a  id="right-button" eventname="onmoveright"          class="textCol_1 tab-item"   ><img class="svg panelImg"  src="<%= aamd.resourceLocation %>fg_moveRight.svg" ><span ref="moveR"></span></a>\r\n        <a  id="up-button"     eventname="onmoveup"            class="textCol_1 tab-item"   ><img class="svg panelImg"  src="<%= aamd.resourceLocation %>fg_moveUp.svg" ><span ref="moveU"></span></a>\r\n        <a  id="down-button" eventname="onmovedown"            class="textCol_1 tab-item"   ><img class="svg panelImg"  src="<%= aamd.resourceLocation %>fg_moveDown.svg" ><span ref="moveD"></span></a>\r\n        <a  id="scaleup-button" eventname="onincreasescale"    class="textCol_1 tab-item"   ><img class="svg panelImg"  src="<%= aamd.resourceLocation %>fg_scaleUp.svg" ><span ref="scaleU"></span></a>\r\n        <a  id="scaledown-button" eventname="onreducescale"    class="textCol_1 tab-item"   ><img class="svg panelImg"  src="<%= aamd.resourceLocation %>fg_scaleDown.svg" ><span ref="scaleD"></span></a>\r\n    </div>\r\n\r\n    <a id="previewtab-button" class="nav-button hint  tab-item" >\r\n        <img class="svg" src="<%= aamd.resourceLocation %>fg_next.svg" ><span ref="next"></span>\r\n    </a> \r\n\r\n    <div id="stage">\r\n        <!-- <input readonly id="cardDesign" class="tab-item"/> -->\r\n        <span id="cardDesign" class="tab-item"></span>\r\n        <div class="error-box" id="locked-message" ref="errorLocked"></div> \r\n        <div class=\'error-box\' id=\'card-coverage-message\' ref="errorCoverage"></div>\r\n        <div id="ssg-designer">\r\n            <img id="canvas-spinner" src="<%= aamd.resourceLocation %>floatingBars.gif" />\r\n            <div class="ssg-canvas" id="canvas1"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <div id="galleryPane">\r\n        <a class="img-control hint"   id="text-button" ><img id="text-edit-button" class="svg centre" src="<%= aamd.resourceLocation %>fg_textTab.svg" ><span ref="textEdit"></span></a>\r\n        <a class="img-control hint"   id="logo-button" ><img id="text-edit-button" class="svg centre" src="<%= aamd.resourceLocation %>fg_fullscreen.svg" ><span ref="textEdit"></span></a>\r\n        <a class="img-control hint"   id="clipart-button" ><img class="svg centre" src="<%= aamd.resourceLocation %>fg_emoji.svg" ><span ref="clipArtEdit"></span></a>\r\n        <div id="tabBar" class="borderCol_1"></div> \r\n        <a class="img-control hint tab-item"  id="view-all" ><img id="view-all-button" class="svg centre" src="<%= aamd.resourceLocation %>fg_chevron_up.svg" ><span ref="viewAllTab"></span></a>\r\n\r\n        <div id="galleryImages">\r\n            <a id="upload-page-button"  class="hint tab-item" ><img  class="svg centre" src="<%= aamd.resourceLocation %>fg_custom_img.svg" ><span ref="uploadButtonHint"></span><p class="textCol_1" ref="uploadButton"></p></a> \r\n            <button class="tab-item" id="galleryGroup" xaria-describedby="tp3"></button> \r\n            <div class="ssg-mini-gallery" id="gallery1"></div>\r\n        </div>\r\n\r\n        <div id="galleryPanel">\r\n            <div id="galleryControls">\r\n                <div class="gallery-control "><img class="svg centre" src="<%= aamd.resourceLocation %>fg_category.svg" ></div> \r\n                <div class="ssg-selector outlineColor hint outlineCol_1" id="selector1" >\r\n                    <span ref="galleryCategories"></span>\r\n                </div>\r\n<button id="facebook-button"><img id="text-edit-button" class="svg xcentre" src="<%= aamd.resourceLocation %>FB-fLogo_2016.svg" ></button>\r\n                <a class="search-control hint tab-item" id="gallerySearch" ><img  class="svg centre" src="<%= aamd.resourceLocation %>fg_search.svg" ><span ref="galleryKeyword"></span></a>\r\n            <div>\r\n        </div> \r\n    </div>\r\n\r\n    <!-- ======================================================================================================== -->\r\n\r\n    <div id="move-controls" class="control">\r\n    <input id="scale-slider" type="slider" value="100" style="display:none"/> <!-- this is left in to simplify scale handling -->\r\n\r\n', c = function(e, t) {
                var n = function(e, n) {
                    function i(e, t) {
                        function n(e, t) {
                            r.fireEvent(e, t)
                        }
                        var i = e + "-button",
                            r = new ServerSide.Framework.Eventing.EventCollection,
                            o = !0,
                            a = document.getElementById(i);
                        if (null === a) throw "No image is associated with the button : " + i;
                        var s = "IMG" === a.tagName || "INPUT" === a.tagName ? a : a.getElementsByTagName("img")[0];
                        a.onclick = function(e) {
                            o && n("onclick", e)
                        }, this.disable = function() {
                            s.style.opacity = "0.4", s.disabled = !0, o = !1
                        }, this.activate = function() {
                            s.disabled = !1, o = !0
                        }, this.deactivate = function() {
                            s.style.opacity = "1", s.disabled = !1, o = !0
                        }, this.registerEventHandler = function(e, t) {
                            r.registerEventHandler(e, t)
                        }, this.getEventName = function() {
                            return a.getAttribute("eventname")
                        }
                    }
                    var r = new ServerSide.Framework.Eventing.EventCollection,
                        o = (ServerSide.Configuration.Urls.Resources, new i("flip", n)),
                        a = new i("rotate", n),
                        s = new i("upload-page", n),
                        l = new i("previewtab", n),
                        d = (new i("fullscreen", n), new i("wrench", n)),
                        c = new i("text", n),
                        u = new i("clipart", n);
                    if (n.isLogo) var p = new ServerSide.Framework.UI.WidgetLib.Button("clear-logo", ServerSide.Configuration.Urls.Resources);
                    else var h = new i("logo", n);
                    var g = new ServerSide.Framework.UI.WidgetLib.Section("move", [new i("up", n), new i("down", n), new i("left", n), new i("right", n), new i("center", n)]),
                        f = new i("scaleup", n),
                        m = new i("scaledown", n);
                    this.registerEventHandler = function(e, t) {
                        r.registerEventHandler(e, t)
                    }, this.previewButtonIsEnabled = function(e) {
                        t.set("preview", e), e ? l.deactivate() : l.disable()
                    }, this.isEnabled = function(e) {
                        e ? (g.deactivate(), f.deactivate(), m.deactivate(), o.deactivate(), a.deactivate(), d.deactivate()) : (g.disable(), f.disable(), m.disable(), o.disable(), a.disable(), d.disable())
                    }, r.exposeEvent(g, "onmoveup"), r.exposeEvent(g, "onmovedown"), r.exposeEvent(g, "onmoveleft"), r.exposeEvent(g, "onmoveright"), r.exposeEvent(g, "onmovecenter"), r.exposeEvent(f, "onclick", "onscaleup"), r.exposeEvent(m, "onclick", "onscaledown"), r.exposeEvent(a, "onclick", "onrotateright"), r.exposeEvent(o, "onclick", "onflip"), r.exposeEvent(c, "onclick", "ontextClick"), r.exposeEvent(u, "onclick", "onclipartClick"), r.exposeEvent(s, "onclick", "onuploadclick"), n.isLogo ? r.exposeEvent(p, "onclick", "onClearLogoClick") : r.exposeEvent(h, "onclick", "onlogoClick")
                };
                return n
            }(r, l), ie.prototype.init = function() {
                this.hideTip(), this.$tip.css("position", "absolute"), this.$tip.css("top", this.position.top + "px"), this.$tip.css("left", this.position.left + "px")
            }, ie.prototype.showTip = function() {
                this.$tip.css("display", "inline").attr("aria-hidden", "false")
            }, ie.prototype.hideTip = function() {
                this.$tip.hide().attr("aria-hidden", "true")
            }, ie.prototype.bindHandlers = function() {
                var e = this;
                this.$id.keydown(function(t) {
                    return e.handleKeyDown($(this), t)
                }), this.$id.mouseover(function(t) {
                    return e.handleMouseOver($(this), t)
                }), this.$id.mouseout(function(t) {
                    return e.handleMouseOut($(this), t)
                }), this.$id.focus(function(t) {
                    return e.handleFocus($(this), t)
                }), this.$id.blur(function(t) {
                    return e.handleBlur($(this), t)
                })
            }, ie.prototype.handleKeyDown = function(e, t) {
                return t.altKey || t.shiftKey || t.ctrlKey ? !0 : 27 == t.keyCode ? (this.hideTip(), this.dismissed = !0, t.stopPropagation(), !1) : !0
            }, ie.prototype.handleMouseOver = function(e, t) {
                return !1
            }, ie.prototype.handleMouseOut = function(e, t) {
                return (1 == this.dismissed || 0 == this.focus) && this.hideTip(), this.mouseover = !1, t.stopPropagation(), !1
            }, ie.prototype.handleFocus = function(e, t) {
                return this.showTip(), this.focus = !0, t.stopPropagation(), !1
            }, ie.prototype.handleBlur = function(e, t) {
                return 0 == this.mouseover && this.hideTip(), this.focus = !1, this.dismissed = !1, t.stopPropagation(), !1
            }, u = void 0, p = function(e, t) {
                var n = function(n, i) {
                    function r(t, i, r) {
                        e("#" + r, n).remove(), tipRef = document.createElement("div"), tipRef.id = r, tipRef.innerHTML = i, e(t).append(tipRef), e("#" + r, n).attr("class", "tooltip")
                    }
                    var o = this,
                        a = 0,
                        s = !0;
                    e("#contentStart", n).attr("role", "application"), this.init = function(t) {
                        var i = n.find(".tab-item");
                        this.clearTabOrder(i.toArray()), e(document).keydown(function(t) {
                            9 != t.which || s || (n.addClass("tabNav"), s = !0, o.refreshTabOrder(), e(".tooltip", n).css("opacity", "100"))
                        }), e(document).mousedown(function() {
                            s && (n.removeClass("tabNav"), s = !1, o.clearFocusRect(), e(".tooltip", n).css("opacity", "0"))
                        })
                    }, this.updateDesignLabel = function(e, t, n, i, r) {
                        var o = t || "";
                        o = o.replace("{0}", n), o = o.replace("{1}", i), o += r || "", e.text(o)
                    }, this.updateAriaLabel = function(t, n) {
                        e(t).attr("aria-label", n)
                    }, this.refreshTabOrder = function() {
                        var e = n.find(".tab-item");
                        this.setTabOrder(e.toArray())
                    }, this.addTooltip = function(e, t, n, i, o) {
                        e.attr("aria-describedby", n), r(e, t, n);
                        new ie(e, i, o)
                    }, this.onUploadPageOK = function() {
                        var t = e(".ul-error-box", n);
                        o.removeFromTabOrder(t)
                    }, this.onUploadPageErr = function() {
                        if (s) {
                            var t = e(".ul-error-box", n);
                            o.appendTabOrder(t), t.focus()
                        }
                    }, this.toggleTabOrder = function(e, t) {
                        var n;
                        t ? (n = e.attr("tabindex"), e.attr("tabindex", "-1"), e.attr("saved-tabindex", n)) : (n = e.attr("saved-tabindex"), e.attr("tabindex", n))
                    }, this.onTextCoverageIn = function(t) {
                        var i = e("#card-coverage-message", n);
                        o.removeFromTabOrder(i)
                    }, this.onTextCoverageOut = function(t) {
                        var i = e("#card-coverage-message", n);
                        "-1" == i.attr("tabindex") && (o.appendTabOrder(i), i.focus())
                    }, this.onCardCoverageOut = function(t) {
                        var i = e("#center-button", n);
                        i.attr("title", "Your design no longer covers the card completely, press Enter to reset"), i.attr("tabindex", "0"), i.focus()
                    }, this.onCardCoverageIn = function(t) {
                        var n = e("#center-button");
                        n.attr("title", "Reset button")
                    }, this.onControlsEnable = function(i) {
                        $tp = e("#tp1", n), i ? $tp.attr("aria-label", language.getText("SRT_skipControls", t.get("languageData"))) : $tp.attr("aria-label", language.getText("SRT_disabled", t.get("languageData")))
                    }, this.onGalleryLoaded = function(e) {
                        var t = n.find(".tab-item").toArray();
                        o.setTabOrder(t)
                    }, this.clearAllTabindexes = function(t) {
                        var n = e(".tab-item", t).toArray();
                        o.clearTabOrder(n)
                    }, this.clearTabOrder = function(t) {
                        t.forEach(function(t) {
                            e(t).attr("tabindex", "-1")
                        })
                    }, this.getTabNav = function() {
                        return s
                    }, this.setTabOrder = function(t) {
                        s && (a = 0, t.forEach(function(t) {
                            e(t).attr("tabindex", a), e(t).addClass("focusItem")
                        }))
                    }, this.insertItemAt = function(t, n) {
                        n = 0, $item = e(t), $item.attr("tabindex", n), $item.addClass("tab-item focusItem")
                    }, this.appendTabOrder = function(t) {
                        a = 0, $item = e(t), $item.attr("tabindex", a), $item.addClass("tab-item focusItem")
                    }, this.removeFromTabOrder = function(t) {
                        $item = e(t), $item.attr("tabindex", "-1"), $item.removeClass("tab-item focusItem")
                    }, this.clearFocusRect = function() {
                        var t = n.find(".focusItem"),
                            i = t.toArray();
                        i.forEach(function(t) {
                            e(t).removeClass("focusItem")
                        })
                    }
                };
                return n
            }(r, l), ! function(e, t, n, i) {
                var r = {
                        verticalScrolling: !0,
                        horizontalScrolling: !1,
                        verticalScrollerSide: "right",
                        showOnHover: !1,
                        scrollIncrement: 20,
                        minScrollbarLength: 40,
                        pollChanges: !0,
                        drawCorner: !0,
                        drawScrollButtons: !1,
                        clickTrackToScroll: !0,
                        easingDuration: 500,
                        propagateWheelEvent: !0,
                        verticalTrackClass: "vertical-track",
                        horizontalTrackClass: "horizontal-track",
                        horizontalHandleClass: "horizontal-handle",
                        verticalHandleClass: "vertical-handle",
                        scrollUpButtonClass: "scroll-up-btn",
                        scrollDownButtonClass: "scroll-down-btn",
                        scrollLeftButtonClass: "scroll-left-btn",
                        scrollRightButtonClass: "scroll-right-btn",
                        cornerClass: "scrollbar-corner",
                        zIndex: 1,
                        addPaddingToPane: !0,
                        horizontalHandleHTML: '<div class="left"></div><div class="right"></div>',
                        verticalHandleHTML: '<div class="top"></div><div class="bottom"></div>'
                    },
                    o = function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                    },
                    a = t.requestAnimationFrame || t.mozRequestAnimationFrame || t.webkitRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(e) {
                        setTimeout(e, 17)
                    },
                    s = function(t, n) {
                        var i = e(t).css(n),
                            r = /^-?\d+/.exec(i);
                        return r ? +r[0] : 0
                    },
                    l = function(e) {
                        var t, n, i = {
                                width: "5px",
                                height: "1px",
                                overflow: "hidden",
                                padding: "8px 0",
                                visibility: "hidden",
                                whiteSpace: "pre-line",
                                font: "10px/1 serif"
                            },
                            r = document.createElement(e),
                            o = document.createTextNode("a\na");
                        for (n in i) r.style[n] = i[n];
                        return r.appendChild(o), document.body.appendChild(r), t = r.scrollHeight < 28, document.body.removeChild(r), t
                    },
                    d = .5 * Math.PI,
                    c = 10 * Math.log(2),
                    u = function(e, t, n) {
                        var i = d / t,
                            r = e * i;
                        return Math.round(r * Math.cos(i * n))
                    },
                    p = function(e, t, n) {
                        return Math.round(e * c * Math.pow(2, -10 * n / t + 1) / t)
                    },
                    h = function(e, t, n, i) {
                        return 2 * n / Math.PI * Math.asin((i - e) / t)
                    },
                    g = function(t) {
                        var n = e(this).data("enscroll"),
                            i = this,
                            r = n.settings,
                            o = function() {
                                var t = e(this).data("enscroll"),
                                    n = t.settings;
                                t && n.showOnHover && (n.verticalScrolling && e(t.verticalTrackWrapper).is(":visible") && e(t.verticalTrackWrapper).stop().fadeTo(275, 0), n.horizontalScrolling && e(t.horizontalTrackWrapper).is(":visible") && e(t.horizontalTrackWrapper).stop().fadeTo(275, 0), t._fadeTimer = null)
                            };
                        n && r.showOnHover && (n._fadeTimer ? clearTimeout(n._fadeTimer) : (r.verticalScrolling && e(n.verticalTrackWrapper).is(":visible") && e(n.verticalTrackWrapper).stop().fadeTo(275, 1), r.horizontalScrolling && e(n.horizontalTrackWrapper).is(":visible") && e(n.horizontalTrackWrapper).stop().fadeTo(275, 1)), t !== !1 && (n._fadeTimer = setTimeout(function() {
                            o.call(i)
                        }, 1750)))
                    },
                    f = function(t, n) {
                        var i = e(t),
                            r = i.data("enscroll"),
                            o = i.scrollTop();
                        r && r.settings.verticalScrolling && (i.scrollTop(o + n), r.settings.showOnHover && g.call(t))
                    },
                    m = function(t, n) {
                        var i = e(t),
                            r = i.data("enscroll"),
                            o = i.scrollLeft();
                        r && r.settings.horizontalScrolling && (i.scrollLeft(o + n), r.settings.showOnHover && g.call(t))
                    },
                    v = function(t) {
                        if (1 === t.which) {
                            var i, r, o, s, l, d, c, u, p, h = t.data.pane,
                                f = e(h),
                                m = f.data("enscroll"),
                                v = !0,
                                b = function() {
                                    v && (o !== s && (m._scrollingY || (m._scrollingY = !0, m._startY = f.scrollTop(), a(function() {
                                        y(f)
                                    })), r.style.top = o + "px", m._endY = o * p / u, s = o), a(b), m.settings.showOnHover && g.call(h))
                                },
                                w = function(e) {
                                    return v && (o = e.clientY - d - l, o = Math.min(0 > o ? 0 : o, u)), !1
                                },
                                x = function() {
                                    return v = !1, n.body.style.cursor = c, this.style.cursor = "", i.removeClass("dragging"), e(n.body).off("mousemove.enscroll.vertical").off("mouseup.enscroll.vertical"), e(n).off("mouseout.enscroll.vertical"), f.on("scroll.enscroll.pane", function(e) {
                                        S.call(this, e)
                                    }), !1
                                };
                            return i = e(m.verticalTrackWrapper).find(".enscroll-track"), r = i.children().first()[0], o = parseInt(r.style.top, 10), p = h.scrollHeight - (m._scrollHeightNoPadding ? e(h).height() : e(h).innerHeight()), l = t.clientY - e(r).offset().top, u = i.height() - e(r).outerHeight(), d = i.offset().top, f.off("scroll.enscroll.pane"), e(n.body).on({
                                "mousemove.enscroll.vertical": w,
                                "mouseup.enscroll.vertical": function(e) {
                                    x.call(r, e)
                                }
                            }), e(n).on("mouseout.enscroll.vertical", function(e) {
                                e.target.nodeName && "HTML" === e.target.nodeName.toUpperCase() && x.call(r, e)
                            }), i.hasClass("dragging") || (i.addClass("dragging"), c = e(n.body).css("cursor"), this.style.cursor = n.body.style.cursor = "ns-resize"), a(b), !1
                        }
                    },
                    b = function(t) {
                        if (1 === t.which) {
                            var i, r, o, s, l, d, c, u, p, h = t.data.pane,
                                f = e(h),
                                m = e(h).data("enscroll"),
                                v = !0,
                                b = function() {
                                    v && (o !== s && (m._scrollingX || (m._scrollingX = !0, m._startX = f.scrollLeft(), a(function() {
                                        y(f)
                                    })), r.style.left = o + "px", m._endX = o * l / p, s = o), a(b), m.settings.showOnHover && g.call(h))
                                },
                                w = function(e) {
                                    return v && (o = e.clientX - c - d, o = Math.min(0 > o ? 0 : o, p)), !1
                                },
                                x = function() {
                                    return v = !1, i.removeClass("dragging"), n.body.style.cursor = u, this.style.cursor = "", i.removeClass("dragging"), e(n.body).off("mousemove.enscroll.horizontal").off("mouseup.enscroll.horizontal"), e(n).off("mouseout.enscroll.horizontal"), f.on("scroll.enscroll.pane", function(e) {
                                        S.call(this, e)
                                    }), !1
                                };
                            return i = e(m.horizontalTrackWrapper).find(".enscroll-track"), r = i.children().first()[0], o = parseInt(r.style.left, 10), l = h.scrollWidth - e(h).innerWidth(), d = t.clientX - e(r).offset().left, p = i.width() - e(r).outerWidth(), c = i.offset().left, f.off("scroll.enscroll.pane"), e(n.body).on({
                                "mousemove.enscroll.horizontal": w,
                                "mouseup.enscroll.horizontal": function(e) {
                                    x.call(r, e)
                                }
                            }), e(n).on("mouseout.enscroll.horizontal", function(e) {
                                e.target.nodeName && "HTML" === e.target.nodeName.toUpperCase() && x.call(r, e)
                            }), i.hasClass("dragging") || (i.addClass("dragging"), u = e("body").css("cursor"), this.style.cursor = n.body.style.cursor = "ew-resize"), a(b), !1
                        }
                    },
                    y = function(e) {
                        var t, n, i, r = e.data("enscroll"),
                            o = r._duration;
                        r._scrollingX === !0 && (t = r._endX - r._startX, 0 === t ? r._scrollingX = !1 : (n = e.scrollLeft(), i = h(r._startX, t, o, n), t > 0 ? n >= r._endX || n < r._startX ? r._scrollingX = !1 : (m(e, Math.max(1, u(t, o, i))), a(function() {
                            y(e)
                        })) : n <= r._endX || n > r._startX ? r._scrollingX = !1 : (m(e, Math.min(-1, u(t, o, i))), a(function() {
                            y(e)
                        })))), r._scrollingY === !0 && (t = r._endY - r._startY, 0 === t ? r._scrollingY = !1 : (n = e.scrollTop(), i = h(r._startY, t, o, n), t > 0 ? n >= r._endY || n < r._startY ? r._scrollingY = !1 : (f(e, Math.max(1, u(t, o, i))), a(function() {
                            y(e)
                        })) : n <= r._endY || n > r._startY ? r._scrollingY = !1 : (f(e, Math.min(-1, u(t, o, i))), a(function() {
                            y(e)
                        }))))
                    },
                    w = function(e, t) {
                        var n = e.data("enscroll"),
                            i = e.scrollLeft(),
                            r = e[0].scrollWidth - e.innerWidth();
                        return !n.settings.horizontalScrolling || n._scrollingY ? !1 : (n._scrollingX || (n._scrollingX = !0, n._startX = i, n._endX = n._startX, a(function() {
                            y(e)
                        })), n._endX = t > 0 ? Math.min(i + t, r) : Math.max(0, i + t), 0 > t && i > 0 || t > 0 && r > i)
                    },
                    x = function(e, t) {
                        var n = e.data("enscroll"),
                            i = e.scrollTop(),
                            r = e[0].scrollHeight - (n._scrollHeightNoPadding ? e.height() : e.innerHeight());
                        return !n.settings.verticalScrolling || n._scrollingX ? !1 : (n._scrollingY || (n._scrollingY = !0, n._startY = i, n._endY = n._startY, a(function() {
                            y(e)
                        })), n._endY = t > 0 ? Math.min(i + t, r) : Math.max(0, i + t), 0 > t && i > 0 || t > 0 && r > i)
                    },
                    C = function(t) {
                        var n, i = e(this),
                            r = i.data("enscroll"),
                            a = r.settings.scrollIncrement,
                            s = "deltaX" in t ? -t.deltaX : "wheelDeltaX" in t ? t.wheelDeltaX : 0,
                            l = "deltaY" in t ? -t.deltaY : "wheelDeltaY" in t ? t.wheelDeltaY : "wheelDelta" in t ? t.wheelDelta : 0;
                        Math.abs(s) > Math.abs(l) && 0 !== s ? (n = (s > 0 ? -a : a) << 2, (w(i, n) || !r.settings.propagateWheelEvent) && o(t)) : 0 !== l && (n = (l > 0 ? -a : a) << 2, (x(i, n) || !r.settings.propagateWheelEvent) && o(t))
                    },
                    S = function() {
                        var t, n, i, r = e(this),
                            o = r.data("enscroll");
                        o && (o.settings.verticalScrolling && (n = e(o.verticalTrackWrapper).find(".enscroll-track")[0], t = n.firstChild, i = r.scrollTop() / (this.scrollHeight - (o._scrollHeightNoPadding ? r.height() : r.innerHeight())), i = isNaN(i) ? 0 : i, t.style.top = i * (e(n).height() - e(t).outerHeight()) + "px"), o.settings.horizontalScrolling && (n = e(o.horizontalTrackWrapper).find(".enscroll-track")[0], t = n.firstChild, i = r.scrollLeft() / (this.scrollWidth - r.innerWidth()), i = isNaN(i) ? 0 : i, t.style.left = i * (e(n).width() - e(t).innerWidth()) + "px"))
                    },
                    k = function(t) {
                        var n, i = e(this),
                            r = i.data("enscroll");
                        if (!/(input)|(select)|(textarea)/i.test(this.nodeName) && t.target === this && r) {
                            switch (n = r.settings.scrollIncrement, t.keyCode) {
                                case 32:
                                case 34:
                                    return x(i, i.height()), !1;
                                case 33:
                                    return x(i, -i.height()), !1;
                                case 35:
                                    return x(i, this.scrollHeight), !1;
                                case 36:
                                    return x(i, -this.scrollHeight), !1;
                                case 37:
                                    return w(i, -n), !1;
                                case 38:
                                    return x(i, -n), !1;
                                case 39:
                                    return w(i, n), !1;
                                case 40:
                                    return x(i, n), !1
                            }
                            return !0
                        }
                    },
                    E = function() {
                        var t = this,
                            i = e(t).data("enscroll").settings,
                            r = !0,
                            o = 0,
                            s = 0,
                            l = e(t).offset().top,
                            d = l + e(t).outerHeight(),
                            c = e(t).offset().left,
                            u = c + e(t).outerWidth(),
                            p = function(e) {
                                var t = e.pageX,
                                    n = e.pageY;
                                o = c > t ? t - c : t > u ? t - u : 0, s = l > n ? n - l : n > d ? n - d : 0
                            },
                            h = function() {
                                i.horizontalScrolling && o && m(t, parseInt(o / 4, 10)), i.verticalScrolling && s && f(t, parseInt(s / 4, 10)), r && a(h)
                            },
                            g = function() {
                                r = !1, e(n).off("mousemove.enscroll.pane").off("mouseup.enscroll.pane")
                            };
                        a(h), e(n).on({
                            "mousemove.enscroll.pane": p,
                            "mouseup.enscroll.pane": g
                        })
                    },
                    T = function(e) {
                        var t, n, r, s, l, d, c, u = this,
                            h = function(e) {
                                t = e.touches[0].clientX, n = e.touches[0].clientY, r || (r = n === l && t === s ? i : Math.abs(l - n) > Math.abs(s - t) ? "y" : "x"), o(e)
                            },
                            g = function() {
                                d && ("y" === r ? (f(u, l - n), c = l - n, l = n) : "x" === r && (m(u, s - t), c = s - t, s = t), a(g))
                            },
                            v = function() {
                                var e = 0,
                                    t = Math.abs(1.5 * c);
                                this.removeEventListener("touchmove", h, !1), this.removeEventListener("touchend", v, !1), d = !1, a(function n() {
                                    var i;
                                    e === t || d || (i = p(c, t, e), isNaN(i) || 0 === i || (e += 1, "y" === r ? f(u, i) : m(u, i), a(n)))
                                })
                            };
                        1 === e.touches.length && (s = e.touches[0].clientX, l = e.touches[0].clientY, d = !0, this.addEventListener("touchmove", h, !1), this.addEventListener("touchend", v, !1), a(g))
                    },
                    _ = {
                        reposition: function() {
                            return this.each(function() {
                                var t, n, i, r = e(this),
                                    o = r.data("enscroll"),
                                    a = function(e, t, n) {
                                        e.style.left = t + "px", e.style.top = n + "px"
                                    };
                                o && (i = r.position(), t = o.corner, o.settings.verticalScrolling && (n = o.verticalTrackWrapper, a(n, "right" === o.settings.verticalScrollerSide ? i.left + r.outerWidth() - e(n).width() - s(this, "border-right-width") : i.left + s(this, "border-left-width"), i.top + s(this, "border-top-width"))), o.settings.horizontalScrolling && (n = o.horizontalTrackWrapper, a(n, i.left + s(this, "border-left-width"), i.top + r.outerHeight() - e(n).height() - s(this, "border-bottom-width"))), t && a(t, i.left + r.outerWidth() - e(t).outerWidth() - s(this, "border-right-width"), i.top + r.outerHeight() - e(t).outerHeight() - s(this, "border-bottom-width")))
                            })
                        },
                        resize: function() {
                            return this.each(function() {
                                var t, n, i, r, o, a, s, l, d, c, u, p, h, g, f, m, v = e(this),
                                    b = v.data("enscroll");
                                return b ? (t = b.settings, void(v.is(":visible") ? (t.verticalScrolling && (r = b.verticalTrackWrapper, n = v.innerHeight(), o = n / this.scrollHeight, a = e(r).find(".enscroll-track")[0], d = e(r).find("." + t.scrollUpButtonClass), c = e(r).find("." + t.scrollDownButtonClass), l = t.horizontalScrolling ? n - e(b.horizontalTrackWrapper).find(".enscroll-track").outerHeight() : n, l -= e(a).outerHeight() - e(a).height() + d.outerHeight() + c.outerHeight(), h = a.firstChild, f = Math.max(o * l, t.minScrollbarLength), f -= e(h).outerHeight() - e(h).height(), r.style.display = "none", a.style.height = l + "px", h.style.height = f + "px", 1 > o && (o = v.scrollTop() / (this.scrollHeight - v.height()), h.style.top = o * (l - f) + "px", r.style.display = "block")), t.horizontalScrolling && (r = b.horizontalTrackWrapper, i = v.innerWidth(), o = i / this.scrollWidth, a = e(r).find(".enscroll-track")[0], u = e(r).find("." + t.scrollLeftButtonClass), p = e(r).find("." + t.scrollRightButtonClass), s = t.verticalScrolling ? i - e(b.verticalTrackWrapper).find(".enscroll-track").outerWidth() : i, s -= e(a).outerWidth() - e(a).width() + u.outerWidth() + p.outerWidth(), h = a.firstChild, g = Math.max(o * s, t.minScrollbarLength), g -= e(h).outerWidth() - e(h).width(), r.style.display = "none", a.style.width = s + "px", h.style.width = g + "px", 1 > o && (o = v.scrollLeft() / (this.scrollWidth - v.width()), h.style.left = o * (s - g) + "px", r.style.display = "block"), b._prybar && (m = b._prybar, this.removeChild(m), t.verticalScrolling && (m.style.width = this.scrollWidth + e(b.verticalTrackWrapper).find(".enscroll-track").outerWidth() + "px", this.appendChild(m)))), b.corner && (b.corner.style.display = b.verticalTrackWrapper && b.horizontalTrackWrapper && e(b.verticalTrackWrapper).is(":visible") && e(b.horizontalTrackWrapper).is(":visible") ? "" : "none")) : (t.verticalScrolling && (b.verticalTrackWrapper.style.display = "none"), t.horizontalScrolling && (b.horizontalTrackWrapper.style.display = "none"), b.corner && (b.corner.style.display = "none")))) : !0
                            })
                        },
                        startPolling: function() {
                            return this.each(function() {
                                var t, n = e(this).data("enscroll"),
                                    i = this,
                                    r = e(i),
                                    o = -1,
                                    a = -1,
                                    s = -1,
                                    l = -1,
                                    d = function() {
                                        if (n.settings.pollChanges) {
                                            var e = i.scrollWidth,
                                                c = i.scrollHeight,
                                                u = r.width(),
                                                p = r.height(),
                                                h = r.offset();
                                            (n.settings.verticalScrolling && (p !== a || c !== l) || n.settings.horizontalScrolling && (u !== o || e !== s)) && (s = e, l = c, _.resize.call(r)), (t.left !== h.left || t.top !== h.top || u !== o || p !== a) && (t = h, o = u, a = p, _.reposition.call(r)), setTimeout(d, 350)
                                        }
                                    };
                                n && (n.settings.pollChanges = !0, l = i.scrollHeight, s = i.scrollWidth, t = r.offset(), d())
                            })
                        },
                        stopPolling: function() {
                            return this.each(function() {
                                var t = e(this).data("enscroll");
                                t && (t.settings.pollChanges = !1)
                            })
                        },
                        destroy: function() {
                            return this.each(function() {
                                var n, i, r = e(this),
                                    o = r.data("enscroll");
                                o && (_.stopPolling.call(r), i = o._mouseScrollHandler, o.settings.verticalScrolling && (n = o.verticalTrackWrapper, e(n).remove(), n = null), o.settings.horizontalScrolling && (n = o.horizontalTrackWrapper, e(n).remove(), n = null), o._fadeTimer && clearTimeout(o._fadeTimer), o.corner && e(o.corner).remove(), o._prybar && o._prybar.parentNode && o._prybar.parentNode === this && e(o._prybar).remove(), this.setAttribute("style", o._style || ""), o._hadTabIndex || r.removeAttr("tabindex"), r.off("scroll.enscroll.pane").off("keydown.enscroll.pane").off("mouseenter.enscroll.pane").off("mousedown.enscroll.pane").data("enscroll", null), this.removeEventListener ? (this.removeEventListener("wheel", i, !1), this.removeEventListener("mousewheel", i, !1), this.removeEventListener("touchstart", T, !1)) : this.detachEvent && this.detachEvent("onmousewheel", i), e(t).off("resize.enscroll.window"))
                            })
                        }
                    };
                e.fn.enscroll = function(i) {
                    var o;
                    return _[i] ? _[i].call(this) : (o = e.extend({}, r, i), this.each(function() {
                        if (o.verticalScrolling || o.horizontalScrolling) {
                            var i, r, a, d, c, u, p, h, y, L, I, D, A, M, B, P, H, N, z = e(this),
                                O = this,
                                U = z.attr("style"),
                                $ = !0,
                                R = {
                                    position: "absolute",
                                    "z-index": o.zIndex,
                                    margin: 0,
                                    padding: 0
                                },
                                F = function(e) {
                                    C.call(O, e)
                                },
                                G = function(t, n) {
                                    "string" == typeof n ? e(t).html(n) : t.appendChild(n)
                                };
                            if (o.verticalScrolling) {
                                r = n.createElement("div"), d = n.createElement("div"), u = n.createElement("a"), e(d).css("position", "relative").addClass("enscroll-track").addClass(o.verticalTrackClass).appendTo(r), o.drawScrollButtons && (p = n.createElement("a"), h = n.createElement("a"), e(p).css({
                                    display: "block",
                                    "text-decoration": "none"
                                }).attr("href", "").html("&nbsp;").addClass(o.scrollUpButtonClass).on("click", function() {
                                    return f(O, -o.scrollIncrement), !1
                                }).insertBefore(d), e(h).css({
                                    display: "block",
                                    "text-decoration": "none"
                                }).attr("href", "").html("&nbsp;").on("click", function() {
                                    return f(O, o.scrollIncrement), !1
                                }).addClass(o.scrollDownButtonClass).appendTo(r)), o.clickTrackToScroll && e(d).on("click", function(t) {
                                    t.target === this && x(z, t.pageY > e(u).offset().top ? z.height() : -z.height())
                                }), e(u).css({
                                    position: "absolute",
                                    "z-index": 1
                                }).attr("href", "").addClass(o.verticalHandleClass).mousedown({
                                    pane: this
                                }, v).click(function() {
                                    return !1
                                }).appendTo(d), G(u, o.verticalHandleHTML), e(r).css(R).insertAfter(this), o.showOnHover && e(r).css("opacity", 0).on("mouseover.enscroll.vertical", function() {
                                    g.call(O, !1)
                                }).on("mouseout.enscroll.vertical", function() {
                                    g.call(O)
                                }), D = e(d).outerWidth(), o.addPaddingToPane && (N = "right" === o.verticalScrollerSide ? {
                                    "padding-right": s(this, "padding-right") + D + "px"
                                } : {
                                    "padding-left": s(this, "padding-left") + D + "px"
                                }, z.css(e.extend({
                                    width: z.width() - D + "px"
                                }, N)));
                                try {
                                    P = parseInt(z.css("outline-width"), 10), 0 !== P && !isNaN(P) || "none" !== z.css("outline-style") || z.css("outline", "none")
                                } catch (j) {
                                    z.css("outline", "none")
                                }
                            }
                            o.horizontalScrolling && (i = n.createElement("div"), a = n.createElement("div"), c = n.createElement("a"), e(a).css({
                                position: "relative",
                                "z-index": 1
                            }).addClass("enscroll-track").addClass(o.horizontalTrackClass).appendTo(i), o.drawScrollButtons && (y = n.createElement("a"), L = n.createElement("a"), e(y).css("display", "block").attr("href", "").on("click", function() {
                                return m(O, -o.scrollIncrement), !1
                            }).addClass(o.scrollLeftButtonClass).insertBefore(a), e(L).css("display", "block").attr("href", "").on("click", function() {
                                return m(O, o.scrollIncrement), !1
                            }).addClass(o.scrollRightButtonClass).appendTo(i)), o.clickTrackToScroll && e(a).on("click", function(t) {
                                t.target === this && w(z, t.pageX > e(c).offset().left ? z.width() : -z.width())
                            }), e(c).css({
                                position: "absolute",
                                "z-index": 1
                            }).attr("href", "").addClass(o.horizontalHandleClass).click(function() {
                                return !1
                            }).mousedown({
                                pane: this
                            }, b).appendTo(a), G(c, o.horizontalHandleHTML), e(i).css(R).insertAfter(this), o.showOnHover && e(i).css("opacity", 0).on("mouseover.enscroll.horizontal", function() {
                                g.call(O, !1)
                            }).on("mouseout.enscroll.horizontal", function() {
                                g.call(O)
                            }), I = e(a).outerHeight(), o.addPaddingToPane && z.css({
                                height: z.height() - I + "px",
                                "padding-bottom": parseInt(z.css("padding-bottom"), 10) + I + "px"
                            }), o.verticalScrolling && (H = document.createElement("div"), e(H).css({
                                width: "1px",
                                height: "1px",
                                visibility: "hidden",
                                padding: 0,
                                margin: "-1px"
                            }).appendTo(this))), o.verticalScrolling && o.horizontalScrolling && o.drawCorner && (A = n.createElement("div"), e(A).addClass(o.cornerClass).css(R).insertAfter(this)), B = z.attr("tabindex"), B || (z.attr("tabindex", 0), $ = !1);
                            try {
                                M = z.css("outline"), (!M || M.length < 1) && z.css("outline", "none")
                            } catch (j) {
                                z.css("outline", "none")
                            }
                            z.on({
                                "scroll.enscroll.pane": function(e) {
                                    S.call(this, e)
                                },
                                "keydown.enscroll.pane": k,
                                "mousedown.enscroll.pane": E
                            }).css("overflow", "hidden").data("enscroll", {
                                settings: o,
                                horizontalTrackWrapper: i,
                                verticalTrackWrapper: r,
                                corner: A,
                                _prybar: H,
                                _mouseScrollHandler: F,
                                _hadTabIndex: $,
                                _style: U,
                                _scrollingX: !1,
                                _scrollingY: !1,
                                _startX: 0,
                                _startY: 0,
                                _endX: 0,
                                _endY: 0,
                                _duration: parseInt(o.easingDuration / 16.66666, 10),
                                _scrollHeightNoPadding: l(this.nodeName)
                            }), e(t).on("resize.enscroll.window", function() {
                                _.reposition.call(z)
                            }), o.showOnHover && z.on("mouseenter.enscroll.pane", function() {
                                g.call(this)
                            }), supportsPassive = !1;
                            try {
                                var W = Object.defineProperty({}, "passive", {
                                    get: function() {
                                        supportsPassive = {
                                            passive: !0
                                        }
                                    }
                                });
                                window.addEventListener("test", null, W)
                            } catch (r) {}
                            this.addEventListener ? ("onwheel" in this || "WheelEvent" in t && navigator.userAgent.toLowerCase().indexOf("msie") >= 0 ? this.addEventListener("wheel", F, supportsPassive) : "onmousewheel" in this && this.addEventListener("mousewheel", F, supportsPassive), this.addEventListener("touchstart", T, supportsPassive)) : this.attachEvent && this.attachEvent("onmousewheel", F, supportsPassive), o.pollChanges && _.startPolling.call(z), _.resize.call(z), _.reposition.call(z)
                        }
                    }))
                }
            }(jQuery, window, document), h = void 0,
            function(e, t) {
                function n(t, n) {
                    var r, o, a, s = t.nodeName.toLowerCase();
                    return "area" === s ? (r = t.parentNode, o = r.name, t.href && o && "map" === r.nodeName.toLowerCase() ? (a = e("img[usemap=#" + o + "]")[0], !!a && i(a)) : !1) : (/input|select|textarea|button|object/.test(s) ? !t.disabled : "a" === s ? t.href || n : n) && i(t)
                }

                function i(t) {
                    return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
                        return "hidden" === e.css(this, "visibility")
                    }).length
                }
                var r = 0,
                    o = /^ui-id-\d+$/;
                e.ui = e.ui || {}, e.extend(e.ui, {
                    version: "1.10.3",
                    keyCode: {
                        BACKSPACE: 8,
                        COMMA: 188,
                        DELETE: 46,
                        DOWN: 40,
                        END: 35,
                        ENTER: 13,
                        ESCAPE: 27,
                        HOME: 36,
                        LEFT: 37,
                        NUMPAD_ADD: 107,
                        NUMPAD_DECIMAL: 110,
                        NUMPAD_DIVIDE: 111,
                        NUMPAD_ENTER: 108,
                        NUMPAD_MULTIPLY: 106,
                        NUMPAD_SUBTRACT: 109,
                        PAGE_DOWN: 34,
                        PAGE_UP: 33,
                        PERIOD: 190,
                        RIGHT: 39,
                        SPACE: 32,
                        TAB: 9,
                        UP: 38
                    }
                }), e.fn.extend({
                    focus: function(t) {
                        return function(n, i) {
                            return "number" == typeof n ? this.each(function() {
                                var t = this;
                                setTimeout(function() {
                                    e(t).focus(), i && i.call(t)
                                }, n)
                            }) : t.apply(this, arguments)
                        }
                    }(e.fn.focus),
                    scrollParent: function() {
                        var t;
                        return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                            return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                        }).eq(0) : this.parents().filter(function() {
                            return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
                        }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
                    },
                    zIndex: function(n) {
                        if (n !== t) return this.css("zIndex", n);
                        if (this.length)
                            for (var i, r, o = e(this[0]); o.length && o[0] !== document;) {
                                if (i = o.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (r = parseInt(o.css("zIndex"), 10), !isNaN(r) && 0 !== r)) return r;
                                o = o.parent()
                            }
                        return 0
                    },
                    uniqueId: function() {
                        return this.each(function() {
                            this.id || (this.id = "ui-id-" + ++r)
                        })
                    },
                    removeUniqueId: function() {
                        return this.each(function() {
                            o.test(this.id) && e(this).removeAttr("id")
                        })
                    }
                }), e.extend(e.expr[":"], {
                    data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
                        return function(n) {
                            return !!e.data(n, t)
                        }
                    }) : function(t, n, i) {
                        return !!e.data(t, i[3])
                    },
                    focusable: function(t) {
                        return n(t, !isNaN(e.attr(t, "tabindex")))
                    },
                    tabbable: function(t) {
                        var i = e.attr(t, "tabindex"),
                            r = isNaN(i);
                        return (r || i >= 0) && n(t, !r)
                    }
                }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(n, i) {
                    function r(t, n, i, r) {
                        return e.each(o, function() {
                            n -= parseFloat(e.css(t, "padding" + this)) || 0, i && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), r && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
                        }), n
                    }
                    var o = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                        a = i.toLowerCase(),
                        s = {
                            innerWidth: e.fn.innerWidth,
                            innerHeight: e.fn.innerHeight,
                            outerWidth: e.fn.outerWidth,
                            outerHeight: e.fn.outerHeight
                        };
                    e.fn["inner" + i] = function(n) {
                        return n === t ? s["inner" + i].call(this) : this.each(function() {
                            e(this).css(a, r(this, n) + "px")
                        })
                    }, e.fn["outer" + i] = function(t, n) {
                        return "number" != typeof t ? s["outer" + i].call(this, t) : this.each(function() {
                            e(this).css(a, r(this, t, !0, n) + "px")
                        })
                    }
                }), e.fn.addBack || (e.fn.addBack = function(e) {
                    return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
                    return function(n) {
                        return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
                    }
                }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
                    disableSelection: function() {
                        return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                            e.preventDefault()
                        })
                    },
                    enableSelection: function() {
                        return this.unbind(".ui-disableSelection")
                    }
                }), e.extend(e.ui, {
                    plugin: {
                        add: function(t, n, i) {
                            var r, o = e.ui[t].prototype;
                            for (r in i) o.plugins[r] = o.plugins[r] || [], o.plugins[r].push([n, i[r]])
                        },
                        call: function(e, t, n) {
                            var i, r = e.plugins[t];
                            if (r && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                                for (i = 0; r.length > i; i++) e.options[r[i][0]] && r[i][1].apply(e.element, n)
                        }
                    },
                    hasScroll: function(t, n) {
                        if ("hidden" === e(t).css("overflow")) return !1;
                        var i = n && "left" === n ? "scrollLeft" : "scrollTop",
                            r = !1;
                        return t[i] > 0 ? !0 : (t[i] = 1, r = t[i] > 0, t[i] = 0, r)
                    }
                })
            }(jQuery),
            function(e, t) {
                var n = 0,
                    i = Array.prototype.slice,
                    r = e.cleanData;
                e.cleanData = function(t) {
                    for (var n, i = 0; null != (n = t[i]); i++) try {
                        e(n).triggerHandler("remove")
                    } catch (o) {}
                    r(t)
                }, e.widget = function(n, i, r) {
                    var o, a, s, l, d = {},
                        c = n.split(".")[0];
                    n = n.split(".")[1], o = c + "-" + n, r || (r = i, i = e.Widget), e.expr[":"][o.toLowerCase()] = function(t) {
                        return !!e.data(t, o)
                    }, e[c] = e[c] || {}, a = e[c][n], s = e[c][n] = function(e, n) {
                        return this._createWidget ? (arguments.length && this._createWidget(e, n), t) : new s(e, n)
                    }, e.extend(s, a, {
                        version: r.version,
                        _proto: e.extend({}, r),
                        _childConstructors: []
                    }), l = new i, l.options = e.widget.extend({}, l.options), e.each(r, function(n, r) {
                        return e.isFunction(r) ? (d[n] = function() {
                            var e = function() {
                                    return i.prototype[n].apply(this, arguments)
                                },
                                t = function(e) {
                                    return i.prototype[n].apply(this, e)
                                };
                            return function() {
                                var n, i = this._super,
                                    o = this._superApply;
                                return this._super = e, this._superApply = t, n = r.apply(this, arguments), this._super = i, this._superApply = o, n
                            }
                        }(), t) : (d[n] = r, t)
                    }), s.prototype = e.widget.extend(l, {
                        widgetEventPrefix: a ? l.widgetEventPrefix : n
                    }, d, {
                        constructor: s,
                        namespace: c,
                        widgetName: n,
                        widgetFullName: o
                    }), a ? (e.each(a._childConstructors, function(t, n) {
                        var i = n.prototype;
                        e.widget(i.namespace + "." + i.widgetName, s, n._proto)
                    }), delete a._childConstructors) : i._childConstructors.push(s), e.widget.bridge(n, s)
                }, e.widget.extend = function(n) {
                    for (var r, o, a = i.call(arguments, 1), s = 0, l = a.length; l > s; s++)
                        for (r in a[s]) o = a[s][r], a[s].hasOwnProperty(r) && o !== t && (n[r] = e.isPlainObject(o) ? e.isPlainObject(n[r]) ? e.widget.extend({}, n[r], o) : e.widget.extend({}, o) : o);
                    return n
                }, e.widget.bridge = function(n, r) {
                    var o = r.prototype.widgetFullName || n;
                    e.fn[n] = function(a) {
                        var s = "string" == typeof a,
                            l = i.call(arguments, 1),
                            d = this;
                        return a = !s && l.length ? e.widget.extend.apply(null, [a].concat(l)) : a, s ? this.each(function() {
                            var i, r = e.data(this, o);
                            return r ? e.isFunction(r[a]) && "_" !== a.charAt(0) ? (i = r[a].apply(r, l), i !== r && i !== t ? (d = i && i.jquery ? d.pushStack(i.get()) : i, !1) : t) : e.error("no such method '" + a + "' for " + n + " widget instance") : e.error("cannot call methods on " + n + " prior to initialization; attempted to call method '" + a + "'")
                        }) : this.each(function() {
                            var t = e.data(this, o);
                            t ? t.option(a || {})._init() : e.data(this, o, new r(a, this))
                        }), d
                    }
                }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
                    widgetName: "widget",
                    widgetEventPrefix: "",
                    defaultElement: "<div>",
                    options: {
                        disabled: !1,
                        create: null
                    },
                    _createWidget: function(t, i) {
                        i = e(i || this.defaultElement || this)[0], this.element = e(i), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), i !== this && (e.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                            remove: function(e) {
                                e.target === i && this.destroy()
                            }
                        }), this.document = e(i.style ? i.ownerDocument : i.document || i), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
                    },
                    _getCreateOptions: e.noop,
                    _getCreateEventData: e.noop,
                    _create: e.noop,
                    _init: e.noop,
                    destroy: function() {
                        this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
                    },
                    _destroy: e.noop,
                    widget: function() {
                        return this.element
                    },
                    option: function(n, i) {
                        var r, o, a, s = n;
                        if (0 === arguments.length) return e.widget.extend({}, this.options);
                        if ("string" == typeof n)
                            if (s = {}, r = n.split("."), n = r.shift(), r.length) {
                                for (o = s[n] = e.widget.extend({}, this.options[n]), a = 0; r.length - 1 > a; a++) o[r[a]] = o[r[a]] || {}, o = o[r[a]];
                                if (n = r.pop(), i === t) return o[n] === t ? null : o[n];
                                o[n] = i
                            } else {
                                if (i === t) return this.options[n] === t ? null : this.options[n];
                                s[n] = i
                            }
                        return this._setOptions(s), this
                    },
                    _setOptions: function(e) {
                        var t;
                        for (t in e) this._setOption(t, e[t]);
                        return this
                    },
                    _setOption: function(e, t) {
                        return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
                    },
                    enable: function() {
                        return this._setOption("disabled", !1)
                    },
                    disable: function() {
                        return this._setOption("disabled", !0)
                    },
                    _on: function(n, i, r) {
                        var o, a = this;
                        "boolean" != typeof n && (r = i, i = n, n = !1), r ? (i = o = e(i), this.bindings = this.bindings.add(i)) : (r = i, i = this.element, o = this.widget()), e.each(r, function(r, s) {
                            function l() {
                                return n || a.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof s ? a[s] : s).apply(a, arguments) : t
                            }
                            "string" != typeof s && (l.guid = s.guid = s.guid || l.guid || e.guid++);
                            var d = r.match(/^(\w+)\s*(.*)$/),
                                c = d[1] + a.eventNamespace,
                                u = d[2];
                            u ? o.delegate(u, c, l) : i.bind(c, l)
                        })
                    },
                    _off: function(e, t) {
                        t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
                    },
                    _delay: function(e, t) {
                        function n() {
                            return ("string" == typeof e ? i[e] : e).apply(i, arguments)
                        }
                        var i = this;
                        return setTimeout(n, t || 0)
                    },
                    _hoverable: function(t) {
                        this.hoverable = this.hoverable.add(t), this._on(t, {
                            mouseenter: function(t) {
                                e(t.currentTarget).addClass("ui-state-hover")
                            },
                            mouseleave: function(t) {
                                e(t.currentTarget).removeClass("ui-state-hover")
                            }
                        })
                    },
                    _focusable: function(t) {
                        this.focusable = this.focusable.add(t), this._on(t, {
                            focusin: function(t) {
                                e(t.currentTarget).addClass("ui-state-focus")
                            },
                            focusout: function(t) {
                                e(t.currentTarget).removeClass("ui-state-focus")
                            }
                        })
                    },
                    _trigger: function(t, n, i) {
                        var r, o, a = this.options[t];
                        if (i = i || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], o = n.originalEvent)
                            for (r in o) r in n || (n[r] = o[r]);
                        return this.element.trigger(n, i), !(e.isFunction(a) && a.apply(this.element[0], [n].concat(i)) === !1 || n.isDefaultPrevented())
                    }
                }, e.each({
                    show: "fadeIn",
                    hide: "fadeOut"
                }, function(t, n) {
                    e.Widget.prototype["_" + t] = function(i, r, o) {
                        "string" == typeof r && (r = {
                            effect: r
                        });
                        var a, s = r ? r === !0 || "number" == typeof r ? n : r.effect || n : t;
                        r = r || {}, "number" == typeof r && (r = {
                            duration: r
                        }), a = !e.isEmptyObject(r), r.complete = o, r.delay && i.delay(r.delay), a && e.effects && e.effects.effect[s] ? i[t](r) : s !== t && i[s] ? i[s](r.duration, r.easing, o) : i.queue(function(n) {
                            e(this)[t](), o && o.call(i[0]), n()
                        })
                    }
                })
            }(jQuery),
            function(e) {
                var t = !1;
                e(document).mouseup(function() {
                    t = !1
                }), e.widget("ui.mouse", {
                    version: "1.10.3",
                    options: {
                        cancel: "input,textarea,button,select,option",
                        distance: 1,
                        delay: 0
                    },
                    _mouseInit: function() {
                        var t = this;
                        this.element.bind("mousedown." + this.widgetName, function(e) {
                            return t._mouseDown(e)
                        }).bind("click." + this.widgetName, function(n) {
                            return !0 === e.data(n.target, t.widgetName + ".preventClickEvent") ? (e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1) : void 0
                        }), this.started = !1
                    },
                    _mouseDestroy: function() {
                        this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
                    },
                    _mouseDown: function(n) {
                        if (!t) {
                            this._mouseStarted && this._mouseUp(n), this._mouseDownEvent = n;
                            var i = this,
                                r = 1 === n.which,
                                o = "string" == typeof this.options.cancel && n.target.nodeName ? e(n.target).closest(this.options.cancel).length : !1;
                            return r && !o && this._mouseCapture(n) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                                i.mouseDelayMet = !0
                            }, this.options.delay)), this._mouseDistanceMet(n) && this._mouseDelayMet(n) && (this._mouseStarted = this._mouseStart(n) !== !1, !this._mouseStarted) ? (n.preventDefault(), !0) : (!0 === e.data(n.target, this.widgetName + ".preventClickEvent") && e.removeData(n.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                                return i._mouseMove(e)
                            }, this._mouseUpDelegate = function(e) {
                                return i._mouseUp(e)
                            }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), n.preventDefault(), t = !0, !0)) : !0
                        }
                    },
                    _mouseMove: function(t) {
                        return e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
                    },
                    _mouseUp: function(t) {
                        return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
                    },
                    _mouseDistanceMet: function(e) {
                        return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
                    },
                    _mouseDelayMet: function() {
                        return this.mouseDelayMet
                    },
                    _mouseStart: function() {},
                    _mouseDrag: function() {},
                    _mouseStop: function() {},
                    _mouseCapture: function() {
                        return !0
                    }
                })
            }(jQuery),
            function(e, t) {
                function n(e, t, n) {
                    return [parseFloat(e[0]) * (h.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (h.test(e[1]) ? n / 100 : 1)]
                }

                function i(t, n) {
                    return parseInt(e.css(t, n), 10) || 0
                }

                function r(t) {
                    var n = t[0];
                    return 9 === n.nodeType ? {
                        width: t.width(),
                        height: t.height(),
                        offset: {
                            top: 0,
                            left: 0
                        }
                    } : e.isWindow(n) ? {
                        width: t.width(),
                        height: t.height(),
                        offset: {
                            top: t.scrollTop(),
                            left: t.scrollLeft()
                        }
                    } : n.preventDefault ? {
                        width: 0,
                        height: 0,
                        offset: {
                            top: n.pageY,
                            left: n.pageX
                        }
                    } : {
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                        offset: t.offset()
                    }
                }
                e.ui = e.ui || {};
                var o, a = Math.max,
                    s = Math.abs,
                    l = Math.round,
                    d = /left|center|right/,
                    c = /top|center|bottom/,
                    u = /[\+\-]\d+(\.[\d]+)?%?/,
                    p = /^\w+/,
                    h = /%$/,
                    g = e.fn.position;
                e.position = {
                        scrollbarWidth: function() {
                            if (o !== t) return o;
                            var n, i, r = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                                a = r.children()[0];
                            return e("body").append(r), n = a.offsetWidth, r.css("overflow", "scroll"), i = a.offsetWidth, n === i && (i = r[0].clientWidth), r.remove(), o = n - i
                        },
                        getScrollInfo: function(t) {
                            var n = t.isWindow ? "" : t.element.css("overflow-x"),
                                i = t.isWindow ? "" : t.element.css("overflow-y"),
                                r = "scroll" === n || "auto" === n && t.width < t.element[0].scrollWidth,
                                o = "scroll" === i || "auto" === i && t.height < t.element[0].scrollHeight;
                            return {
                                width: o ? e.position.scrollbarWidth() : 0,
                                height: r ? e.position.scrollbarWidth() : 0
                            }
                        },
                        getWithinInfo: function(t) {
                            var n = e(t || window),
                                i = e.isWindow(n[0]);
                            return {
                                element: n,
                                isWindow: i,
                                offset: n.offset() || {
                                    left: 0,
                                    top: 0
                                },
                                scrollLeft: n.scrollLeft(),
                                scrollTop: n.scrollTop(),
                                width: i ? n.width() : n.outerWidth(),
                                height: i ? n.height() : n.outerHeight()
                            }
                        }
                    }, e.fn.position = function(t) {
                        if (!t || !t.of) return g.apply(this, arguments);
                        t = e.extend({}, t);
                        var o, h, f, m, v, b, y = e(t.of),
                            w = e.position.getWithinInfo(t.within),
                            x = e.position.getScrollInfo(w),
                            C = (t.collision || "flip").split(" "),
                            S = {};
                        return b = r(y), y[0].preventDefault && (t.at = "left top"), h = b.width, f = b.height, m = b.offset, v = e.extend({}, m), e.each(["my", "at"], function() {
                            var e, n, i = (t[this] || "").split(" ");
                            1 === i.length && (i = d.test(i[0]) ? i.concat(["center"]) : c.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = d.test(i[0]) ? i[0] : "center", i[1] = c.test(i[1]) ? i[1] : "center", e = u.exec(i[0]), n = u.exec(i[1]), S[this] = [e ? e[0] : 0, n ? n[0] : 0], t[this] = [p.exec(i[0])[0], p.exec(i[1])[0]]
                        }), 1 === C.length && (C[1] = C[0]), "right" === t.at[0] ? v.left += h : "center" === t.at[0] && (v.left += h / 2), "bottom" === t.at[1] ? v.top += f : "center" === t.at[1] && (v.top += f / 2), o = n(S.at, h, f), v.left += o[0], v.top += o[1], this.each(function() {
                            var r, d, c = e(this),
                                u = c.outerWidth(),
                                p = c.outerHeight(),
                                g = i(this, "marginLeft"),
                                b = i(this, "marginTop"),
                                k = u + g + i(this, "marginRight") + x.width,
                                E = p + b + i(this, "marginBottom") + x.height,
                                T = e.extend({}, v),
                                _ = n(S.my, c.outerWidth(), c.outerHeight());
                            "right" === t.my[0] ? T.left -= u : "center" === t.my[0] && (T.left -= u / 2), "bottom" === t.my[1] ? T.top -= p : "center" === t.my[1] && (T.top -= p / 2), T.left += _[0], T.top += _[1], e.support.offsetFractions || (T.left = l(T.left), T.top = l(T.top)), r = {
                                marginLeft: g,
                                marginTop: b
                            }, e.each(["left", "top"], function(n, i) {
                                e.ui.position[C[n]] && e.ui.position[C[n]][i](T, {
                                    targetWidth: h,
                                    targetHeight: f,
                                    elemWidth: u,
                                    elemHeight: p,
                                    collisionPosition: r,
                                    collisionWidth: k,
                                    collisionHeight: E,
                                    offset: [o[0] + _[0], o[1] + _[1]],
                                    my: t.my,
                                    at: t.at,
                                    within: w,
                                    elem: c
                                })
                            }), t.using && (d = function(e) {
                                var n = m.left - T.left,
                                    i = n + h - u,
                                    r = m.top - T.top,
                                    o = r + f - p,
                                    l = {
                                        target: {
                                            element: y,
                                            left: m.left,
                                            top: m.top,
                                            width: h,
                                            height: f
                                        },
                                        element: {
                                            element: c,
                                            left: T.left,
                                            top: T.top,
                                            width: u,
                                            height: p
                                        },
                                        horizontal: 0 > i ? "left" : n > 0 ? "right" : "center",
                                        vertical: 0 > o ? "top" : r > 0 ? "bottom" : "middle"
                                    };
                                u > h && h > s(n + i) && (l.horizontal = "center"), p > f && f > s(r + o) && (l.vertical = "middle"), l.important = a(s(n), s(i)) > a(s(r), s(o)) ? "horizontal" : "vertical", t.using.call(this, e, l)
                            }), c.offset(e.extend(T, {
                                using: d
                            }))
                        })
                    }, e.ui.position = {
                        fit: {
                            left: function(e, t) {
                                var n, i = t.within,
                                    r = i.isWindow ? i.scrollLeft : i.offset.left,
                                    o = i.width,
                                    s = e.left - t.collisionPosition.marginLeft,
                                    l = r - s,
                                    d = s + t.collisionWidth - o - r;
                                t.collisionWidth > o ? l > 0 && 0 >= d ? (n = e.left + l + t.collisionWidth - o - r, e.left += l - n) : e.left = d > 0 && 0 >= l ? r : l > d ? r + o - t.collisionWidth : r : l > 0 ? e.left += l : d > 0 ? e.left -= d : e.left = a(e.left - s, e.left)
                            },
                            top: function(e, t) {
                                var n, i = t.within,
                                    r = i.isWindow ? i.scrollTop : i.offset.top,
                                    o = t.within.height,
                                    s = e.top - t.collisionPosition.marginTop,
                                    l = r - s,
                                    d = s + t.collisionHeight - o - r;
                                t.collisionHeight > o ? l > 0 && 0 >= d ? (n = e.top + l + t.collisionHeight - o - r, e.top += l - n) : e.top = d > 0 && 0 >= l ? r : l > d ? r + o - t.collisionHeight : r : l > 0 ? e.top += l : d > 0 ? e.top -= d : e.top = a(e.top - s, e.top)
                            }
                        },
                        flip: {
                            left: function(e, t) {
                                var n, i, r = t.within,
                                    o = r.offset.left + r.scrollLeft,
                                    a = r.width,
                                    l = r.isWindow ? r.scrollLeft : r.offset.left,
                                    d = e.left - t.collisionPosition.marginLeft,
                                    c = d - l,
                                    u = d + t.collisionWidth - a - l,
                                    p = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                                    h = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                                    g = -2 * t.offset[0];
                                0 > c ? (n = e.left + p + h + g + t.collisionWidth - a - o, (0 > n || s(c) > n) && (e.left += p + h + g)) : u > 0 && (i = e.left - t.collisionPosition.marginLeft + p + h + g - l, (i > 0 || u > s(i)) && (e.left += p + h + g))
                            },
                            top: function(e, t) {
                                var n, i, r = t.within,
                                    o = r.offset.top + r.scrollTop,
                                    a = r.height,
                                    l = r.isWindow ? r.scrollTop : r.offset.top,
                                    d = e.top - t.collisionPosition.marginTop,
                                    c = d - l,
                                    u = d + t.collisionHeight - a - l,
                                    p = "top" === t.my[1],
                                    h = p ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                                    g = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                                    f = -2 * t.offset[1];
                                0 > c ? (i = e.top + h + g + f + t.collisionHeight - a - o, e.top + h + g + f > c && (0 > i || s(c) > i) && (e.top += h + g + f)) : u > 0 && (n = e.top - t.collisionPosition.marginTop + h + g + f - l, e.top + h + g + f > u && (n > 0 || u > s(n)) && (e.top += h + g + f))
                            }
                        },
                        flipfit: {
                            left: function() {
                                e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
                            },
                            top: function() {
                                e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
                            }
                        }
                    },
                    function() {
                        var t, n, i, r, o, a = document.getElementsByTagName("body")[0],
                            s = document.createElement("div");
                        t = document.createElement(a ? "div" : "body"), i = {
                            visibility: "hidden",
                            width: 0,
                            height: 0,
                            border: 0,
                            margin: 0,
                            background: "none"
                        }, a && e.extend(i, {
                            position: "absolute",
                            left: "-1000px",
                            top: "-1000px"
                        });
                        for (o in i) t.style[o] = i[o];
                        t.appendChild(s), n = a || document.documentElement, n.insertBefore(t, n.firstChild), s.style.cssText = "position: absolute; left: 10.7432222px;", r = e(s).offset().left, e.support.offsetFractions = r > 10 && 11 > r, t.innerHTML = "", n.removeChild(t)
                    }()
            }(jQuery),
            function(e) {
                function t(t, n) {
                    var i = (t.attr("aria-describedby") || "").split(/\s+/);
                    i.push(n), t.data("ui-tooltip-id", n).attr("aria-describedby", e.trim(i.join(" ")))
                }

                function n(t) {
                    var n = t.data("ui-tooltip-id"),
                        i = (t.attr("aria-describedby") || "").split(/\s+/),
                        r = e.inArray(n, i); - 1 !== r && i.splice(r, 1), t.removeData("ui-tooltip-id"), i = e.trim(i.join(" ")), i ? t.attr("aria-describedby", i) : t.removeAttr("aria-describedby")
                }
                var i = 0;
                e.widget("ui.tooltip", {
                    version: "1.10.3",
                    options: {
                        content: function() {
                            var t = e(this).attr("title") || "";
                            return e("<a>").text(t).html()
                        },
                        hide: !0,
                        items: "[title]:not([disabled])",
                        position: {
                            my: "left top+15",
                            at: "left bottom",
                            collision: "flipfit flip"
                        },
                        show: !0,
                        tooltipClass: null,
                        track: !1,
                        close: null,
                        open: null
                    },
                    _create: function() {
                        this._on({
                            mouseover: "open",
                            focusin: "open"
                        }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
                    },
                    _setOption: function(t, n) {
                        var i = this;
                        return "disabled" === t ? (this[n ? "_disable" : "_enable"](), void(this.options[t] = n)) : (this._super(t, n), void("content" === t && e.each(this.tooltips, function(e, t) {
                            i._updateContent(t)
                        })))
                    },
                    _disable: function() {
                        var t = this;
                        e.each(this.tooltips, function(n, i) {
                            var r = e.Event("blur");
                            r.target = r.currentTarget = i[0], t.close(r, !0)
                        }), this.element.find(this.options.items).addBack().each(function() {
                            var t = e(this);
                            t.is("[title]") && t.data("ui-tooltip-title", t.attr("title")).attr("title", "")
                        })
                    },
                    _enable: function() {
                        this.element.find(this.options.items).addBack().each(function() {
                            var t = e(this);
                            t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
                        })
                    },
                    open: function(t) {
                        var n = this,
                            i = e(t ? t.target : this.element).closest(this.options.items);
                        i.length && !i.data("ui-tooltip-id") && (i.attr("title") && i.data("ui-tooltip-title", i.attr("title")), i.data("ui-tooltip-open", !0), t && "mouseover" === t.type && i.parents().each(function() {
                            var t, i = e(this);
                            i.data("ui-tooltip-open") && (t = e.Event("blur"), t.target = t.currentTarget = this, n.close(t, !0)), i.attr("title") && (i.uniqueId(), n.parents[this.id] = {
                                element: this,
                                title: i.attr("title")
                            }, i.attr("title", ""))
                        }), this._updateContent(i, t))
                    },
                    _updateContent: function(e, t) {
                        var n, i = this.options.content,
                            r = this,
                            o = t ? t.type : null;
                        return "string" == typeof i ? this._open(t, e, i) : (n = i.call(e[0], function(n) {
                            e.data("ui-tooltip-open") && r._delay(function() {
                                t && (t.type = o), this._open(t, e, n)
                            })
                        }), void(n && this._open(t, e, n)))
                    },
                    _open: function(n, i, r) {
                        function o(e) {
                            d.of = e, a.is(":hidden") || a.position(d)
                        }
                        var a, s, l, d = e.extend({}, this.options.position);
                        if (r) {
                            if (a = this._find(i), a.length) return void a.find(".ui-tooltip-content").html(r);
                            i.is("[title]") && (n && "mouseover" === n.type ? i.attr("title", "") : i.removeAttr("title")), a = this._tooltip(i), t(i, a.attr("id")), a.find(".ui-tooltip-content").html(r), this.options.track && n && /^mouse/.test(n.type) ? (this._on(this.document, {
                                mousemove: o
                            }), o(n)) : a.position(e.extend({ of : i
                            }, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.show && this.options.show.delay && (l = this.delayedShow = setInterval(function() {
                                a.is(":visible") && (o(d.of), clearInterval(l))
                            }, e.fx.interval)), this._trigger("open", n, {
                                tooltip: a
                            }), s = {
                                keyup: function(t) {
                                    if (t.keyCode === e.ui.keyCode.ESCAPE) {
                                        var n = e.Event(t);
                                        n.currentTarget = i[0], this.close(n, !0)
                                    }
                                },
                                remove: function() {
                                    this._removeTooltip(a)
                                }
                            }, n && "mouseover" !== n.type || (s.mouseleave = "close"), n && "focusin" !== n.type || (s.focusout = "close"), this._on(!0, i, s)
                        }
                    },
                    close: function(t) {
                        var i = this,
                            r = e(t ? t.currentTarget : this.element),
                            o = this._find(r);
                        this.closing || (clearInterval(this.delayedShow), r.data("ui-tooltip-title") && r.attr("title", r.data("ui-tooltip-title")), n(r), o.stop(!0), this._hide(o, this.options.hide, function() {
                            i._removeTooltip(e(this))
                        }), r.removeData("ui-tooltip-open"), this._off(r, "mouseleave focusout keyup"), r[0] !== this.element[0] && this._off(r, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && e.each(this.parents, function(t, n) {
                            e(n.element).attr("title", n.title), delete i.parents[t]
                        }), this.closing = !0, this._trigger("close", t, {
                            tooltip: o
                        }), this.closing = !1)
                    },
                    _tooltip: function(t) {
                        var n = "ui-tooltip-" + i++,
                            r = e("<div>").attr({
                                id: n,
                                role: "tooltip"
                            }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
                        return e("<div>").addClass("ui-tooltip-content").appendTo(r), r.appendTo(this.document[0].body), this.tooltips[n] = t, r
                    },
                    _find: function(t) {
                        var n = t.data("ui-tooltip-id");
                        return n ? e("#" + n) : e()
                    },
                    _removeTooltip: function(e) {
                        e.remove(), delete this.tooltips[e.attr("id")]
                    },
                    _destroy: function() {
                        var t = this;
                        e.each(this.tooltips, function(n, i) {
                            var r = e.Event("blur");
                            r.target = r.currentTarget = i[0], t.close(r, !0), e("#" + n).remove(), i.data("ui-tooltip-title") && (i.attr("title", i.data("ui-tooltip-title")), i.removeData("ui-tooltip-title"))
                        })
                    }
                })
            }(jQuery), ie = void 0, g = void 0, f = void 0, m = function(e, t, n, i, r, o) {
                var a = t.View.extend({
                    initialize: function() {
                        this.render()
                    },
                    events: {},
                    styles: [],
                    render: function() {
                        _.templateSettings.variable = "aamd";
                        var e = {
                            resourceLocation: ServerSide.Configuration.Urls.Resources
                        };
                        return this.template = _.template(i, e), this.$el.html(this.template), this
                    },
                    update: function(t) {
                        function i() {
                            y = !1, t.isAccessible && u(), x.focus()
                        }

                        function a() {
                            P.SetOverlay(t.Designer.DesignTemplate.UrlSmall), P.imageLayer.setCardCoverage(Math.round(D.Top), Math.round(D.Left), Math.round(D.Bottom), Math.round(D.Right));
                            var i = ServerSide.Lib.Utils.SsgSerialiser.deserialise("customimageurl");
                            i ? t.uploadCustomImageUrl(i, function(e) {
                                t.setCustomImage(e.Id, e.Url, !1, e), ServerSide.Lib.Utils.SsgSerialiser.serialise("customimageurl", null), s()
                            }) : 0 === t.Layers.Length ? R.onfirstcategoryload = function(e) {
                                n.set("imgCat", e.Name), f.catLocked = e.Locked, t.setStockImage(e.Images[0].Id, e.Images[0].LargeImage, e.Locked || e.Images[0].Locked, e.Images[0]), s()
                            } : s(), P.imageLayer.addOnImageLoadListener(function() {
                                L = !0, b.previewButtonIsEnabled(P.imageLayer.testCardCoverage())
                            }), P.imageLayer.onGestureStart = function(t) {
                                e("#stage", f.$el).css("z-index", "2")
                            }, P.imageLayer.onGestureComplete = function(t) {
                                e("#stage", f.$el).css("z-index", "auto")
                            }
                        }

                        function s() {
                            N = !0, P.imageLayer.SetImage(t.Layers.Card.Url, t.Layers.Card.Reset), t.Layers.Card.Reset = !1, "Stock" === t.Layers.Card.Type && t.Layers.Card.Locked === !0 ? (P.imageLayer.disable(), M.style.display = "block", b.isEnabled(!1), B.style.opacity = "0", t.isAccessible && v.appendTabOrder(M)) : (P.imageLayer.enable(), M.style.display = "none", b.isEnabled(!0), B.style.opacity = "1");
                            for (prop in t.Layers) prop.indexOf("Clip") > -1 && t.Layers[prop].Url && P[prop] && (P[prop].SetImage(t.Layers[prop].Url), P[prop].disable(), P[prop].showGlow(!1));
                            if (l(), t.isAccessible) {
                                var i = _getLockedStr(t.Layers.Card.Locked, f.catLocked),
                                    r = e(".activeImage").find(".imgCont").first().attr("title");
                                n.set("imgTitle", r), f.imgLockStr = i, "Custom" === t.Layers.Card.Type && (n.set("imgCat", f.langData.myImages), n.set("imgTitle", f.langData.SRT_yourImage));
                                var o = f.langData.SRT_cardDesign;
                                v.updateDesignLabel(E, o, n.get("imgTitle"), n.get("imgCat"), i)
                            }
                            N = !1
                        }

                        function l() {
                            t.Designer.FacebookAppId && t.Designer.EnableFacebookButton && (e("#facebook-button", this.$el).show().click(function() {
                                var e = "https://www.facebook.com/dialog/oauth?client_id=" + t.Designer.FacebookAppId + "&response_type=token&scope=user_photos,public_profile,email&redirect_uri=" + window.location.href;
                                window.location.replace(e)
                            }), e("#selector1", this.$el).addClass("fb-mode"))
                        }

                        function d() {
                            v && (v.updateDesignLabel(E, f.langData.SRT_cardDesign, n.get("imgTitle"), n.get("imgCat"), f.imgLockStr), e(".gallery-group", f.$el).attr("href", "#prevPage"))
                        }

                        function c() {
                            u(), k.find("span").text(f.langData.SRT_panelClose), v.addTooltip(x, f.langData.SRT_wrench, "tp1", 15, 46), v.init(), R.onallimagesloaded = h, d()
                        }

                        function u() {
                            v.clearAllTabindexes(f.$el), g = f.$el.find(".tab-item").toArray(), v.init(), v.setTabOrder(g)
                        }

                        function p() {
                            v.clearAllTabindexes(f.$el);
                            var t = e("#slidingPanel", f.$el).find("a").toArray();
                            v.setTabOrder(t), k.focus()
                        }

                        function h() {
                            m = e("#galleryDropdown", f.$el), m.addClass("tab-item"), C.attr("tabindex", "-1"), g = f.$el.find(".tab-item").toArray(), t.isAccessible && (v.setTabOrder(g), v.addTooltip(S, f.langData.SRT_gallery, "tp2", 25, 12))
                        }
                        n.set("searchClicked", !1);
                        var g, f = this;
                        this.viewdata = n;
                        var m, v = new o(f.$el, f.langData),
                            b = new r(t, {
                                imageFolder: ServerSide.Configuration.Urls.Resources
                            }),
                            y = !1,
                            w = e("#slidingPanel", f.$el),
                            x = e("#wrench-button", f.$el),
                            C = e("#gallery1", f.$el),
                            S = e("#galleryGroup", f.$el),
                            k = e("#panelWrench", f.$el),
                            E = e("#cardDesign", f.$el),
                            T = t.Designer.TextOnImage.Enabled ? "visible" : "hidden",
                            _ = t.Designer.Logo && t.Designer.Logo.Enabled ? "visible" : "hidden";
                        e("#text-button", f.$el).css("visibility", T), e("#logo-button", f.$el).css("visibility", _), e("#clipart-button", f.$el).css("visibility", t.Designer.ClipArtEnabled === !0 ? "visible" : "hidden"), k.click(function() {
                            w.slideUp(), i()
                        }), x.click(function() {
                            w.slideToggle(), t.isAccessible && (y ? i() : (y = !0, p()))
                        }), w.mouseleave(function() {
                            w.hide()
                        }), b.previewButtonIsEnabled(!1);
                        var L = !1,
                            I = {},
                            D = t.Designer.Coverage.Image || t.Designer.Coverage,
                            A = document.getElementById("card-coverage-message"),
                            M = document.getElementById("locked-message"),
                            B = document.getElementById("imageContols"),
                            P = document.getElementById("canvas1"),
                            H = !1,
                            N = !1;
                        "v" === t.Designer.Orientation.Type && (I = {
                            orientation: "vertical"
                        }, A.className += " v", H = !0), Modernizr.touch && (I.isResponsive = !0, I.widthFactor = .9, I.heightFactor = {
                            ls: .35,
                            pt: .3
                        }, I.aamd = f.$el), t.setToolTips(), t.Designer.Orientation.ShowButton === !0 ? (e("#orientation-button", f.$el).show(), e("#orientation-button", f.$el).addClass("margin-buttons-right"), e("#tool-bar .control", f.$el).addClass("margin-control-small"), e("#tool-bar", f.$el).addClass("padding-left-small")) : (e("#upload-page-button", f.$el).addClass("margin-buttons-right"), e("#orientation-button", f.$el).hide()), e("#gallerySearch", f.$el).click(function() {
                            n.set("searchClicked", !0), t.redirect("Gallery")
                        });
                        var z = new ServerSide.Framework.UI.Templating.RefLangTemplater(t.Designer);
                        this.langData = n.get("languageData"), e("#design-tab-tooltip-marker", f.$el).tooltip({
                            content: z.getText("designHelp", n.get("languageData")),
                            items: "#design-tab-tooltip-marker",
                            position: {
                                my: "center-40 bottom-40",
                                at: "center top60",
                                of : "#tool-bar"
                            }
                        }), e("#gallery-tooltip-marker", f.$el).tooltip({
                            content: z.getText("galleryHelp", n.get("languageData")),
                            items: "#gallery-tooltip-marker",
                            position: {
                                my: "center bottom+75",
                                at: "center top",
                                of : "#selectorDiv"
                            }
                        }), "UploadOnly" !== n.get("mode") ? document.getElementById("view-all").onclick = function() {
                            t.redirect("Gallery")
                        } : e("#view-all", f.$el).hide(), e("#previewtab-button", f.$el).click(function() {
                            ServerSide.Lib.Utils.SsgSerialiser.serialise("conf", P.getConfiguration()), t.redirect("preview")
                        }), ServerSide.Components.Canvas.Controller(P, I);
                        var O = document.getElementById("gallery1"),
                            U = document.getElementById("selector1"),
                            $ = {
                                layer: t.Layers.Card,
                                isVertical: H,
                                nImages: H ? 12 : 9
                            },
                            R = new ServerSide.Components.Gallery.Adaptors.GallerySelectorUploads(O, U, t, $);
                        e(O, f.$el).enscroll({
                            horizontalScrolling: !0,
                            horizontalTrackClass: "enscrollTrackH bgCol_2",
                            horizontalHandleClass: "enscrollHandleH bgCol_1",
                            propagateWheelEvent: !1,
                            drawCorner: !1,
                            easingDuration: 100,
                            addPaddingToPane: !1
                        }), t.isAccessible && (e(".enscrollHandleH", f.$el).attr("tabindex", "-1"), e(".vertical-handle", f.$el).attr("tabindex", "-1"));
                        b.registerEventHandler("onmoveup", function() {
                            P.imageLayer.moveUp(2)
                        }), b.registerEventHandler("onmovedown", function() {
                            P.imageLayer.moveDown(2)
                        }), b.registerEventHandler("onmoveleft", function() {
                            P.imageLayer.moveLeft(2)
                        }), b.registerEventHandler("onmoveright", function() {
                            P.imageLayer.moveRight(2)
                        }), b.registerEventHandler("onmovecenter", function() {
                            P.imageLayer.reset()
                        }), b.registerEventHandler("onscaleup", function() {
                            P.imageLayer.scaleUp(2)
                        }), b.registerEventHandler("onscaledown", function() {
                            P.imageLayer.scaleDown(2)
                        }), b.registerEventHandler("onrotateright", function() {
                            P.imageLayer.snap90Right()
                        }), b.registerEventHandler("onorientationclick", function() {
                            t.redirectToProxyProduct()
                        }), b.registerEventHandler("onflip", function() {
                            P.imageLayer.flip()
                        }), b.registerEventHandler("ongalleryclick", function() {
                            ServerSide.Lib.Utils.SsgSerialiser.serialise("conf", P.getConfiguration()), t.redirect("Gallery")
                        }), b.registerEventHandler("onuploadclick", function() {
                            ServerSide.Lib.Utils.SsgSerialiser.serialise("conf", P.getConfiguration()), t.redirect("Upload")
                        }), b.registerEventHandler("onpreviewclick", function() {
                            ServerSide.Lib.Utils.SsgSerialiser.serialise("conf", P.getConfiguration()), t.redirect("Preview")
                        }), b.registerEventHandler("ontextClick", function() {
                            ServerSide.Lib.Utils.SsgSerialiser.serialise("conf", P.getConfiguration()), t.redirect("Text")
                        }), b.registerEventHandler("onclipartClick", function() {
                            ServerSide.Lib.Utils.SsgSerialiser.serialise("conf", P.getConfiguration()), t.redirect("clipart")
                        }), b.registerEventHandler("onlogoClick", function() {
                            ServerSide.Lib.Utils.SsgSerialiser.serialise("conf", P.getConfiguration()), t.redirect("Logo")
                        }), b.registerEventHandler("onmoveactive", function() {
                            P.imageLayer.setMoveMode()
                        }), b.registerEventHandler("onscaleactive", function() {
                            P.imageLayer.setScaleMode()
                        }), b.registerEventHandler("onrotateactive", function() {
                            P.imageLayer.setRotateMode()
                        }), P.imageLayer.onCardCoverageChange = function(n) {
                            var i = t.Designer.Coverage.Image.Type;
                            "Ignore" !== i && A && (A.style.display = n ? "none" : "block"), L && b.previewButtonIsEnabled("Error" === t.Designer.Coverage.Image.Type ? n : !0);
                            var r = n ? "block" : "none";
                            e("#image-spinner", f.$el).css("display", r), $previewTabBtn = e("#previewtab-button", f.$el), n ? ($previewTabBtn.removeClass("disabled"), t.isAccessible && (v.onCardCoverageIn(), v.toggleTabOrder($previewTabBtn, !1), $previewTabBtn.addClass("tab-item"))) : "Error" === i && ($previewTabBtn.addClass("disabled"), t.isAccessible && !N && (v.onCardCoverageOut(), v.toggleTabOrder($previewTabBtn, !0), $previewTabBtn.removeClass("tab-item"))), t.isAccessible && v.refreshTabOrder()
                        };
                        _getLockedStr = function(e, t) {
                            return e || t ? f.langData.SRT_locked : ""
                        }, P.loaded ? (a(), e("#startup-spinner", f.$el).hide(), e("#layer0", f.$el).prepend(e("#image-spinner", f.$el))) : P.oncontrollerload = a, R.onimagechange = function(e, n, i) {
                            b.previewButtonIsEnabled(!1), L = !1;
                            var r = e.childNodes[0].data;
                            R.setActiveImage(r.Id);
                            var o = "undefined" != typeof r.Url && -1 !== r.Url.indexOf("Uploads");
                            o ? t.setCustomImage(r.Id, r.Url, !1) : t.setStockImage(r.Id, r.LargeImage, i.Locked || r.Locked, r), s(), P.imageLayer.reset()
                        };
                        var v = new o(f.$el, f.langData);
                        t.isAccessible && (e("#tp1", f.$el).length ? d() : c()), S.click(function() {
                            m.focus()
                        })
                    }
                });
                return a
            }(r, a, l, d, c, p), v = '    <div id="breadcrumbBar" class="bgCol_2">\r\n        <div class="bc-section bgCol_1" id="designStep"></div>\r\n        <div id="chevron1" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron2.svg" ></div>\r\n        <div class="bc-section bgCol_2" id="previewStep"></div>\r\n        <div id="chevron2" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron_inactive.svg" ></div>\r\n        <div class="bc-section bgCol_2" id="dataCapStep"></div>\r\n\r\n        <div id="topBarControls">           \r\n            <a id="fullscreen-button" title="Full screen on/off" class="tb-item hint" >\r\n                <img  class="svg vCentre" src="<%= aamd.resourceLocation %>fg_fullscreen.svg" ><span ref="fullscr"></span>\r\n            </a>\r\n<!--             <a id="help"       class="tb-item" ><img  class="svg centre" src="<%= aamd.resourceLocation %>fg_help.svg" ></a> -->\r\n        </div>\r\n    </div>\r\n\r\n    <a id="previewtab-button" class="preview-nav nav-button hint" ><img class="svg" src="<%= aamd.resourceLocation %>fg_next.svg" ></a> \r\n\r\n\r\n    <div id="content">\r\n        <div id="text-designer">\r\n            <div class="ssg-canvas" id="canvas1">\r\n            </div>\r\n            <div class=\'error-box\' id=\'card-coverage-message\' ref="errorTextOvershoot"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <div id="textContentBottom" class="evenShadow">\r\n        <a class="back-button-div ssg-button hint borderCol_1"  id="back-button" disabled="disabled">\r\n            <img id="view-all-button" class="svg centre" src="<%= aamd.resourceLocation %>fg_chevron_down.svg" >\r\n            <span ref="galleryBack"></span>\r\n        </a>\r\n\r\n       <!-- <div id="textPane"></div> -->\r\n\r\n        <div id="styleContainer">\r\n            <div id="Font" class="hint">\r\n                <select id="drop" class="outlineCol_1" name="Fonts">\r\n                    <option value="1">Arial</option>\r\n                    <option value="3">Courier New</option>\r\n                    <option value="4">Georgia</option>\r\n                    <option value="2">Times New Roman</option>\r\n                    <option value="5">Verdana</option>\r\n                </select>\r\n                <span ref="font"></span>\r\n            </div>\r\n            <div id="textInput" class="hint">\r\n                <div   class="edit-icon"><img class="svg" src="<%= aamd.resourceLocation %>fg_edit.svg" ></div>\r\n                <input type="text" class="text-entry outlineCol_1" id=\'textEntry1\'>\r\n                <input type="text" class="text-entry outlineCol_1" id=\'textEntry2\'>\r\n                <span ref="textEntry"></span>\r\n            </div>\r\n       \r\n            <div id="buttons">\r\n                <div id="size" class="style-button bgCol_1 hint">\r\n                   <input type="image" src="<%= aamd.resourceLocation %>/fg_ensmall.svg" class="thin-button bgCol_1" name="size-minus" id="size-minus-button" />\r\n                   <input type="image" src="<%= aamd.resourceLocation %>/fg_enlarge.svg" class="thin-button bgCol_1" name="size-plus" id="size-plus-button" />\r\n                    <span ref="textSize"></span>\r\n                </div>\r\n                <div class="style-button bgCol_1 hint">\r\n                    <input type="image" src="<%= aamd.resourceLocation %>/fg_bold.svg" class= "fat-button bgCol_1" name="style-bold" id="style-bold"><span ref="textBold"></span>\r\n                </div>\r\n                <div class="style-button bgCol_1 hint">\r\n                    <input type="image" src="<%= aamd.resourceLocation %>/fg_shadow.svg" class= "fat-button bgCol_1" name="style-d" id="style-d"><span ref="textShadow"></span>\r\n                </div>\r\n                <div class="style-button bgCol_1 hint">\r\n                    <input type="image" src="<%= aamd.resourceLocation %>/fg_italic.svg" class= "fat-button bgCol_1" name="style-italic" id="style-italic"><span ref="textItalic"></span>\r\n                </div>\r\n                <div class="style-button bgCol_1 hint">\r\n                    <input type="image" src="<%= aamd.resourceLocation %>/fg_text_left.svg" class= "fat-button bgCol_1" name="align-left" id="align-left"><span ref="alignL"></span>\r\n                </div>\r\n                <div class="style-button bgCol_1 hint">\r\n                    <input type="image" src="<%= aamd.resourceLocation %>/fg_text_centre.svg" class= "fat-button bgCol_1" name="align-center" id="align-center"><span ref="alignC"></span>\r\n                </div>\r\n                <div class="style-button bgCol_1 hint">\r\n                    <input type="image" src="<%= aamd.resourceLocation %>/fg_text_right.svg" class= "fat-button bgCol_1" name="align-right" id="align-right"><span ref="alignR"></span>\r\n                </div>\r\n                <div class="style-button bgCol_1 hint">\r\n                    <input type="image" src="<%= aamd.resourceLocation %>/fg_text_colour.svg" class= "fat-button bgCol_1" name="colours" id="colours"><span ref="textColour"></span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div id="colourPanel" class="borderCol_1">\r\n            <div id="colourButtons">\r\n                <!-- <label> Color: </label> -->\r\n                <div class="color" style="background-color:#000000"> </div>\r\n                <div class="color outlined" style="background-color:#FFFFFF"> </div>\r\n                <div class="color" style="background-color:#FF0000"> </div>\r\n                <div class="color" style="background-color:#FFA500"> </div>\r\n                <div class="color" style="background-color:#F00000"> </div>\r\n                <div class="color" style="background-color:#FFC0CB"> </div>\r\n                <div class="color" style="background-color:#800080"> </div>\r\n                <div class="color" style="background-color:#000080"> </div>\r\n                <div class="color" style="background-color:#90EE90"> </div>\r\n                <div class="color" style="background-color:#008000"> </div>\r\n                <div class="color" style="background-color:#20B2AA"> </div>\r\n                <div class="color" style="background-color:#ADD8E6"> </div>\r\n                <div class="color" style="background-color:#00F000"> </div>\r\n                <div class="color" style="background-color:#0000AB"> </div>\r\n                <div class="color" style="background-color:#20B2cc"> </div>\r\n                <div class="color" style="background-color:#f0D8E6"> </div>\r\n                <div class="color" style="background-color:#00F0cc"> </div>\r\n                <div class="color" style="background-color:#00cc8B"> </div>\r\n            </div>\r\n            <div id="closeColours" class="hint"><span ref="closeColours"></span></div>\r\n        </div>\r\n\r\n        <div class="mode-tool ssg-button" style="float: right">\r\n            <input type="image" src="<%= aamd.resourceLocation %>/next-button.png" name="next-button"\r\n                id="next-button" class="ssg-button" />\r\n            <span ref="next"></span>\r\n        </div>\r\n        \r\n    </div>\r\n\r\n\r\n', b = function(e) {
                var t = function(t) {
                    function n(e) {
                        for (var t = f.find("option").toArray(), n = 0; n < t.length; n++) {
                            var i = t[n].value;
                            e.prepend('<style type="text/css">  p.myClass { font-family: ' + i + " !important;}\n</style>")
                        }
                    }
                    var i, r = new ServerSide.Framework.UI.WidgetLib.Button("back", ServerSide.Configuration.Urls.Resources),
                        o = new ServerSide.Framework.UI.WidgetLib.Button("next", ServerSide.Configuration.Urls.Resources),
                        a = e("#size-minus-button", t)[0],
                        s = e("#size-plus-button", t)[0],
                        l = e("#style-bold", t)[0],
                        d = e("#style-d", t)[0],
                        c = e("#style-italic", t)[0],
                        u = e("#align-left", t)[0],
                        p = e("#align-center", t)[0],
                        h = e("#align-right", t)[0],
                        g = e(".color", t),
                        f = e("#drop", t),
                        m = "Arial";
                    _style = {
                        italic: !1,
                        bold: !1,
                        shadow: !1,
                        size: 18
                    }, _updateTextStyle = function(e, t, n) {
                        "bold" == e ? _style.bold = !_style.bold : "italic" == e ? _style.italic = !_style.italic : "d" == e ? _style.shadow = !_style.shadow : "align" == e ? _style.alignment = t : "color" == e ? _style.color = t : "font" == e ? (_style.font = t, _style.fontId = n) : "size" == e && (_style.size = (_style.size || i.getTextSyle().size) + t), i.updateTextSyle(_style)
                    }, _getInitialFont = function() {
                        return m
                    }, a.onclick = function() {
                        _updateTextStyle("size", -1)
                    }, s.onclick = function() {
                        _updateTextStyle("size", 1)
                    }, l.onclick = function() {
                        _updateTextStyle("bold")
                    }, c.onclick = function() {
                        _updateTextStyle("italic")
                    }, d.onclick = function() {
                        _updateTextStyle("d")
                    }, u.onclick = function() {
                        _updateTextStyle("align", "left")
                    }, p.onclick = function() {
                        _updateTextStyle("align", "center")
                    }, h.onclick = function() {
                        _updateTextStyle("align", "right")
                    }, f.change(function() {
                        var t = e("option:selected", this)[0],
                            n = parseInt(t.value),
                            i = t.innerText;
                        _updateTextStyle("font", i, n)
                    });
                    for (var v = 0; v < g.length; v++) {
                        g[v].style.backgroundColor;
                        g[v].onclick = function(e) {
                            _updateTextStyle("color", e.target.style.backgroundColor)
                        }
                    }
                    return {
                        backButton: r,
                        nextButton: o,
                        enable: function() {},
                        initStyle: function() {
                            _updateTextStyle()
                        },
                        getInitialFont: function() {
                            return _getInitialFont()
                        },
                        setFonts: function(e, t) {
                            n(t)
                        },
                        setTextLayer: function(e) {
                            i = e, i && (_style = i.getTextSyle(), f.val(_style.font))
                        }
                    }
                };
                return t
            }(r), y = function(e, t, n, i, r) {
                var o = t.View.extend({
                    initialize: function() {
                        this.render()
                    },
                    events: {},
                    styles: [],
                    render: function() {
                        _.templateSettings.variable = "aamd";
                        var e = {
                            resourceLocation: ServerSide.Configuration.Urls.Resources
                        };
                        return this.template = _.template(i, e), this.$el.html(this.template), this
                    },
                    update: function(t) {
                        function n() {
                            u.SetOverlay(t.Designer.DesignTemplate.UrlSmall);
                            var e = "textEntry1",
                                n = "textEntry2";
                            t.Designer.GetFonts(function(r) {
                                if (g.setFonts(r, a.$el), !u.textLayer) {
                                    var s = {
                                        font: r[0].Name,
                                        fontId: r[0].ID,
                                        size: h
                                    };
                                    u.Add({
                                        name: "textLayer",
                                        type: "Text",
                                        txtBoxes: [e, n],
                                        glowColor: "#F00000",
                                        Style: s,
                                        scaleFactor: 3
                                    }), u.textLayer.setCardCoverage(p.Top, p.Left, p.Bottom, p.Right), u.textLayer.setBleed(2, 2)
                                }
                                g.setTextLayer(u.textLayer), g.initStyle(), 0 !== t.Layers.Length && o(), u.textLayer.onCardCoverageChange = function(e) {
                                    c && (c.style.display = e === !0 ? "none" : "block"), i(e), u.textLayer.enable(1), u.textLayer.enable(2);
                                    for (var t = 0; t < e.length; t++) u.textLayer.disable(e[t])
                                }, u.textLayer.testCardCoverage()
                            });
                            for (prop in t.Layers) prop.indexOf("Clip") > -1 && t.Layers[prop].Url && u[prop] && (u[prop].SetImage(t.Layers[prop].Url), u[prop].disable(), u[prop].showGlow(!1))
                        }

                        function i(t) {
                            t !== !0 || l ? t !== !0 && l && (l = !1, e("#back-button > svg > path.strokeCol_1", a.$el).attr("class", "stroke-color disabledStroke")) : (l = !0, e("#back-button > svg > path.disabledStroke", a.$el).attr("class", "stroke-color strokeCol_1"))
                        }

                        function o() {
                            u.imageLayer.SetImage(t.Layers.Card.Url, t.Layers.Card.Reset), u.imageLayer.disable()
                        }
                        var a = this,
                            s = e("#colourPanel", a.$el),
                            l = !1,
                            d = {};
                        d.opacity = 0, d.maskOpacity = 1;
                        var c = (t.Designer.Coverage.Image || t.Designer.Coverage, document.getElementById("card-coverage-message")),
                            u = document.getElementById("canvas1"),
                            p = t.Designer.TextOnImage || {
                                Top: 34,
                                Left: 79,
                                Bottom: 71,
                                Right: 220
                            },
                            h = (p.Bottom - p.Top) / 2 - 4;
                        ServerSide.Components.Canvas.Controller(u, d);
                        var g = new r(this.$el, u.textLayer && u.textLayer.getTextSyle() || {
                            size: h
                        });
                        g.setFonts("", a.$el), e("#closeColours", a.$el).mouseup(function() {
                            s.slideToggle()
                        }), e("#colours", a.$el).mouseup(function() {
                            s.slideToggle()
                        }), document.getElementById("back-button").onclick = function() {
                            l && (t.setText(u.textLayer.getText(), u.textLayer.getTextSyle()), ServerSide.Lib.Utils.SsgSerialiser.serialise("conf", u.getConfiguration()), t.redirect("Designer"))
                        }, u.loaded ? (n(), e("#layer1", a.$el).find("label").css("font-family", g.getInitialFont())) : u.oncontrollerload = n, t.setToolTips()
                    }
                });
                return o
            }(r, a, l, v, b), w = function(e) {
                var t = function(t) {
                    var n = ".aam-designer-init",
                        i = document.getElementById("upload-percentage"),
                        r = new ServerSide.Framework.UI.WidgetLib.CssButton(document.getElementById("upload-button"), {
                            activated: "bar-button",
                            disabled: "bar-button-disabled"
                        }),
                        o = new ServerSide.Framework.UI.LoadingBar(document.getElementById("myLoadingBar")),
                        a = (document.getElementById("next-button"), document.getElementById("previewtab-button")),
                        s = (document.getElementById("back-button"), document.getElementById("browse-button")),
                        l = new ServerSide.Framework.UI.WidgetLib.CssButton(s, {
                            activated: "bar-button",
                            disabled: "bar-button-disabled"
                        }),
                        d = document.getElementById("browse-textbox");
                    return e(d, n).click(function() {
                        var t = e(s, n).find("input");
                        t.focus(), t.click()
                    }), s.onclick = function() {
                        e(".error-box", n).hide()
                    }, {
                        disable: function() {
                            r.disable(), l.disable(), a.disabled = !0
                        },
                        enable: function() {
                            r.activate(), l.activate(), a.disabled = !1
                        },
                        updateLoadingBar: function(t) {
                            o.setPercentage(t), e(i, n).find("span").next().text(Math.round(t))
                        },
                        showProgress: function() {
                            e("#myLoadingBar", n).show(), e("#upload-status", n).css("visibility", "visible"), e(i, n).show()
                        },
                        hideProgress: function() {
                            e("#myLoadingBar", n).hide(), e("#upload-status", n).css("visibility", "hidden"), e(i).hide()
                        },
                        showErrorMessage: function() {},
                        hideErrorMessage: function() {
                            e(".error-box", n).hide(), e(".ul-error-box", n).hide()
                        },
                        onUploadClick: function(e) {
                            r.registerEventHandler("onclick", e)
                        },
                        setTextBox: function(e) {
                            d.value = e, d.style.display = "inline-block"
                        },
                        getBrowseButtonDomElement: function() {
                            return s
                        },
                        showError: function(t) {
                            switch (this.hideErrorMessage(), this.hideProgress(), t) {
                                case "sizeError":
                                    e("#maxSizeError", n).show();
                                    break;
                                case "typeError":
                                    e("#typeError", n).show();
                                    break;
                                case "noFileChosen":
                                    e("#noFileError", n).show();
                                    break;
                                case "minSizeError":
                                    e("#minSizeError", n).show();
                                    break;
                                case "UploadSizeException":
                                    e("#maxSizeError", n).show();
                                    break;
                                case "UploadBadContentException":
                                    e("#typeError", n).show();
                                    break;
                                case "UploadMinSizeException":
                                    e("#minSizeError", n).show()
                            }
                            e("#upload-status", n).css("visibility", "visible")
                        },
                        setMode: function(i, r) {
                            "UploadOnly" !== i ? (document.getElementById("previewtab-button").onclick = function() {
                                t.redirect("Preview")
                            }, r !== !0 && (document.getElementById("previewtab-button").disabled = !0)) : e(".tabs", n).hide()
                        }
                    }
                };
                return t
            }(r), x = '<!-- <div id="bg-image" class="upl-bground"><img  src="<%= aamd.resourceLocation %>fg_bg3.svg" ></div>  -->\r\n<div id="breadcrumbBar" class="bg-color1 bgCol_2">\r\n    <div class="bc-section bg-color2 bgCol_1" id="designStep"></div\r\n        ><div id="chevron1" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron2.svg" ></div>\r\n    <div class="bc-section bg-color1 bgCol_2" id="previewStep"></div\r\n        ><div id="chevron2" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron_inactive.svg" ></div>\r\n    <div class="bc-section bg-color1 bgCol_2" id="dataCapStep"></div>\r\n\r\n    <div id="topBarControls">           \r\n        <a id="fullscreen-button" class="tb-item hint tab-item" ><img  class="svg vCentre" src="<%= aamd.resourceLocation %>fg_fullscreen.svg" ><span ref="fullscr"></a>\r\n    </div>\r\n</div>\r\n\r\n<div id="customGalleryPane"> \r\n    <a  id="back-button" class="upl-btn-back img-control tab-item borderCol_1 hint" ><span ref="galleryBack"></span><img class="svg centre" src="<%= aamd.resourceLocation %>fg_chevron_down.svg" ></a>\r\n\r\n\r\n    <div id="scrollPane-aam">\r\n        <div id="scrollContent-aam" >\r\n            <div id="upload-guidelines" class="textCol_1">\r\n                <h1 ref="uploadTitle"></h1>\r\n                <span ref="uploadGuidelines.instruction"></span>\r\n                <span ref="uploadGuidelines.instruction_1"></span>\r\n                <span ref="uploadGuidelines.instruction_2"></span>\r\n                <span ref="uploadGuidelines.instruction_3"></span>\r\n                <span ref="uploadGuidelines.instruction_4"></span>\r\n                <span ref="uploadGuidelines.instruction_5"></span>\r\n                <span ref="uploadGuidelines.instruction_6"></span>\r\n                <span ref="uploadGuidelines.instruction_7"></span>\r\n                <span ref="uploadGuidelines.instruction_8"></span>\r\n            </div>\r\n            <div id="buttonBar">\r\n                <div id="browse-button" class="bar-button hint bgCol_1 borderCol_4" ><span id="browseHint" ref="browseHint"></span><span class="textCol_4" ref="browse"></span></div>\r\n                \r\n                <div id="upload-button" class="bar-button" >\r\n                    <input type="text" id="browse-textbox" class="textbox1" />\r\n                    <span ref="upload"></span>\r\n                </div>\r\n            </div> \r\n        </div>\r\n        <div id="scrollIndicator"><img class="svg centre fillCol_3" src="<%= aamd.resourceLocation %>fg_category.svg" ></div>             \r\n    </div>\r\n    <div id="upload-status" >\r\n        <div id="noFileError" class="ul-error-box marginTop10" style="display: none">\r\n            <span ref="uploadErrors.noFile"></span>\r\n        </div>\r\n        <div id="maxSizeError" class="ul-error-box marginTop10" style="display: none">\r\n            <span ref="uploadErrors.maxSize"></span>\r\n        </div>\r\n        <div id="minSizeError" class="ul-error-box marginTop10" style="display: none">\r\n            <span ref="uploadErrors.minSize"></span>\r\n        </div>\r\n        <div id="typeError" class="ul-error-box marginTop10" style="display: none">\r\n            <span ref="uploadErrors.notSupported"></span>\r\n        </div>\r\n        <div class="loading-bar marginTop10" id="myLoadingBar">\r\n            <p id="upload-percentage" class="marginTop10"><span ref="uploading"></span>&nbsp<span></span>%</p>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<!-- =================================================================================================================== -->\r\n<div id="contentTop">\r\n    <div id="modeTabs" class="">\r\n        <input type="button" id="designertab-button" name="designertab-button" class="tabs activeTab" ref="design">\r\n            \r\n        <input type="button" id="previewtab-button" name="previewtab-button" class="tabs"\r\n            ref="preview">\r\n    </div>\r\n    \r\n    <div id="tool-bar" style="padding-left: 10px;">\r\n        \r\n        <div class="hr2" style="float: left">\r\n        </div>\r\n        \r\n        <div id="upload-controls">\r\n            <span id="upload-text" ref="selectFile"></span>\r\n            <input type="text" id="browse-textbox" class="textbox1" />\r\n        </div>\r\n        <span id="upload-message" ref="uploadHint"></span>\r\n    </div>\r\n</div>\r\n\r\n<div id="contentBottom" class="evenShadow ">\r\n</div>\r\n\r\n\r\n', C = void 0, S = function(e, t, n, i, r, o) {
                var a = t.View.extend({
                    initialize: function() {
                        this.render()
                    },
                    events: {},
                    render: function() {
                        _.templateSettings.variable = "aamd";
                        var e = {
                            resourceLocation: ServerSide.Configuration.Urls.Resources
                        };
                        return this.template = _.template(o, e), this.$el.html(this.template), this
                    },
                    update: function(t) {
                        var o = this,
                            a = new i,
                            s = e("#upload-status");
                        a.setMode(n.mode, n.preview), n.preview !== !0 && (document.getElementById("previewtab-button").disabled = !0), t.setToolTips();
                        var l = new ServerSide.Framework.Utils.Upload({
                            autoUpload: !0,
                            button: a.getBrowseButtonDomElement(),
                            request: {
                                endpoint: t.Designer.GetImageUploadUrl(t.Client, "Card")
                            },
                            callbacks: {
                                onSubmit: function(e, t) {
                                    a.setTextBox(t)
                                },
                                onUpload: function(e, t) {
                                    document.getElementById("browse-button").style.display = "none", a.disable(), a.hideErrorMessage(), a.showProgress()
                                },
                                onComplete: function(e, n, i) {
                                    i.Type ? (a.showError(i.Type), document.getElementById("browse-button").style.display = "inline-block") : (t.setCustomImage(i.Id, i.Url, null, null, !0), t.redirect("Designer"))
                                },
                                onError: function(e, n, i) {
                                    if (n || (i = "noFileChosen"), a.showError(i), t.isAccessible) {
                                        var r = s.find(".ul-error-box:visible");
                                        d.appendTabOrder(r), r[0].focus()
                                    }
                                    a.enable(), l.reset()
                                },
                                onProgress: function(e, t, n, i) {
                                    a.updateLoadingBar(n / i * 100)
                                }
                            },
                            validation: {
                                allowedExtensions: ["jpeg", "jpg", "png", "gif", "bmp", "tif", "tiff"],
                                acceptFiles: "image/*",
                                sizeLimit: t.Designer.UploadImage.MaxSize.Size,
                                minSize: t.Designer.UploadImage.MinSize.Image,
                                minSizeLimit: 1
                            },
                            messages: {
                                sizeError: "sizeError",
                                typeError: "typeError",
                                minSizeError: "minSizeError"
                            }
                        });
                        if (document.getElementById("back-button").onclick = function() {
                                t.redirect("Designer")
                            }, e("#browse-button input", o.$el).attr("title", e("#browseHint", o.$el).text()), e("#scrollPane-aam").enscroll({
                                verticalScrolling: !0,
                                verticalTrackClass: "enscrollTrackV bgCol_2",
                                verticalHandleClass: "enscrollHandleV bgCol_1",
                                propagateWheelEvent: !1,
                                drawCorner: !1,
                                easingDuration: 100,
                                addPaddingToPane: !1
                            }), t.isAccessible) {
                            var d = new r(o.$el),
                                c = o.$el.find(".tab-item").toArray();
                            d.init(), d.setTabOrder(c);
                            var u = e("#browse-button", o.$el).find("input").first();
                            u.addClass("tab-item"), u.attr("title", "Choose an image"), u.blur(function() {
                                u.parent().removeClass("dummy-focus")
                            }), u.focus(function() {
                                d.getTabNav() && u.parent().addClass("dummy-focus")
                            }), d.refreshTabOrder(), e("#scrollContent-aam").removeClass("focusItem")
                        }
                    }
                });
                return a
            }(r, a, l, w, p, x), E = '\r\n<div id="breadcrumbBar" class="bgCol_2">\r\n    <div class="bc-section bgCol_1" id="designStep"></div>\r\n    <div id="chevron1" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron4.svg" ></div>\r\n    <div class="bc-section bgCol_1" id="previewStep"></div>\r\n    <div id="chevron2" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron2.svg" ></div>\r\n    <div class="bc-section bgCol_2" id="dataCapStep"></div>\r\n\r\n    <div id="topBarControls">\r\n        <a id="fullscreen-button" class="tb-item hint" ><span ref="fullscr"></span><img  class="svg vCentre" src="<%= aamd.resourceLocation %>fg_fullscreen.svg" ></a>\r\n    </div>\r\n</div>\r\n\r\n<div id="dc-contentTop" class="textCol_1">\r\n    <div id="modeTabs" >\r\n        <a id="pvw-designertab-button" name="designertab-button" class="nav-button pvw-nav" ><img  title="Return to Design page" class="svg centre" src="<%= aamd.resourceLocation %>fg_back.svg" ></a>\r\n    </div>\r\n    <div id="tool-bar" overflow: visible;">\r\n        <div class="hr2" style="float: left"></div>\r\n        <div id="datacapture-text">\r\n            <h1 ref="DataCapture.VerifyTab.DataCapture">\r\n            </h1>\r\n            <span ref="DataCapture.VerifyText1.DataCapture"></span><br />\r\n            <span ref="DataCapture.VerifyText1.DataCapture1" hide-if-empty="True"></span>\r\n        </div>\r\n    </div>        \r\n    <div id="validationCont">\r\n        <div id="validation1" class="ssgValidation"></div>\r\n    </div>\r\n</div>\r\n\r\n<div id="dc-contentBottom2" class="evenShadow textCol_1 borderCol_2">\r\n    <div id="emailcapture1" class="ssgEmailCapture"></div>\r\n    <div id="datacapture1" class="ssgDataCapture"></div>\r\n</div>\r\n<div class="hint" id="submitHint">\r\n    <!-- <input type="button" class="bgCol_3" name="submit-button" id="submit-button" ref="DataCapture.Submit" /> -->\r\n    <!-- <a  class="bgCol_3" name="submit-button" id="submit-button" ref="DataCapture.Submit"></a> -->\r\n    <button class="bgCol_3" name="submit-button" id="submit-button" ref="DataCapture.Submit"></button>\r\n    <span ref="submitHint"></span> \r\n</div>\r\n\r\n<div id="secretPlace" style="display:none">\r\n    <a id="dcSelectorDiv"  tabindex="-1">\r\n        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 49.999997 49.999997" class="svg replaced-svg">\r\n            <path class="fill-color fillCol_1" d="M16.322 25.067L7.65 12.177l8.753-.096c4.814-.05 12.622-.05 17.35 0l8.598.096-4.056 6.015c-2.23 3.31-6.136 9.11-8.678 12.89l-4.62 6.877-8.674-12.89z" fill="#82c6e6"></path>\r\n        </svg>\r\n    </a>\r\n</div>\r\n\r\n\r\n', T = void 0, L = function(e, t, n, r, o) {
                var a = t.View.extend({
                    initialize: function() {
                        this.render()
                    },
                    events: {},
                    styles: [],
                    render: function() {
                        _.templateSettings.variable = "aamd";
                        var e = {
                            resourceLocation: ServerSide.Configuration.Urls.Resources
                        };
                        return this.template = _.template(o, e), this.$el.html(this.template), this
                    },
                    update: function(t) {
                        function r(r) {
                            e("#datacapture1", h.$el).empty(), n.get("table_cells") && (f = n.get("table_cells")), t.Designer.GetDataCapture(function(t) {
                                var n = !1;
                                for (i in t) 1 == t[i].Display && (n = !0);
                                E = T > r ? !0 : !1, v = new ServerSide.Components.DataCapture.Controller(t, document.getElementById("datacapture1"), p, E), o(), f.length > 0 && l(), n || e("#datacapture1", h.$el).hide()
                            })
                        }

                        function o() {
                            e("td input, td select", h.$el).addClass("borderCol_2"), e("#dcSelectorDiv", h.$el).clone().insertBefore(e(".ssg-select")), e("#dataCapture .tdElement", h.$el).attr("colspan", "1")
                        }

                        function a(t) {
                            e("#dc-contentTop", h.$el).css("min-height", t.innerHeight() + "px")
                        }

                        function s() {
                            var t = e("#dataCapture", h.$el).find("tr").toArray(),
                                n = t.length;
                            d(0, n, t), d(1, n, t)
                        }

                        function l() {
                            var t = e("#dataCapture", h.$el).find("tr").toArray(),
                                n = t.length;
                            c(0, n, t), c(1, n, t)
                        }

                        function d(e, t, r) {
                            var o = 0 === e ? 0 : t;
                            for (i = 0; i < t && r[i].getElementsByClassName("dcElement")[e]; i++) f[i + o] = r[i].getElementsByClassName("dcElement")[e];
                            n.set("table_cells", f)
                        }

                        function c(t, n, r) {
                            var o, a = 0 === t ? 0 : n;
                            for (i = 0; i < n && f[i + a]; i++) o = r[i].getElementsByClassName("dcElement")[t], o.value = f[i + a].value ? f[i + a].value : "", "checkbox" == o.type && (o.checked = f[i + a].checked), e(o).hasClass("ssg-select") && (e(o).find("select")[0].value = e(f[i + a]).find("select")[0].value)
                        }

                        function u() {
                            var t = g ? window.innerWidth : e(".aam-designer-init").innerWidth();
                            T > t && !E && (s(), E = !0, r(t)), t > T && E && (s(), E = !1, r(t)), a(e("#validationCont", h.$el))
                        }
                        var p, h = this,
                            g = Modernizr.touch,
                            f = [],
                            m = (new ServerSide.Framework.UI.Templating.RefLangTemplater(t.Designer), n.get("languageData"));
                        m.DataCapture && (p = {
                            checkbox: {
                                invalid: m.DataCapture.ErrorCheckbox
                            },
                            regexp: {
                                invalid: m.DataCapture.ErrorBadRegExp,
                                numericOnly: m.DataCapture.ErrorBadFormat
                            },
                            input: {
                                length: m.DataCapture.ErrorBadLength
                            },
                            email: {
                                invalid: m.DataCapture.ErrorInvalidEmail,
                                mandatory: m.DataCapture.ErrorEnterEmail,
                                label: m.DataCapture.EnterEmail,
                                confirmlabel: m.DataCapture.ConfirmEmail,
                                nomatch: m.DataCapture.ErrorEmailDoesNotMatch
                            },
                            mandatory: m.DataCapture.ErrorEmptyField,
                            competition: {
                                label: m.DataCapture.VerifyTab.CompOnly
                            }
                        });
                        var v, b, y, w, x = t.Designer.DataCapture,
                            C = "Enabled" === x.EmailCapture && !x.HideEmailCapture || "CustomOnly" === x.EmailCapture && "Custom" === t.Layers.Card.Type,
                            S = x.CustomDataCaptureEnabled,
                            k = x.HasCompetition && "Custom" === t.Layers.Card.Type,
                            E = !0,
                            T = 700,
                            _ = e(".aam-designer-init").innerWidth();
                        !S || C || k ? S || !C && !k ? (!C && k ? e("#emailcapture1", h.$el).addClass("competitionDataCapture") : e("#emailcapture1", h.$el).addClass("emailDataCapture"), e("#datacapture1", h.$el).addClass("normalDataCapture"), e(".hrDataCapture", h.$el).show()) : e("#emailcapture1", h.$el).addClass("singleDataCapture") : e("#datacapture1", h.$el).addClass("singleDataCapture"), w = ServerSide.Framework.Utils.Passthrough(), S && r(_), C && (b = new ServerSide.Components.DataCapture.EmailCapture.email(document.getElementById("emailcapture1"), w.values, p)), k && (competitionController = new ServerSide.Components.DataCapture.EmailCapture.competition(document.getElementById("emailcapture1"), p)), y = new ServerSide.Components.DataCapture.Validation(document.getElementById("validation1"));
                        var L = e("#validationCont", h.$el);
                        e("#pvw-designertab-button", h.$el).click(function() {
                            s(), t.redirect("GalleryOnly" !== n.get("mode") ? "Designer" : "Gallery")
                        });
                        var I = new ServerSide.Framework.UI.WidgetLib.CssButton(document.getElementById("submit-button"), {
                            activated: "",
                            deactivated: "",
                            disabled: "button-grey-disabled"
                        });
                        I.disable(), I.registerEventHandler("onclick", function() {
                            var n = [],
                                i = [],
                                r = null;
                            if (S && !C) n = v.getValidationMessages();
                            else if (!S && C) n = b.getValidationMessages();
                            else if (S && C) {
                                var o = [],
                                    s = [];
                                o = b.getValidationMessages(), s = v.getValidationMessages(), n = o.concat(s)
                            }
                            var l = e("#datacapture-text", h.$el);
                            if (null !== n && n.length > 0) y.addMessages(n, 3), l.hide(), L.show(), a(L);
                            else {
                                if (l.show(), L.hide(), S) {
                                    var d = v.getValues(!0);
                                    w.storeValues(d, !0);
                                    var c = v.getValues(!1);
                                    i = t.Client.CustomDataCapture;
                                    for (var u = 0; u < i.length; u++)
                                        for (var p in c) i[u].Key === p && (i[u].Value = c[p])
                                }
                                C && w.setValue("emailaddress", b.getEmailValue(), !0), k && (r = competitionController.isChecked());
                                var g = ServerSide.Lib.Utils.SsgSerialiser.deserialise("conf");
                                t.submit(g, i, w.getValue("emailaddress"), r)
                            }
                        }), I.activate();
                        var D;
                        window.addOnResizeHandler("dc_resize", function() {
                            clearTimeout(D), D = setTimeout(u, 500)
                        }), e("#dc-contentBottom2", h.$el).enscroll({
                            verticalScrolling: !0,
                            verticalTrackClass: "enscrollDcTrackV bgCol_2",
                            verticalHandleClass: "enscrollDcHandleV bgCol_1",
                            propagateWheelEvent: !1,
                            drawCorner: !1,
                            easingDuration: 100,
                            addPaddingToPane: !1
                        }), t.setToolTips()
                    }
                });
                return a
            }(r, a, l, p, E), I = '\r\n    \r\n<div id="contentTop">\r\n    <div id="modeTabs" class="">\r\n        <div class="tabs activeTab">\r\n            <input id="errortab-button" type="button" ref="Error.Title" />\r\n        </div>\r\n    </div>\r\n    <div id="tool-bar" style="padding-left: 10px;">\r\n    <div class="hr2" style="float: left; margin-left: 63px;">\r\n        </div>\r\n    </div>\r\n</div>\r\n<div id="contentBottom" class="evenShadow errorContent">\r\n     <h1 id="error-title" ref="<%- aamd.errorRef %>"></h1>\r\n     <p id="notSupportedText1" ref="NotSupported.Desktop.Text1" style="display: none"></p>\r\n     <p id="notSupportedText2" ref="NotSupported.Desktop.Text2"  style="display: none"></p>\r\n</div>\r\n', D = function(e, t, n, i) {
                var r = t.View.extend({
                    initialize: function() {
                        this.render()
                    },
                    events: {},
                    render: function() {
                        _.templateSettings.variable = "aamd";
                        var e = {
                            errorRef: "NotSupported.Desktop.Title"
                        };
                        return this.template = _.template(i, e), this.$el.html(this.template), this
                    },
                    update: function(e) {
                        document.getElementById("notSupportedText1").style.display = "block", document.getElementById("notSupportedText2").style.display = "block", n.get("languageData") || (document.getElementById("errortab-button").value = "Error", document.getElementById("notSupportedTitle").innerHTML = "Browser Not Supported", document.getElementById("notSupportedText1").innerHTML = "This website cannot be accessed by your browser.", document.getElementById("notSupportedText2").innerHTML = "Please <a href='http://windows.microsoft.com/en-us/internet-explorer/ie-10-worldwide-languages'>click here</a> to upgrade to the latest version of Internet Explorer, or use an alternative browser such as Chrome or Firefox."), document.body.style.opacity = 1
                    }
                });
                return r
            }(r, a, l, I), A = '\r\n    \r\n<div id="contentTop">\r\n    <div id="modeTabs" class="">\r\n        <div class="tabs activeTab">\r\n            <input id="errortab-button" type="button" ref="Error.Title" />\r\n        </div>\r\n    </div>\r\n    <div id="tool-bar" style="padding-left: 10px;">\r\n    <div class="hr2" style="float: left; margin-left: 63px;">\r\n        </div>\r\n    </div>\r\n</div>\r\n<div id="contentBottom" class="evenShadow errorContent">\r\n     <h1 id="error-title" ref="<%- aamd.errorRef %>"></h1>\r\n     <p id="notSupportedText1" ref="NotSupported.Desktop.Text1" style="display: none"></p>\r\n     <p id="notSupportedText2" ref="NotSupported.Desktop.Text2"  style="display: none"></p>\r\n</div>\r\n', M = void 0, B = function(e, t, n, i) {
                var r = t.View.extend({
                    initialize: function() {
                        this.render(), this.update()
                    },
                    events: {},
                    render: function() {
                        _.templateSettings.variable = "aamd";
                        var e = {
                            errorRef: "Error.Text"
                        };
                        return this.template = _.template(i, e), this.$el.html(this.template), this
                    },
                    update: function(e) {}
                });
                return r
            }(r, a, l, A), P = '    <!-- <div id="gbg-image"><img  src="<%= aamd.resourceLocation %>fg_bg3.svg" ></div>  -->\r\n    <div id="breadcrumbBar" class="bg-color1 bgCol_2">\r\n        <div class="bc-section bgCol_1" id="designStep"></div\r\n            ><div id="chevron1" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron2.svg" ></div>\r\n        <div class="bc-section bgCol_2" id="previewStep"></div\r\n            ><div id="chevron2" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron_inactive.svg" ></div>\r\n        <div class="bc-section bgCol_2" id="dataCapStep"></div>\r\n\r\n        <div id="topBarControls">           \r\n            <a id="fullscreen-button" class="tb-item hint tab-item" ><img  class="svg vCentre" src="<%= aamd.resourceLocation %>fg_fullscreen.svg" ><span ref="fullscr"></a>\r\n        </div>\r\n    </div>\r\n    </div>\r\n        <div id="mainGalleryPane"> \r\n            <a  id="back-button" class="gallery-back borderBottomColor hint tab-item borderCol_1"><img  id="back-button-img" class="svg centre" src="<%= aamd.resourceLocation %>fg_chevron_down.svg" ><span ref="galleryBack"></a>\r\n            <div id="mainGalleryControls">\r\n                <a id="customImageButton"  class="hint tab-item"><img  class="svg xcentre" src="<%= aamd.resourceLocation %>fg_custom_img.svg" ><span ref="uploadButtonHint"></span><p ref="uploadButton" class="textCol_1"></p></a> \r\n\r\n                <div id="selectorWrapper" class="hint">\r\n                    <span ref="galleryCategories"></span>\r\n                    <img id="mainSelectorDiv" class="svg vCentre gallery-control" src="<%= aamd.resourceLocation %>fg_category.svg" > \r\n                    <div class="ssg-main-selector borderCol_1  xtab-item" id="selector2" ></div>\r\n                </div>\r\n\r\n                <div id="searchPanel" class="hint borderCol_1">\r\n                    <span ref="xgalleryKeyword"></span>\r\n                    <img id="mainGallerySearch" class="svg vCentre" src="<%= aamd.resourceLocation %>fg_search.svg" >\r\n                    <div class="ssg-gallerysearch" id="gallerysearch2"></div>\r\n                </div>\r\n\r\n            </div>                \r\n            <a  id="gallery-content">\r\n                <div class="ssg-gallery" id="gallery2"></div>\r\n            </a>\r\n        </div>\r\n    </div>    \r\n\r\n\r\n<!-- ====================================================================================================================== -->\r\n    <div id="galleryOnly">\r\n        <a id="previewtab-button" class="nav-button" >\r\n            <img  class="centre" src="<%= aamd.resourceLocation %>fg_next.svg" >\r\n        </a> \r\n    </div>\r\n    <div id="UIBlank"><div id="waiting"></div></div>\r\n', H = void 0, N = function(e, t, n, i, r) {
                var o = t.View.extend({
                    initialize: function() {
                        this.render()
                    },
                    events: {},
                    styles: [],
                    render: function() {
                        _.templateSettings.variable = "aamd";
                        var e = {
                            resourceLocation: ServerSide.Configuration.Urls.Resources
                        };
                        return this.template = _.template(r, e), this.$el.html(this.template), this
                    },
                    update: function(t) {
                        function r() {
                            $galleryDropdown = e("#galleryDropdown", o.$el), $galleryDropdown.addClass("tab-item"), l.attr("tabindex", "-1");
                            var n = o.$el.find(".tab-item").toArray();
                            t.isAccessible && m.setTabOrder(n)
                        }
                        var o = this,
                            a = new ServerSide.Framework.UI.Templating.RefLangTemplater(t.Designer),
                            s = "GalleryOnly" == n.get("mode"),
                            l = e("#gallery2", o.$el);
                        this.viewdata = n, s ? (e("#back-button-img", o.$el).hide(), e("#searchPanel", o.$el).hide()) : (document.getElementById("customImageButton").onclick = function() {
                            t.redirect("Upload")
                        }, document.getElementById("previewtab-button").onclick = function() {
                            t.redirect("Preview")
                        }, document.getElementById("back-button").onclick = function() {
                            t.redirect("Designer")
                        }, n.get("preview") !== !0 && (document.getElementById("previewtab-button").disabled = !0)), "v" === t.Designer.Orientation.Type && e("#gallery-content", o.$el).addClass("v");
                        var d = ServerSide.Components.Gallery.Controller,
                            c = {
                                galleryKeyword: a.getText("galleryKeyword", n.get("languageData")),
                                galleryKeywordGo: a.getText("galleryKeywordGo", n.get("languageData")),
                                galleryKeywordFail: a.getText("galleryKeywordFail", n.get("languageData"))
                            },
                            u = d.StockImageGallery(document.getElementById("gallery2"), c, 1, "v" === t.Designer.Orientation.Type, null, null, !0),
                            p = d.GallerySelector(document.getElementById("selector2")),
                            h = d.GallerySearch(document.getElementById("gallerysearch2"), c),
                            g = {
                                layer: t.Layers.Card
                            },
                            f = new ServerSide.Components.Gallery.Adaptors.GallerySelectorSearchUploads(u, p, h, t, g);
                        if (f.onallimagesloaded = r, document.getElementById("previewtab-button").onclick = function() {
                                t.redirect("Preview")
                            }, t.setToolTips(), f.onimagechange = function(i, r, o) {
                                e(i).hasClass("-1") ? t.setCustomImage(i.childNodes[0].Id, i.childNodes[0].data.Url, null, null, !0) : t.setStockImage(i.childNodes[0].Id, i.childNodes[0].data.LargeImage, o.Locked || i.childNodes[0].data.Locked, null, !0), t.redirect("GalleryOnly" !== n.get("mode") ? "Designer" : "Preview")
                            }, n.get("searchClicked") && n.set("searchClicked", !1), l.enscroll({
                                horizontalScrolling: !0,
                                horizontalTrackClass: "enscrollTrackH2 bgCol_2",
                                horizontalHandleClass: "enscrollHandleH bgCol_1",
                                propagateWheelEvent: !1,
                                drawCorner: !1,
                                easingDuration: 100,
                                addPaddingToPane: !1
                            }), t.isAccessible) {
                            e(".enscrollHandleH").attr("tabindex", "-1"), e(".vertical-handle").attr("tabindex", "-1");
                            var m = new i(o.$el),
                                v = o.$el.find(".tab-item").toArray();
                            m.init(), m.setTabOrder(v), e("#search-box", o.$el).addClass("tab-item");
                            var b = l.find("#closeError");
                            m.appendTabOrder(b);
                            var y = e("#errorText", o.$el);
                            y.attr("tabindex", "-1"), m.updateAriaLabel(b, y.text()), d.onSearchFail = function() {
                                b.focus()
                            }
                        }
                        document.getElementById("go-button").setAttribute("value", "")
                    }
                });
                return o
            }(r, a, l, p, P), z = '<div id="breadcrumbBar" class="bgCol_2">\r\n    <div class="bc-section bgCol_1" id="designStep"></div>\r\n    <div id="chevron4" class="tb-chevron bgCol_1"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron4.svg" ></div>\r\n    <div class="bc-section bgCol_1" id="previewStepActive"></div\r\n        ><div id="chevron2" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron2.svg" ></div>\r\n    <div class="bc-section bgCol_2" id="dataCapStep"></div>\r\n\r\n    <div id="topBarControls">           \r\n        <a id="fullscreen-button" class="tb-item hint  tab-item" ><span ref="fullscr"></span><img  class="svg vCentre" src="<%= aamd.resourceLocation %>fg_fullscreen.svg" ></a>\r\n        <a id="help" class="tb-item" ><img  class="svg centre" src="<%= aamd.resourceLocation %>fg_help.svg" ></a>\r\n    </div>\r\n</div>\r\n<!-- <input type="text" class="tab-item" id="previewDescription"/> -->\r\n<span class="tab-item" id="previewDescription"></span>\r\n<div id="preview-container" class="heavyShadowUnder">\r\n        <div id="ssg-preview"></div>\r\n</div> \r\n\r\n<a id="pvw-designertab-button" class="nav-button pvw-nav hint  tab-item" ><span ref="back"></span><img class="svg centre" src="<%= aamd.resourceLocation %>fg_back.svg" ></a>\r\n\r\n<div id="sideBar" class="textCol_1">\r\n        <div id="preview-text" class="tab-item">\r\n        <h1 ref="previewTitle"></h1>\r\n        <span ref="previewInfo" id="preview-info"></span>\r\n    </div> \r\n    <!-- <a id="next-button"  class="text-button hint bgCol_3 textCol_4" ><span ref="submit"></span>OK</a>  -->\r\n    <a id="next-button"  class="text-button hint  tab-item bgCol_3 textCol_4" ><span ref="submitHint"></span><span ref="submit"></span></a> \r\n\r\n</div>\r\n<div id="textPanel"></div>\r\n\r\n<div id="copyright-warning" class="borderCol_1 textCol_1">\r\n    <p ref="previewWarning.instruction" class="textCol_1 tab-item"></p>\r\n    \r\n    <ul class="tab-item">\r\n        <li ref="previewWarning.instruction_1"></li>\r\n        <li ref="previewWarning.instruction_2"></li>\r\n        <li ref="previewWarning.instruction_3" hide-if-empty="True"></li>\r\n        <li ref="previewWarning.instruction_4" hide-if-empty="True"></li>\r\n    </ul>\r\n\r\n    <a id="closePanel"  class="text-button hint tab-item bgCol_1"><span ref="confirmHint"></span><span ref="confirm"></span></a>\r\n</div>\r\n\r\n\r\n<!-- ====================================================================================================== -->\r\n<div id="contentTop">\r\n    <div id="modeTabs" class="">\r\n        <!-- <input type="button" id="designertab-button" name="designertab-button" \r\n            class="tabs" ref="design"> -->\r\n        <input type="button" id="previewtab-button" name="previewtab-button" \r\n            class="tabs activeTab" ref="preview">\r\n    </div>\r\n    <div id="tool-bar" style="padding-left: 10px;">\r\n        <div class="back-button-div ssg-button">\r\n            <input type="image" src="<%= aamd.resourceLocation %>back-button-inactive.png" name="back-button"\r\n                id="back-button" />\r\n            <span ref="back"></span>\r\n        </div>\r\n        <div class="hr2" style="float: left">\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div id="contentBottom" class="evenShadow"></div>\r\n\r\n   \r\n</div>\r\n',
            O = '<div id="realTimeCheckDenied" class="heavyShadowUnder" style="display: none">\r\n    <img id="warning" src="<%= aamd.resourceLocation %>validation-image-big.png" />\r\n    <img id="point" src="<%= aamd.resourceLocation %>notice-point.png" />\r\n    <p ref="realTimeImageRejection.imageDenied"></p>\r\n    <button  id="denied-back-button" class="button-grey" ref="realTimeImageRejection.reset"></button>\r\n</div>', U = '<div id="realTimeCheckWarning" class="heavyShadowUnder" style="display: none">\r\n    <img id="warning" src="<%= aamd.resourceLocation %>/validation-image-big.png" />\r\n    <img id="point" src="<%= aamd.resourceLocation %>/notice-point.png" />\r\n    <p ref="realTimeImageRejection.imageWarning"></p>\r\n    <div>\r\n        <button id="warning-back-button" class="button-grey" ref="realTimeImageRejection.reset"></button>\r\n        <button id="confirm-button" class="button-grey" ref="realTimeImageRejection.confirm"></button>\r\n    </div>\r\n</div>', R = function(e, t, n) {
                var i = "MatchedImages",
                    r = 2,
                    o = 1;
                return function(a, s, l) {
                    function d() {
                        if (p.Enabled) {
                            var i = o === p.WarningType ? _.template(t, {
                                resourceLocation: ServerSide.Configuration.Urls.Resources
                            }) : i = _.template(n, {
                                resourceLocation: ServerSide.Configuration.Urls.Resources
                            });
                            s && e(s).append(i);
                            var r = new ServerSide.Framework.UI.Templating.RefLangTemplater(a.Designer);
                            r.Apply()
                        }
                    }
                    if (!a) throw "App should be defined";
                    if (!s) throw "Root scope should be defined";
                    var c = this,
                        u = l || {},
                        p = a.Designer.RealTimeImgChecking || {};
                    c.onNextButtonStatusChanged = u.onNextButtonStatusChanged || function(e) {}, c.onConfirmButtonClicked = u.onConfirmButtonClicked || function() {}, c.check = function(e) {
                        var t = e || function() {};
                        if (p.Enabled === !0 && "Stock" !== a.Layers.Card.Type) {
                            var n = ServerSide.Lib.Utils.SsgSerialiser.deserialise(i) || [],
                                s = a.Layers.Card.Id;
                            n[s] ? n[s].checkResult || p.WarningType !== o ? n[s].checkResult || p.WarningType !== r || n[s].confirmed || (c.onNextButtonStatusChanged(!1), c.showWarningMessage(s), t({
                                result: !1
                            })) : (c.onNextButtonStatusChanged(!1), c.showDeniedMessage(), t({
                                result: !1
                            })) : (c.onNextButtonStatusChanged(!1), c.showLoader(!0), a.Designer.PerformRealTimeImageCheck(a, function(e) {
                                c.showLoader(!1), n[s] = {
                                    checkResult: e.checkResult
                                }, ServerSide.Lib.Utils.SsgSerialiser.serialise(i, n), e.checkResult || p.WarningType !== o ? e.checkResult || p.WarningType !== r ? (c.onNextButtonStatusChanged(!0), t({
                                    result: !0
                                })) : (c.showWarningMessage(s), t({
                                    result: !1
                                })) : (c.showDeniedMessage(), t({
                                    result: !1
                                }))
                            }))
                        }
                    }, c.showLoader = function(t) {
                        t ? (e(".loading").show(), e(".preview-content-container").addClass("content-disabled"), e(".tool-bar-container").addClass("content-disabled")) : (e(".loading").hide(), e(".preview-content-container").removeClass("content-disabled"), e(".tool-bar-container").removeClass("content-disabled"))
                    }, c.showDeniedMessage = function() {
                        e("#copyright-warning", s).hide(), e("#preview-container", s).addClass("shifted-preview-container"), e("#realTimeCheckDenied", s).show(), e("#denied-back-button", s).click(function() {
                            c.previousAction()
                        })
                    }, c.showWarningMessage = function(t) {
                        e("#copyright-warning", s).hide(), e("#preview-container", s).addClass("shifted-preview-container"), e("#realTimeCheckWarning", s).show(), e("#warning-back-button", s).on("click", function() {
                            c.previousAction()
                        }), e("#confirm-button", s).on("click", function() {
                            c.onNextButtonStatusChanged(!0);
                            var n = ServerSide.Lib.Utils.SsgSerialiser.deserialise(i) || [];
                            n[t].confirmed = !0, ServerSide.Lib.Utils.SsgSerialiser.serialise(i, n), e("#realTimeCheckWarning", s).hide(), c.onConfirmButtonClicked()
                        })
                    }, c.previousAction = function() {
                        a.redirect("prev")
                    }, d()
                }
            }(r, O, U), F = void 0, G = function(e, t, n, i, r, o, a) {
                var s = t.View.extend({
                    initialize: function() {
                        this.render()
                    },
                    events: {},
                    styles: [],
                    render: function() {
                        _.templateSettings.variable = "aamd";
                        var e = {
                            resourceLocation: ServerSide.Configuration.Urls.Resources
                        };
                        return this.template = _.template(i, e), this.$el.html(this.template), this
                    },
                    update: function(t) {
                        function i() {
                            if (null !== t.Designer && null !== t.Client)
                                if (v) t.redirect("Datacapture");
                                else {
                                    if (t.Designer.DataCapture.CustomDataCaptureEnabled) {
                                        for (var e = 0; e < t.Client.CustomDataCapture.length; e++)
                                            for (var n in s.values) t.Client.CustomDataCapture[e].Key.toLowerCase() === n && (t.Client.CustomDataCapture[e].Value = s.values[n]);
                                        s.storeValues(t.Client.CustomDataCapture.toKeyValCollection(), !0)
                                    }
                                    t.submit(l, t.Client.CustomDataCapture, s.getValue("emailaddress"), null)
                                }
                        }
                        var r = this,
                            s = new ServerSide.Framework.Utils.Passthrough,
                            l = ServerSide.Lib.Utils.SsgSerialiser.deserialise("conf"),
                            d = {},
                            c = (t.Designer.Coverage, !1),
                            u = "Enabled" === t.Designer.DataCapture.EmailCapture && !t.Designer.DataCapture.HideEmailCapture,
                            p = t.Designer.DataCapture.HasCompetition && "Custom" === t.Layers.Card.Type,
                            h = !1,
                            g = e("#next-button", r.$el),
                            f = e("#copyright-warning", r.$el);
                        if (e("#closePanel", r.$el).click(function() {
                                f.hide(), g.attr("tab-index", "0"), g.addClass("tab-item"), t.isAccessible && C.refreshTabOrder(), e("#textPanel", r.$el).hide()
                            }), t.Designer.DataCapture.CustomDataCaptureEnabled)
                            for (var m = 0; m < t.Client.CustomDataCapture.length; m++)
                                if (t.Client.CustomDataCapture[m].Display) {
                                    h = !0;
                                    break
                                }
                        var v = u || h || p;
                        "v" === t.Designer.Orientation.Type && (e("#preview-container", r.$el).addClass("pc-vertical"), c = !0, d.orientation = "vertical", d.scale = 1.2), d.opacity = 1, d.maskOpacity = 1, d.preview = !0;
                        var b = document.getElementById("ssg-preview");
                        ServerSide.Components.Canvas.Controller(b, d), b.SetOverlay(t.Designer.DesignTemplate.UrlLarge), e("#back-button", r.$el).click(function() {
                            t.redirect("GalleryOnly" !== n.get("mode") ? "Designer" : "Gallery")
                        }), e("#pvw-designertab-button", r.$el).click(function() {
                            t.redirect("GalleryOnly" !== n.get("mode") ? "Designer" : "Gallery")
                        }), "GalleryOnly" !== n.get("mode") || (e(".tabs", r.$el).hide(), b.imageLayer.SetImage(t.Layers.Card.Url));
                        var y = n.get("languageData"),
                            g = e("#next-button", r.$el);
                        e("span[ref='submit']", g).text(v ? y.next : y.submit), e("span[ref='submitHint']", g).val(v ? y.nextHint : y.submitHint);
                        var w = document.getElementById("preview-info");
                        w.innerHTML = !v && y.previewInfo ? y.previewInfo : y.previewInfo1, nextButton = new ServerSide.Framework.UI.WidgetLib.CssButton(document.getElementById("next-button"), {
                            activated: "",
                            deactivated: "",
                            disabled: "button-grey-disabled"
                        }), nextButton.disable(), nextButton.registerEventHandler("onclick", i), t.setToolTips(), nextButton.activate();
                        var x = new a(t, r.$el[0], {
                            onNextButtonStatusChanged: function(e) {
                                e ? nextButton.activate() : nextButton.disable()
                            },
                            onConfirmButtonClicked: i
                        });
                        if (e("#realTimeCheckWarning", r.$el).addClass("borderCol_1 textCol_1"), e("#realTimeCheckWarning > p", r.$el).addClass("textCol_1"), e("#realTimeCheckWarning > div > button", r.$el).addClass("text-button hint bgCol_1"), e("#realTimeCheckDenied", r.$el).addClass("borderCol_1 textCol_1"), e("#realTimeCheckDenied > p", r.$el).addClass("textCol_1"), e("#realTimeCheckDenied > button", r.$el).addClass("text-button hint bgCol_1"), x.check(), t.isAccessible) {
                            var C = new o(r.$el),
                                S = r.$el.find(".tab-item").toArray();
                            C.init(), C.setTabOrder(S);
                            var k = y.SRT_cardPreview;
                            C.updateDesignLabel(e("#previewDescription"), k, n.get("imgTitle"), n.get("imgCat"), "")
                        }
                        "Custom" === t.Layers.Card.Type && (e("#preview-container", r.$el).addClass("shifted-preview-container"), f.show(), e("#textPanel", r.$el).show(), g.attr("tabindex", "-1"), g.removeClass("tab-item"), c && (e("#point", r.$el).addClass("p-vertical"), f.addClass("cw-vertical"))), e("#preview-text").removeClass("focusItem")
                    }
                });
                return s
            }(r, a, l, z, c, p, R), W = function(e, t, n, i) {
                var r = t.View.extend({
                    initialize: function() {
                        this.render()
                    },
                    events: {},
                    styles: [],
                    render: function() {
                        _.templateSettings.variable = "aamd";
                        var e = {
                            resourceLocation: ServerSide.Configuration.Urls.Resources
                        };
                        return this.template = _.template(i, e), this.$el.html(this.template), this
                    },
                    update: function(t) {
                        function i(t) {
                            var i = n.get("languageData").errorFacebookConnection || "",
                                o = e(r.$el).prepend('<div class="small-text-error">' + i + "</div>");
                            o.css("display", "block")
                        }
                        var r = this,
                            o = new ServerSide.Framework.UI.Templating.RefLangTemplater(t.Designer);
                        e("#previewtab-button", this.$el).click(function() {
                            t.redirect("Preview")
                        }), e("#designertab-button", this.$el).click(function() {
                            t.redirect("Designer")
                        }), e("#back-button", this.$el).click(function() {
                            t.redirect("Designer")
                        }), e("#gallery-top-row > h2", this.$el).text(n.get("languageData").facebookGallery), e("#gallerysearch1", this.$el).hide(), n.get("preview") !== !0 && (document.getElementById("previewtab-button").disabled = !0), "v" === t.Designer.Orientation.Type && e("#gallery-content", r.$el).addClass("v"), t.setToolTips();
                        var a = ServerSide.Components.Gallery.Controller,
                            s = {
                                galleryKeyword: "",
                                galleryKeywordGo: o.getText("galleryKeywordGo", n.get("languageData")),
                                galleryKeywordFail: o.getText("galleryKeywordFail", n.get("languageData"))
                            },
                            l = a.GallerySelector(document.getElementById("selector2")),
                            d = (a.GallerySearch(document.getElementById("gallerysearch2"), s), {
                                layer: t.Layers.Card,
                                fbData: ServerSide.Lib.Utils.SsgSerialiser.deserialise("fbData"),
                                onError: i
                            }),
                            c = new ServerSide.Components.Gallery.Adaptors.FacebookSelector(document.getElementById("gallery2"), l, t, d),
                            u = e("#gallery2", r.$el);
                        u.addClass("fb-gallery"), e("#searchPanel", r.$el).addClass("fb-search"), c.onimagechange = function(n, i, o) {
                            e("#UIBlank", r.$el).show(), t.Designer.UploadFacebookImageByUrl(t.Client, n.childNodes[0].data.source, function(e) {
                                e && (t.setCustomImage(e.Id), t.redirect("designer"))
                            })
                        }, c.onallimagesloaded = function(t, n) {
                            var i = r.$el.hasClass("landscape");
                            if (i) {
                                var o = (e(t).parent().css("height"), parseInt(e(t).find("button").css("width"))),
                                    a = 1.2 * o * n / 2;
                                e(t).css("width", a)
                            }
                        }, u.enscroll({
                            horizontalScrolling: !0,
                            horizontalTrackClass: "enscrollTrackH2 bgCol_2",
                            horizontalHandleClass: "enscrollHandleH bgCol_1",
                            propagateWheelEvent: !1,
                            drawCorner: !1,
                            easingDuration: 100,
                            addPaddingToPane: !1
                        })
                    }
                });
                return r
            }(r, a, l, P), V = '<!-- ================= FLAT GENERIC V2 ============================ -->\r\n<div id="breadcrumbBar" class="bgCol_2">\r\n    <div class="bc-section bgCol_1" id="designStep"></div>\r\n    <div id="chevron1" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron2.svg" ></div>\r\n    <div class="bc-section bgCol_2" id="previewStep"></div>\r\n    <div id="chevron2" class="tb-chevron"><img  class="svg" src="<%= aamd.resourceLocation %>fg_tb_chevron_inactive.svg" ></div>\r\n    <div class="bc-section bgCol_2" id="dataCapStep"></div>\r\n\r\n    <div id="topBarControls">\r\n        <a id="fullscreen-button" title="Full screen on/off" class="tb-item hint" >\r\n            <img  class="svg vCentre" src="<%= aamd.resourceLocation %>fg_fullscreen.svg" ><span ref="fullscr"></span>\r\n        </a>\r\n        <!--             <a id="help"       class="tb-item" ><img  class="svg centre" src="<%= aamd.resourceLocation %>fg_help.svg" ></a> -->\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n    <div id="stage">\r\n        <div class="error-box" id="locked-message" ref="errorLocked"></div> \r\n        <div class=\'error-box\' id=\'card-coverage-message\' ref="errorLogoCoverage"></div>\r\n        <div id="ssg-designer">\r\n            <img id="canvas-spinner" src="<%= aamd.resourceLocation %>floatingBars.gif" />\r\n            <div class="ssg-canvas" id="canvas1">\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div id="clipArtPane">\r\n\r\n        <a class="back-button-div ssg-button hint borderCol_1"  id="back-button">\r\n            <img id="view-all-button" class="svg centre" src="<%= aamd.resourceLocation %>fg_chevron_down.svg" >\r\n            <span ref="galleryBack"></span>\r\n        </a>\r\n\r\n\r\n        <div class="clipart-gallery">\r\n            <div class="ssg-mini-gallery" id="clipart-gallery"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <!-- ======================================================================================================== -->\r\n\r\n', q = function(e, t, n, i) {
                var r = t.View.extend({
                    initialize: function() {
                        this.render()
                    },
                    events: {},
                    styles: [],
                    render: function() {
                        _.templateSettings.variable = "aamd";
                        var e = {
                            resourceLocation: ServerSide.Configuration.Urls.Resources
                        };
                        return this.template = _.template(i, e), this.$el.html(this.template), this
                    },
                    update: function(t) {
                        function i() {
                            k.SetOverlay(t.Designer.DesignTemplate.UrlSmall), k.imageLayer.setCardCoverage(Math.round(C.Top), Math.round(C.Left), Math.round(C.Bottom), Math.round(C.Right));
                            var e = ServerSide.Lib.Utils.SsgSerialiser.deserialise("customimageurl");
                            e ? t.uploadCustomImageUrl(e, function(e) {
                                t.setCustomImage(e.Id, e.Url, !1, e), ServerSide.Lib.Utils.SsgSerialiser.serialise("customimageurl", null), r()
                            }) : 0 === t.Layers.Length ? H.onfirstcategoryload = function(e) {
                                t.setStockImage(e.Images[0].Id, e.Images[0].LargeImage, e.Locked || e.Images[0].Locked, e.Images[0]), r()
                            } : r()
                        }

                        function r() {
                            k.imageLayer.SetImage(t.Layers.Card.Url, t.Layers.Card.Reset), t.Layers.Card.Reset = !1, k.imageLayer.disable();
                            for (var e in t.Layers)
                                if (t.Layers.hasOwnProperty(e) && -1 != e.indexOf(b)) {
                                    var n = t.Layers[e],
                                        i = k[e];
                                    i.name = e, i.SetImage(n.Url), i.onCardCoverageChange = s, i.onGestureComplete = u, m.push({
                                        name: e,
                                        clipIsOutOfBoundaries: !1
                                    })
                                }
                            m.length > 0 && h(m[m.length - 1].name)
                        }

                        function o() {
                            var e = 0;
                            return _.each(m, function(t) {
                                var n = parseInt(t.name.substr(b.length));
                                n > e && (e = n)
                            }), b + (e + 1)
                        }

                        function a(e) {
                            if (!(m.length >= v)) {
                                _.each(m, function(e) {
                                    k[e.name].disable(), k[e.name].showGlow(!1)
                                });
                                var n = parseInt(e, 10),
                                    i = _.find(w, {
                                        Id: n
                                    }),
                                    r = o();
                                m.push({
                                    name: r,
                                    clipIsOutOfBoundaries: !1
                                }), t.setStockImage(i.Id, i.LargeImage, !0, null, !1, r), k.Add({
                                    name: r,
                                    type: "Image",
                                    inset: !0
                                });
                                var a = t.Designer.Coverage.Logo || {
                                    Top: 5,
                                    Left: 125,
                                    Bottom: 75,
                                    Right: 236
                                };
                                k[r].setCardCoverage(C.Top, C.Left, C.Bottom, C.Right), k[r].setFittingArea(a.Top, a.Left, a.Bottom, a.Right), k[r].name = r, k[r].top(), k[r].addOnImageLoadListener(function() {
                                    k[r] && s(k[r].testCardCoverage())
                                }), k[r].onCardCoverageChange = s, k[r].SetImage(i.LargeImage, !0), k[r].onGestureComplete = u, k[r].enable(), k[r].showGlow(!0)
                            }
                        }

                        function s(e) {
                            m.length > 0 && (m[m.length - 1].clipIsOutOfBoundaries = e), l()
                        }

                        function l() {
                            var e = "undefined" != typeof _.find(m, {
                                clipIsOutOfBoundaries: !1
                            });
                            e ? "Ignore" !== t.Designer.Coverage.Image.Type && S.show() : S.hide(), d(!e)
                        }

                        function d(n) {
                            "Error" === t.Designer.Coverage.Image.Type && (n === !0 ? (e("#back-button > svg > path.disabledStroke", f.$el).attr("class", "stroke-color strokeCol_1"), e("#back-button", f.$el).removeAttr("disabled")) : (e("#back-button > svg > path.strokeCol_1", f.$el).attr("class", "stroke-color disabledStroke"), e("#back-button", f.$el).attr("disabled", !0)))
                        }

                        function c() {
                            var e = m.splice(m.length - 1)[0].name;
                            k.RemoveByName(e), delete t.Layers[e], y = !1, m.length > 0 && h(m[m.length - 1].name), l()
                        }

                        function u(t) {
                            var n = e("#trash-bin", f.$el)[0].getBoundingClientRect(),
                                i = m[m.length - 1].name,
                                r = k[i],
                                o = e("#layer" + r.id + " > #customerImage", f.$el)[0].getBoundingClientRect();
                            p({
                                x: n.left,
                                y: n.top
                            }, o) && c()
                        }

                        function p(e, t) {
                            return t.top <= e.y && t.top + t.height >= e.y && t.left <= e.x && t.left + t.width >= e.x
                        }

                        function h(e) {
                            k[e].enable(), k[e].showGlow(!0), k[e].top()
                        }

                        function g() {
                            var t = new ServerSide.Components.MiniImageGallery(e("#clipart-gallery", f.$el)[0], {
                                maxSize: 20,
                                imageClassName: "clipart-image",
                                imageType: "Large",
                                onImageSelected: a
                            });
                            t.loadImages(w)
                        }
                        var f = this,
                            m = [],
                            v = 5,
                            b = "ClipArt",
                            y = !1,
                            w = [];
                        _.each(_.filter(n.get("imageCategories"), {
                            ImageType: "Clip Art"
                        }), function(e) {
                            w = w.concat(e.images)
                        });
                        var x = {},
                            C = t.Designer.Coverage.Image || t.Designer.Coverage,
                            S = e("#card-coverage-message", f.$el),
                            k = e("#canvas1", f.$el)[0],
                            E = !1;
                        "v" === t.Designer.Orientation.Type && (x = {
                            orientation: "vertical"
                        }, S.addClass("v"), E = !0), Modernizr.touch && (x.isResponsive = !0, x.widthFactor = .9, x.heightFactor = {
                            ls: .35,
                            pt: .3
                        }, x.aamd = f.$el), t.setToolTips(), t.Designer.Orientation.ShowButton === !0 ? (e("#orientation-button", f.$el).show(), e("#orientation-button", f.$el).addClass("margin-buttons-right"), e("#tool-bar .control", f.$el).addClass("margin-control-small"), e("#tool-bar", f.$el).addClass("padding-left-small")) : (e("#upload-page-button", f.$el).addClass("margin-buttons-right"), e("#orientation-button", f.$el).hide());
                        var T = new ServerSide.Framework.UI.Templating.RefLangTemplater(t.Designer);
                        e("#design-tab-tooltip-marker", f.$el).tooltip({
                            content: T.getText("designHelp", n.get("languageData")),
                            items: "#design-tab-tooltip-marker",
                            position: {
                                my: "center-40 bottom-40",
                                at: "center top60",
                                of : "#tool-bar"
                            }
                        }), e("#gallery-tooltip-marker", f.$el).tooltip({
                            content: T.getText("galleryHelp", n.get("languageData")),
                            items: "#gallery-tooltip-marker",
                            position: {
                                my: "center bottom+75",
                                at: "center top",
                                of : "#selectorDiv"
                            }
                        }), e("#back-button", f.$el).click(function(e) {
                            e.preventDefault(), this.attributes.disabled || (ServerSide.Lib.Utils.SsgSerialiser.serialise("conf", k.getConfiguration()), t.redirect("Designer"))
                        }), ServerSide.Components.Canvas.Controller(k, x), k.loaded ? (i(), e("#startup-spinner", f.$el).hide(), e("#layer0", f.$el).prepend(e("#image-spinner", f.$el))) : k.oncontrollerload = i, g(), e("#canvas1", f.$el).append('<img src="' + ServerSide.Configuration.Urls.Resources + 'bin.png" class="trash-bin" id="trash-bin">')
                    }
                });
                return r
            }(r, a, l, V), X = function(e, t, n, i, r, o, a, s, l, d, c, u, p) {
                function h(e) {
                    var t = new ServerSide.Framework.UI.Templating.RefLangTemplater(e);
                    t.Apply()
                }

                function g(e) {
                    switch (e) {
                        case "GalleryOnly":
                            return "Gallery";
                        case "UploadOnly":
                            return "Upload";
                        case "text":
                            return "text";
                        default:
                            return "Designer"
                    }
                }
                var f = t.Router.extend({
                    views: {
                        designer: i,
                        text: r,
                        upload: o,
                        preview: c,
                        datacapture: a,
                        gallery: d,
                        facebookgallery: u,
                        error: l,
                        notsupported: s,
                        clipart: p
                    },
                    initialize: function() {},
                    routes: {
                        ":route": "showView"
                    },
                    showView: function(t, i, r) {
                        var o, a;
                        n.get("activeView") ? (o = n.get("activeView"), a = "undefined" != typeof t && t ? t : o) : a = "undefined" != typeof t && t ? t : g(n.get("mode"));
                        var s = this.views[a.toLowerCase()] || this.views.designer,
                            l = new s({
                                el: "#" + i.id
                            }),
                            d = "logoPage" === n.get("nextPage") || "Card" === n.get("nextPage");
                        o !== a || d ? (n.set("activeView", a), r && r(), h(i.App.Designer), l.update(i.App)) : l.update(i.App), e(".aam-designer-init").fadeIn("1000", function() {})
                    }
                });
                return f
            }(r, a, l, m, y, S, L, D, B, N, G, W, q), m = function(e, t) {
                var n = t.Model.extend({
                    initialize: function() {
                        this.on("change", function(e) {
                            e.serialize()
                        })
                    },
                    defaults: {
                        designer: null,
                        client: null,
                        layers: null
                    },
                    deserialize: function() {
                        return ServerSide.Lib.Utils.SsgSerialiser.deserialise("Designer") || {}
                    },
                    serialize: function() {
                        ServerSide.Lib.Utils.SsgSerialiser.serialise("Designer", this)
                    },
                    validate: function(e) {}
                });
                return new n
            }(r, a), Y = function(e) {
                function t(e, t) {
                    var n = t || ServerSide.Lib.Utils.SsgSerialiser.deserialise("handbackurl"),
                        i = "";
                    if (null !== n && 0 !== e.HandbackWhiteList.length)
                        for (var r = 0; r < e.HandbackWhiteList.length; r++)
                            if (n === e.HandbackWhiteList[r]) {
                                i = n;
                                break
                            }
                    return "" === i ? e.Url : i
                }
                var n = function(e, n) {
                    function i(e) {
                        for (var t in e) a.addParameter(t, e[t])
                    }

                    function r(e) {
                        if (e) {
                            for (var t = e.toString().split("&"), n = 0; n < t.length; ++n) {
                                var i = t[n].split("=");
                                2 == i.length && a.addParameter(i[0], i[1])
                            }
                            d = !0
                        }
                    }

                    function o() {
                        d || r(ServerSide.Lib.Utils.SsgSerialiser.deserialise("passthrough"))
                    }
                    var a = this,
                        s = t(e, n),
                        l = {},
                        d = !1,
                        c = "post" === e.Method ? new ServerSide.Lib.Utils.POSTRedirect(s) : new ServerSide.Lib.Utils.GETRedirect(s);
                    ServerSide.Lib.Utils.Log("Handback url: " + s), this.getHandbackData = function() {
                        return o(), l
                    }, this.addParameter = function(e, t) {
                        l[e] = t, c.addValue(e, t)
                    }, this.doHandback = function() {
                        o(), c.submit()
                    }, i(arguments[2])
                };
                return n
            }(r), K = function(e) {
                function t() {
                    return "string" == typeof ServerSide.Lib.Utils.SsgSerialiser.deserialise("handover_key")
                }

                function n() {
                    return ServerSide.Lib.Utils.SsgSerialiser.contains("CardImageId") && "string" == typeof ServerSide.Lib.Utils.SsgSerialiser.deserialise("CardImageId")
                }

                function i() {
                    window.location.replace("#"), "function" == typeof window.history.replaceState && history.replaceState({}, "", window.location.href.slice(0, -1))
                }
                var r = {
                    getHandoverKey: function() {
                        return t() ? ServerSide.Lib.Utils.SsgSerialiser.deserialise("handover_key") : null
                    },
                    getClientId: function() {
                        return n() ? ServerSide.Lib.Utils.SsgSerialiser.deserialise("CardImageId") : null
                    },
                    getOrientation: function(e) {
                        var t = e || {
                                Type: "h",
                                ShowButton: !1,
                                isVertical: !1,
                                isProxyVertical: !1
                            },
                            n = ServerSide.Lib.Utils.SsgSerialiser.deserialise("Orientation"),
                            i = ServerSide.Lib.Utils.SsgSerialiser.deserialise("isVertical"),
                            r = ServerSide.Lib.Utils.SsgSerialiser.deserialise("isProxyVertical"),
                            o = ServerSide.Lib.Utils.SsgSerialiser.deserialise("ShowButton"),
                            a = ServerSide.Lib.Utils.SsgSerialiser.deserialise("proxy_handover_key");
                        return n ? t.Type = "v" === n.toLowerCase() || "vertical" === n.toLowerCase() ? "v" : "h" : i && (t.Type = "true" === i.toLowerCase() ? "v" : "h"), a && (t.ProxyHandoverKey = a, _usingOrientationQS = !0), o && (t.ShowButton = null !== t.ProxyHandoverKey && "true" === o.toLowerCase(), t.isVertical = "v" === t.Type.toLowerCase(), r ? t.isProxyVertical = r : t.isProxyVertical = "h" === t.Type.toLowerCase()), t
                    },
                    getFacebookToken: function() {
                        var e = window.location.hash;
                        if (-1 !== e.indexOf("access_token")) try {
                            var t = e.split("&")[0].split("=")[1],
                                n = {
                                    token: t,
                                    id: "me"
                                };
                            return ServerSide.Lib.Utils.SsgSerialiser.serialise("fbData", n), i(), n
                        } catch (r) {}
                    }
                };
                return r
            }(r), Q = function(e) {
                var t = function() {
                    function t(e) {
                        Modernizr.touch ? n(e) : r(e)
                    }

                    function n(t) {
                        var n, r = e(".aam-designer-init:first"),
                            s = window.innerWidth,
                            l = window.innerHeight,
                            d = s > l,
                            c = 1.62,
                            u = d ? 380 : 300,
                            p = d ? 320 : 380,
                            h = r.parent().css("width"),
                            g = r.parent().css("height");
                        if (h = u > parseInt(h) ? u : h, g = p > parseInt(g) ? p : g, t) {
                            if (a)
                                if (a = !1, 0 == parseInt(h) && 0 == parseInt(g)) o = !1;
                                else if (0 == parseInt(h) && Int(g) > 0) {
                                var f = d ? parseInt(g) * c : parseInt(g) / c;
                                h = f + "px", r.parent().css("width", h)
                            } else if (0 == parseInt(g) && parseInt(h) > 0) {
                                var m = d ? parseInt(h) / c : parseInt(h) * c;
                                g = m + "px", r.parent().css("height", g)
                            }
                            o ? (r.css("width", h), r.css("height", g), i(r, parseInt(h) > parseInt(g))) : (s / l > c ? (n = .95 * l, r.css("height", n + "px"), r.css("width", n * c + "px")) : (n = .95 * s, r.css("width", n + "px"), r.css("height", n / c + "px")), i(r, d)), r.css("position", "relative")
                        } else {
                            var v = u > s ? u : s,
                                b = p > l ? p : l;
                            r.css("width", v + "px"), r.css("height", b + "px");
                            var y = u > s || p > l ? "relative" : "fixed";
                            r.css("position", y), i(r, d)
                        }
                        r.css("min-width", u + "px"), r.css("min-height", p + "px")
                    }

                    function i(e, t) {
                        t ? (e.addClass("landscape"), e.removeClass("portrait")) : (e.addClass("portrait"), e.removeClass("landscape"))
                    }

                    function r(t) {
                        var n, i = e(".aam-designer-init:first"),
                            r = i.width() >= i.height() ? "ls" : "pt";
                        r != n && ("ls" == r ? (i.addClass("landscape"), i.removeClass("portrait")) : (i.removeClass("landscape"), i.addClass("portrait")), n = r)
                    }
                    var o = !0,
                        a = !0;
                    return {
                        setOrientation: t
                    }
                };
                return t()
            }(r), J = function(e) {
                var t = function(t) {
                    e(".svg", ".aam-designer-init").each(function() {
                        var t = jQuery(this),
                            n = t.attr("id"),
                            i = t.attr("class"),
                            r = t.attr("src");
                        r && e.get(r, function(e) {
                            var r = jQuery(e).find("svg");
                            "undefined" != typeof n && (r = r.attr("id", n)), "undefined" != typeof i && (r = r.attr("class", i + " replaced-svg")), r = r.removeAttr("xmlns:a"), t.replaceWith(r)
                        }, "xml")
                    })
                };
                return t
            }(r), Z = function(e, t, n, i, r, o, a, s, l) {
                var d = function(t) {
                    function r(e) {
                        k.HandoverKey = e || a.getHandoverKey(), k.ClientId = a.getClientId(), k.HandoverKey || (L.fireEvent("onerror", "InvalidHandoverKey"), k.redirectTerminate("Error", "There was no handover key present.")), E || (L.fireEvent("onerror", "InvalidDOM"), k.redirectTerminate("Error", "Invalid DOM Element.")), c(), d()
                    }

                    function d() {
                        T.GetDesigner(k.HandoverKey, function(e) {
                            function t(e) {
                                function t(e) {
                                    0 == k.isEmbedded && 27 == e.keyCode && k.toggleFullScreen()
                                }
                                k.Client = e, k.ClientId = e.CardImageId, _handback.addParameter("CardImageId", k.ClientId), p("onload"), m(), i.get("mode") || l();
                                var r = g() ? "facebookGallery" : null;
                                d(function(e) {
                                    n(function() {
                                        k.redirect(r)
                                    })
                                }), Modernizr.touch && (k.isTouch = !0), window.addEventListener("keydown", t, !1), L.fireEvent("onload")
                            }

                            function n(e) {
                                i.get("languageData") ? (e(), I.showView(null, E, m)) : r(function() {
                                    e()
                                })
                            }

                            function r(e) {
                                i.set("languageId", k.Designer.Language);
                                var t = new ServerSide.Framework.UI.Templating.RefLangTemplater(k.Designer);
                                t.getLanguageSet(function(t) {
                                    i.set("languageData", t), e(t)
                                })
                            }

                            function l() {
                                "Gallery" === k.Designer.DesignerType ? i.set("mode", B.GalleryOnly) : k.Designer.Galleries.Enabled ? i.set("mode", B.Standard) : i.set("mode", B.UploadOnly)
                            }

                            function d(e) {
                                i.get(U) ? e(i.get(U)) : k.Designer.GetCategories(function(t) {
                                    t && t.forEach(function(e) {
                                        e.GetCategory(function(t) {
                                            e.images = t.Images, "Clip Art" === e.ImageType && (k.Designer.ClipArtEnabled = !0)
                                        })
                                    }), i.set(U, t), e(t)
                                })
                            }

                            function c(n) {
                                0 !== n.State ? e.CreateClient(function(e) {
                                    t(e)
                                }) : t(n)
                            }

                            function u(t) {
                                ServerSide.Lib.Utils.Log("Getting client : " + t), e.GetClient(t, function(e) {
                                    null !== e ? c(e) : h()
                                })
                            }

                            function h() {
                                ServerSide.Lib.Utils.Log("Creating new client"), e.CreateClient(function(e) {
                                    t(e)
                                })
                            }

                            function g() {
                                var e = "access_token=",
                                    t = window.location.href.indexOf(e);
                                if (t > -1) {
                                    var n = window.location.href.substr(t + e.length).split("&")[0];
                                    return ServerSide.Lib.Utils.SsgSerialiser.serialise("fbData", {
                                        token: n,
                                        id: "me"
                                    }), f(), n
                                }
                            }

                            function f() {
                                window.location.replace("#"), "function" == typeof window.history.replaceState && history.replaceState({}, "", window.location.href.slice(0, -1))
                            }
                            e || k.redirectTerminate("Error", "The api returned a null designer."), k.Designer = e, H.orientation && (k.Designer.Orientation.Type = H.orientation), k.Designer.Orientation = a.getOrientation(k.Designer.Orientation), k.Designer.Language = H.languageId || ServerSide.Lib.Utils.SsgSerialiser.deserialise("languageid") || k.Designer.Language, k.Designer.DataCapture.showDCPage = x, k.isAccessible = H.accessible || !1, _handback = new o(e.Handback, H.handback.url, {
                                Handover_Key: k.HandoverKey
                            }), k.isEmbedded && (M.addClass("embedded"), M.removeClass("full-screen")), window.addOnResizeHandler("onresize", function() {
                                s.setOrientation(k.isEmbedded), Modernizr.touch && window.ondevicerotate && window.ondevicerotate()
                            }), k.ClientId ? u(k.ClientId) : h()
                        }), s.setOrientation(k.isEmbedded)
                    }

                    function c() {
                        if (t) {
                            u(), k.ClientId = t.ClientId || null;
                            var e = t.options;
                            H = e || {}, e && (e.startHidden === !0 && (E.style.visibility = "hidden"), e.orientation && (H.orientation = e.orientation), e.fullScreen === !0 && k.toggleFullScreen(), H.emailAddress && D.setValue("emailaddress", H.emailAddress, !0), e.size && (E.style.maxWidth = e.size.maxWidth || "", E.style.minWidth = e.size.minWidth || "", E.style.maxHeight = e.size.maxHeight || "", E.style.minHeight = e.size.minHeight || ""), e.colours && (H.colsArr = Object.keys(e.colours).map(function(t) {
                                return e.colours[t]
                            }), k.updateCSSColours(e.colsArr)), "object" == typeof H.passthrough && D.storeValues(H.passthrough, !0), H.handback = e.handback || {})
                        }
                    }

                    function u() {
                        for (var e in t.callbacks) "function" == typeof t.callbacks[e] && L.registerEventHandler(e, t.callbacks[e])
                    }

                    function p(e) {
                        for (var t = 0; t < P[e].length; t++) P[e][t]()
                    }

                    function h(t, n) {
                        var i = k.Layers.Text || {};
                        e.isEmptyObject(i) && k.Layers.Length++, i.Lines = t, i.Style = n, i.Type = "Text", k.Layers.Text = i, m()
                    }

                    function g(e, t, n, i, r, o, a, s) {
                        n && (ServerSide.Lib.Utils.Log("Submitting design " + k.Client.CardImageId + " layer " + O + " :- top : " + n.top + ", left : " + n.left + ", bottom : " + n.bottom + ", right : " + n.right + ", rotation : " + n.rotation + ", flip : " + n.flip + ", isVertical : " + k.Designer.Orientation.Type == "v"), e.Configuration.Top = n.top, e.Configuration.Left = n.left, e.Configuration.Bottom = n.bottom, e.Configuration.Right = n.right, e.Configuration.Rotation = n.rotation, e.Configuration.Flip = n.flip ? 1 : 0, e.Order = n.order), k.Layers[t].Data && "" !== k.Layers[t].Data.PriceCode && _handback.addParameter("StockImageCode", k.Layers[t].Data.PriceCode), "Stock" !== k.Layers[t].Type && (z = k.Layers[t].Type), O++, O === k.Layers.Length && (null === i || void 0 === i ? k.Client.CustomDataCapture = [] : k.Client.CustomDataCapture = i, r = r || H.emailAddress, r && (k.Client.EmailAddress = r, _handback.addParameter("emailaddress", r)), o && (k.Client.IsPublicImage = o), a && (k.Client.SaveForLater = a), _handback.addParameter("ImageType", "Stock" === z ? "Gallery" : z), _handback.addParameter("LanguageId", k.Designer.Language), k.Client.Submit(function(e) {
                            if (null === e) ServerSide.Lib.Utils.Log('Submitted image "' + k.Client.CardImageId + '" : API response was null'), k.redirectTerminate("Error", "API response was null.");
                            else {
                                var t = e.CardImageId || k.ClientId;
                                _handback.addParameter("CardImageId", t), D.storeValues(w(e.CustomDataCapture), !0), ServerSide.Lib.Utils.SsgSerialiser.clear("CardImageId"), ServerSide.Lib.Utils.SsgSerialiser.clear("handover_key"), "function" == typeof s && s(t), L.contains("onsubmit") && L.fireEvent("onsubmit", _handback.getHandbackData()), s !== !1 && H.handback.enabled !== !1 && _handback.doHandback()
                            }
                        }))
                    }

                    function f(e, t, n, i, r, o, a) {
                        "Stock" === k.Layers[e].Type ? ! function(e, t) {
                            k.Client.AddStockImageLayer(k.Layers[e].Id, function(s) {
                                g(s, e, t, n, i, r, o, a)
                            })
                        }(e, t) : "Custom" === k.Layers[e].Type || "Facebook" === k.Layers[e].Type ? ! function(e, t) {
                            k.Client.AddCustomImageLayer(k.Layers[e].Id, function(s) {
                                g(s, e, t, n, i, r, o, a)
                            })
                        }(e, t) : "Text" === k.Layers[e].Type ? ! function(e, t) {
                            k.Client.AddTextLayer(k.Layers[e].Lines, k.Layers[e].Style, t.Text, function(s) {
                                g(s, e, t, n, i, r, o, a)
                            })
                        }(e, t) : (ServerSide.Lib.Utils.Log("Image type " + _imageType + " was not recognised"), k.redirectTerminate("Error", "Image type " + _imageType + " was not recognised"))
                    }

                    function m() {
                        ServerSide.Lib.Utils.SsgSerialiser.serialise("CardImageId", k.ClientId), ServerSide.Lib.Utils.SsgSerialiser.serialise("handover_key", k.HandoverKey), ServerSide.Lib.Utils.SsgSerialiser.serialise("Layers", k.Layers)
                    }

                    function v(e, t, n, i, r, o, a) {
                        ServerSide.Lib.Utils.Log("set" + n + "Image"), t = t || "Card";
                        var s = k.Layers[t];
                        s || k.Layers.Length++;
                        var l = s || {};
                        l.Type = n, l.Url = i, l.Id = e, l.Locked = r || !1, l.Data = o || null, l.Reset = a || !1, "Custom" === n && (l.Uploads = l.Uploads || [], l.Uploads.push(l.Id)), k.Layers[t] = l, m()
                    }

                    function b(e, t, n, i) {
                        return i(), I.showView(e, E, null)
                    }

                    function y() {
                        l(), e("#fullscreen-button").mouseup(function() {
                            k.toggleFullScreen()
                        })
                    }

                    function w(e) {
                        simpleDc = {};
                        for (var t = 0; t < e.length; t++) e[t].HandbackValue === !0 && (simpleDc[e[t].Key] = e[t].Value);
                        return simpleDc
                    }

                    function x() {
                        var e = k.Designer.DataCapture,
                            t = !e.HideEmailCapture && ("Enabled" === e.EmailCapture || "CustomOnly" === e.EmailCapture && "Custom" === k.Layers.Card.Type),
                            n = e.HasCompetition && "Custom" === k.Layers.Card.Type,
                            i = !1;
                        if (k.Designer.DataCapture.CustomDataCaptureEnabled)
                            for (var r = 0; r < k.Client.CustomDataCapture.length; r++)
                                if (k.Client.CustomDataCapture[r].Display) {
                                    i = !0;
                                    break
                                }
                        return t || i || n
                    }

                    function C(e, t) {
                        S.insertRule(A + " .bgCol_" + e + "{background-color:" + t + " !important;}", S.cssRules.length), S.insertRule(A + " .fillCol_" + e + "{fill:" + t + " !important;}", S.cssRules.length), S.insertRule(A + " .strokeCol_" + e + "{stroke:" + t + " !important;}", S.cssRules.length), S.insertRule(A + " .borderCol_" + e + "{border-color:" + t + " !important;}", S.cssRules.length), S.insertRule(A + " .outlineCol_" + e + "{outline-color:" + t + " !important;}", S.cssRules.length), S.insertRule(A + " .textCol_" + e + "{color:" + t + " !important;}", S.cssRules.length)
                    }
                    var S, k = this,
                        E = null,
                        T = ServerSide.Network.Connectors.PCS.Designer,
                        _ = ServerSide.Network.RestClient,
                        L = new ServerSide.Framework.Eventing.EventCollection,
                        I = new n,
                        D = ServerSide.Framework.Utils.Passthrough(),
                        A = ".aam-designer-init",
                        M = e(".aam-designer-init"),
                        B = {
                            GalleryOnly: "GalleryOnly",
                            UploadOnly: "UploadOnly",
                            Standard: "Standard"
                        },
                        P = {},
                        H = {},
                        N = !1,
                        z = "Stock",
                        O = 0,
                        U = "imageCategories";
                    P.onload = [], this.Designer = null, this.Client = null, this.ClientId = null, this.HandoverKey = null, this.Layers = {}, this.Layers.Length = 0, this.isEmbedded = !0, this.isTouch = !1, this.isAccessible = !1;
                    var $ = ["#bbb", "#ddd", "#bbb"];
                    this.changeColour = function(e, t, n) {
                            $[e - 1] = t, t.indexOf("#") < 0 && (t = "#" + t), C(e, t)
                        }, this.updateCSSColours = function(e) {
                            var t = document.createElement("style");
                            for (document.head.appendChild(t), S = t.sheet, j = 1; j <= e.length; j++) {
                                var n = e[j - 1];
                                C(j, n)
                            }
                        }, this.getSVG = function() {
                            var e = new l;
                            return e
                        }, this.setToolTips = function() {
                            e(".hint").each(function() {
                                var t = e(this),
                                    n = e(this).find("span:first");
                                t.attr("title", e(n).val()), n.hide()
                            })
                        }, this.init = function(e, t) {
                            E = t, r(e)
                        }, this.hide = function() {
                            E.style.visibility = "hidden"
                        }, this.show = function() {
                            E.style.visibility = "visible"
                        }, this.close = function() {
                            i.clear(), ServerSide.Lib.Utils.SsgSerialiser.clearAll(), E.innerHTML = ""
                        }, this.redirect = function(e, t, n) {
                            var i = b(e, t, n, m);
                            return y(), i
                        }, this.redirectTerminate = function(e, t) {
                            var n = i.get("activeView");
                            null !== e && null !== n && e.toLowerCase() !== n.toLowerCase() && b(e, null, t, function() {
                                ServerSide.Lib.Utils.SsgSerialiser.clearAll()
                            }), L.fireEvent("onerror", t)
                        }, this.redirectToProxyProduct = function() {
                            if (null !== k.Designer.Orientation.ProxyHandoverKey) {
                                var e = ServerSide.Lib.Utils.SsgSerialiser.deserialise("passthrough");
                                ServerSide.Lib.Utils.SsgSerialiser.clearAll(), N ? window.location = window.location.href + "/../../Start.aspx?handover_key=" + k.Designer.Orientation.ProxyHandoverKey + "&proxy_handover_key=" + k.HandoverKey + "&isVertical=" + k.Designer.Orientation.isProxyVertical + "&isProxyVertical=" + k.Designer.Orientation.isVertical + "&ShowButton=true" + ("" !== e ? "&" + e : "") : window.location = window.location.href + "/../../Start.aspx?handover_key=" + k.Designer.Orientation.ProxyHandoverKey + (e ? "&" + e : "")
                            }
                        },
                        this.addLoadSubscriber = function(e) {
                            null !== k.Designer && e(), P.onload.push(e)
                        }, this.uploadCustomImageUrl = function(e, t) {
                            k.Client.UploadImageByUrl(e, t)
                        }, this.setFacebookImage = function(e, t) {
                            v(e, "Facebook", t)
                        }, this.setCustomImage = function(e, t, n, i, r, o) {
                            v(e, o, "Custom", t || _.MakeRestPath("designers", k.HandoverKey, "clientdesigns", k.ClientId, "uploads", e + ".png"), n, i, r)
                        }, this.setStockImage = function(e, t, n, i, r, o) {
                            v(e, o, "Stock", t || _.MakeRestPath("designers", k.HandoverKey, "images", e + ".png"), n, i, r)
                        }, this.toggleFullScreen = function(e) {
                            k.isEmbedded ? (k.isEmbedded = !1, M.removeClass("embedded"), M.addClass("full-screen")) : (k.isEmbedded = !0, M.removeClass("full-screen"), M.addClass("embedded")), s.setOrientation(k.isEmbedded), window.ondevicerotate && window.ondevicerotate()
                        }, this.setText = function(e, t) {
                            h(e, t)
                        }, this.submit = function(e, t, n, i, r, o) {
                            e = e || [];
                            var a = 0;
                            for (var s in k.Layers) "object" == typeof k.Layers[s] && (f(s, e[a], t, n, i, r, o), a++)
                        }
                };
                return d
            }(r, a, X, l, m, Y, K, Q, J), window.Modernizr = function(e, t, n) {
                function i(e) {
                    v.cssText = e
                }

                function r(e, t) {
                    return typeof e === t
                }

                function o(e, t) {
                    return !!~("" + e).indexOf(t)
                }

                function a(e, t) {
                    for (var i in e) {
                        var r = e[i];
                        if (!o(r, "-") && v[r] !== n) return "pfx" == t ? r : !0
                    }
                    return !1
                }

                function s(e, t, i) {
                    for (var o in e) {
                        var a = t[e[o]];
                        if (a !== n) return i === !1 ? e[o] : r(a, "function") ? a.bind(i || t) : a
                    }
                    return !1
                }

                function l(e, t, n) {
                    var i = e.charAt(0).toUpperCase() + e.slice(1),
                        o = (e + " " + w.join(i + " ") + i).split(" ");
                    return r(t, "string") || r(t, "undefined") ? a(o, t) : (o = (e + " " + x.join(i + " ") + i).split(" "), s(o, t, n))
                }
                var d, c, u, p = "2.8.3",
                    h = {},
                    g = t.documentElement,
                    f = "modernizr",
                    m = t.createElement(f),
                    v = m.style,
                    b = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
                    y = "Webkit Moz O ms",
                    w = y.split(" "),
                    x = y.toLowerCase().split(" "),
                    C = {},
                    S = [],
                    k = S.slice,
                    E = function(e, n, i, r) {
                        var o, a, s, l, d = t.createElement("div"),
                            c = t.body,
                            u = c || t.createElement("body");
                        if (parseInt(i, 10))
                            for (; i--;) s = t.createElement("div"), s.id = r ? r[i] : f + (i + 1), d.appendChild(s);
                        return o = ["&#173;", '<style id="s', f, '">', e, "</style>"].join(""), d.id = f, (c ? d : u).innerHTML += o, u.appendChild(d), c || (u.style.background = "", u.style.overflow = "hidden", l = g.style.overflow, g.style.overflow = "hidden", g.appendChild(u)), a = n(d, e), c ? d.parentNode.removeChild(d) : (u.parentNode.removeChild(u), g.style.overflow = l), !!a
                    },
                    T = function(t) {
                        var n = e.matchMedia || e.msMatchMedia;
                        if (n) return n(t) && n(t).matches || !1;
                        var i;
                        return E("@media " + t + " { #" + f + " { position: absolute; } }", function(t) {
                            i = "absolute" == (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle).position
                        }), i
                    },
                    _ = function() {
                        function e(e, o) {
                            o = o || t.createElement(i[e] || "div"), e = "on" + e;
                            var a = e in o;
                            return a || (o.setAttribute || (o = t.createElement("div")), o.setAttribute && o.removeAttribute && (o.setAttribute(e, ""), a = r(o[e], "function"), r(o[e], "undefined") || (o[e] = n), o.removeAttribute(e))), o = null, a
                        }
                        var i = {
                            select: "input",
                            change: "input",
                            submit: "form",
                            reset: "form",
                            error: "img",
                            load: "img",
                            abort: "img"
                        };
                        return e
                    }(),
                    L = {}.hasOwnProperty;
                u = r(L, "undefined") || r(L.call, "undefined") ? function(e, t) {
                    return t in e && r(e.constructor.prototype[t], "undefined")
                } : function(e, t) {
                    return L.call(e, t)
                }, Function.prototype.bind || (Function.prototype.bind = function(e) {
                    var t = this;
                    if ("function" != typeof t) throw new TypeError;
                    var n = k.call(arguments, 1),
                        i = function() {
                            if (this instanceof i) {
                                var r = function() {};
                                r.prototype = t.prototype;
                                var o = new r,
                                    a = t.apply(o, n.concat(k.call(arguments)));
                                return Object(a) === a ? a : o
                            }
                            return t.apply(e, n.concat(k.call(arguments)))
                        };
                    return i
                }), C.touch = function() {
                    var n;
                    return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : E(["@media (", b.join("touch-enabled),("), f, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
                        n = 9 === e.offsetTop
                    }), n
                }, C.csstransforms = function() {
                    return !!l("transform")
                }, C.csstransforms3d = function() {
                    var e = !!l("perspective");
                    return e && "webkitPerspective" in g.style && E("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t, n) {
                        e = 9 === t.offsetLeft && 3 === t.offsetHeight
                    }), e
                }, C.csstransitions = function() {
                    return l("transition")
                }, C.localstorage = function() {
                    try {
                        return localStorage.setItem(f, f), localStorage.removeItem(f), !0
                    } catch (e) {
                        return !1
                    }
                };
                for (var I in C) u(C, I) && (c = I.toLowerCase(), h[c] = C[I](), S.push((h[c] ? "" : "no-") + c));
                return h.addTest = function(e, t) {
                    if ("object" == typeof e)
                        for (var i in e) u(e, i) && h.addTest(i, e[i]);
                    else {
                        if (e = e.toLowerCase(), h[e] !== n) return h;
                        t = "function" == typeof t ? t() : t, "undefined" != typeof enableClasses && enableClasses && (g.className += " " + (t ? "" : "no-") + e), h[e] = t
                    }
                    return h
                }, i(""), m = d = null, h._version = p, h._prefixes = b, h._domPrefixes = x, h._cssomPrefixes = w, h.mq = T, h.hasEvent = _, h.testProp = function(e) {
                    return a([e])
                }, h.testAllProps = l, h.testStyles = E, h
            }(this, this.document), ee = void 0, window.ServerSide = function(e) {
                var t = function(e, t) {
                        return e === t.length - 1
                    },
                    n = function(e) {
                        for (var t in e)
                            if ("object" == typeof e[t] && null !== e[t]) n(e[t]);
                            else try {
                                Object.defineProperty(e, t, {
                                    value: e[t],
                                    writable: !1
                                })
                            } catch (i) {}
                    };
                return e.exports = function(i, r, o, a) {
                    a && n(r);
                    for (var s = i.split("."), l = e, d = "", c = 0; c < s.length; c++) d = s[c], t(c, s) ? l[d] = r : (l[d] = l[d] || {}, l = l[d]);
                    return o && (window[o] = r), e
                }, e.requires = function(t) {
                    for (var n = t.split("."), i = e, r = "", o = function() {
                            throw "The module 'ServerSide." + t + "' is not loaded"
                        }, a = (function(e, t) {
                            t in e || o()
                        }), s = 0; s < n.length; s++) r = n[s], a(i, r), i = i[r];
                    return i
                }, e
            }(window.ServerSide || {});
        var oe = "undefined" != typeof HTMLElement ? HTMLElement.prototype : Element.prototype;
        oe.surrounds = function(e, t) {
                var n = this.getBoundingClientRect();
                return n.left + window.pageXOffset <= e && n.right + window.pageXOffset >= e && n.top + window.pageYOffset <= t && n.bottom + window.pageYOffset >= t
            }, oe.getTopLeft = function() {
                var e = 0,
                    t = 0,
                    n = this;
                do isNaN(n.offsetLeft) || (e += n.offsetLeft, t += n.offsetTop); while (n = n.offsetParent);
                return {
                    left: e,
                    top: t
                }
            }, oe.fadeOut = function(e, t) {
                if ("function" != typeof $, 0) $(this).fadeOut(e, t);
                else {
                    var n = this,
                        i = 1,
                        r = 50,
                        o = .1,
                        a = function() {
                            i -= o, n.style.opacity = i, i > 0 ? setTimeout(a, r) : "function" == typeof t && t()
                        };
                    setTimeout(a, r)
                }
            }, oe.fadeIn = function(e, t) {
                if ("function" != typeof $, 0) $(this).fadeIn(e, t);
                else {
                    var n = this,
                        i = 0,
                        r = 50,
                        o = .1,
                        a = function() {
                            i += o, n.style.opacity = i, 1 > i ? setTimeout(a, r) : "function" == typeof t && t()
                        };
                    setTimeout(a, r)
                }
            }, oe.off = function() {
                this.style.pointerEvents = "none"
            }, oe.on = function() {
                this.style.pointerEvents = "auto"
            }, oe.getVertices = function(e, t, n) {
                var i = "undefined" == typeof n ? this.getBoundingClientRect() : n;
                if (0 == e && 1 == t) return [{
                    x: i.left,
                    y: i.bottom
                }, {
                    x: i.right,
                    y: i.top
                }, {
                    x: i.left,
                    y: i.top
                }, {
                    x: i.right,
                    y: i.bottom
                }];
                var r = this.clientWidth * t / 2,
                    o = this.clientHeight * t / 2,
                    a = 1,
                    s = 1,
                    l = {
                        x: i.width / 2 + i.left,
                        y: i.height / 2 + i.top
                    },
                    d = Math.cos(e * Math.PI / 180),
                    c = Math.sin(e * Math.PI / 180),
                    u = {
                        x: Math.round(r * d - o * c + l.x) + a,
                        y: Math.round(r * c + o * d + l.y) + s
                    },
                    p = {
                        x: Math.round(-(r * d - o * c) + l.x) - a,
                        y: Math.round(-(r * c + o * d) + l.y) - a
                    },
                    h = {
                        x: Math.round(-(r * d + o * c) + l.x) - a,
                        y: Math.round(-(r * c - o * d) + l.y) + s
                    },
                    g = {
                        x: Math.round(r * d + o * c + l.x) + a,
                        y: Math.round(r * c - o * d + l.y) - a
                    };
                return [u, h, p, g]
            }, oe.getLines = function(e, t) {
                return Math.verticesToLines(this.getVertices(e, t))
            }, oe.appendHtml = function(e) {
                var t = document.createElement("div");
                t.innerHTML = e;
                for (var n = 0; n < t.childNodes.length; n++) this.appendChild(t.removeChild(t.childNodes[n]))
            }, oe.prependHtml = function(e) {
                var t = document.createDocumentFragment(),
                    n = document.createElement("div");
                for (n.innerHTML = e; n.firstChild;) t.appendChild(n.firstChild);
                this.insertBefore(t, this.firstChild)
            }, "function" != typeof document.getElementsByClassName && (document.getElementsByClassName = function(e) {
                for (var t, n = new RegExp("(?:^|\\s)" + e + "(?:$|\\s)"), i = document.getElementsByTagName("*"), r = [], o = 0; null != (t = i[o]); o++) {
                    var a = t.className;
                    a && -1 != a.indexOf(e) && n.test(a) && r.push(t)
                }
                return r
            }), window.addOnloadAction = function(e) {
                if ("function" == typeof window.onload) {
                    var t = window.onload,
                        n = function() {
                            t(), e()
                        };
                    window.onload = n
                } else window.onload = e
            }, window.location.pagename = function() {
                return location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
            }(), window.location.pageurl = function() {
                return [location.protocol, "//", location.host, location.pathname].join("")
            }(),
            function() {
                var e, t = null,
                    n = [],
                    i = [];
                window.onresize = function() {
                    if (t = window.innerWidth, e !== t)
                        for (var i = 0; i < n.length; i++) "function" == typeof n[i] && n[i]();
                    e = t
                }, window.addOnResizeHandler = function(e, t) {
                    -1 === i.indexOf(e) && (i.push(e), n.push(t))
                }
            }(), Array.prototype.move = function(e, t) {
                Array.isArray(this) && this.splice(t, 0, this.splice(e, 1)[0])
            }, String.format = function() {
                var e = arguments[0];
                if (null != e && "undefined" != typeof e)
                    for (var t = 0; t < arguments.length - 1; t++) {
                        var n = new RegExp("\\{" + t + "\\}", "gm");
                        e = e.replace(n, arguments[t + 1])
                    }
                return e
            }, window.hexToRgb = function(e) {
                var t = function(e) {
                        return "#" == e.charAt(0) ? e.substring(1, 7) : e
                    },
                    n = parseInt(t(e).substring(0, 2), 16),
                    i = parseInt(t(e).substring(2, 4), 16),
                    r = parseInt(t(e).substring(4, 6), 16);
                return {
                    r: n,
                    g: i,
                    b: r
                }
            }, window.rgbToHex = function(e) {
                var t = e.split("(")[1].split(")")[0];
                t = t.split(",");
                var n = t.map(function(e) {
                    return e = parseInt(e).toString(16), 1 == e.length ? "0" + e : e
                });
                return "#" + n.join("")
            }, window.secondsToTime = function(e) {
                var t = Math.floor(e / 3600),
                    n = Math.floor((e - 3600 * t) / 60),
                    i = Math.floor(e - 3600 * t - 60 * n);
                return 10 > t && (t = "0" + t), 10 > n && (n = "0" + n), 10 > i && (i = "0" + i), t && (t = "00"), t + ":" + n + ":" + i
            }, window.bytesToSize = function(e) {
                var t = ["Bytes", "KB", "MB"];
                if (0 == e) return "n/a";
                var n = parseInt(Math.floor(Math.log(e) / Math.log(1024)));
                return (e / Math.pow(1024, n)).toFixed(1) + " " + t[n]
            }, window.ServerSide = function(e) {
                var t = {
                    Urls: {
                        FacebookApi: "https://graph.facebook.com"
                    },
                    Images: {
                        DefaultGallerySize: 220
                    },
                    DataCapture: {
                        MaxRows: 6
                    },
                    Canvas: {
                        zIndex: {
                            layer: 0,
                            template: 2e3,
                            bleed: 4e3,
                            overlay: 6e3
                        },
                        StandardCardSize: {
                            width: 241,
                            height: 153
                        }
                    }
                };
                return e.exports("Configuration", t, null, !0)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = {
                    that: this,
                    extend: function(e, t) {
                        e = e || {};
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                        return e
                    },
                    options: function(e) {
                        var t = function(t) {
                            return function(n) {
                                return "object" == typeof e && n in e && typeof e[n] === t
                            }
                        };
                        return {
                            isNullOrEmpty: function(t) {
                                return null === e || "object" != typeof e || !(t in e) || "" === e[t]
                            },
                            isNotNullString: t("string"),
                            isNotNullObject: t("object"),
                            isNotNullNumber: t("number"),
                            isNotNullBoolean: t("boolean"),
                            insertAll: function(t, n) {
                                var i = !1;
                                for (var r in t) {
                                    for (var o in e)
                                        if (r == o) {
                                            i = !0;
                                            break
                                        }(i && n || !i) && (e[r] = t[r])
                                }
                            }
                        }
                    },
                    SsgUrl: {
                        parseQuery: function(e, t, n) {
                            if (null == e || "" == e) return {};
                            e = e.replace("?", "");
                            for (var i = e.split("&"), r = {}, o = 0; o < i.length; ++o) {
                                var a = i[o].split("=");
                                if (2 == a.length) {
                                    var s = a[1].replace(/\+/g, " ");
                                    r[n ? a[0].toLowerCase() : a[0]] = t === !1 ? s : decodeURIComponent(s)
                                }
                            }
                            return r
                        },
                        createQuery: function(e) {
                            var t = [];
                            for (var n in e) t.push(n + "=" + e[n]);
                            return t.join("&")
                        },
                        getPageName: function() {
                            var e = window.location.pathname;
                            return e.substring(e.lastIndexOf("/") + 1).replace(".aspx", "")
                        },
                        getParameterByName: function(e, t) {
                            e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                            var n;
                            "" !== location.hash && (n = location.hash.match(new RegExp(e + "=([^&]*)"))), "" !== location.search && (n = location.search.match(new RegExp("[\\?&]" + e + "=([^&#]*)")));
                            var i = null == n ? "" : n[1].replace(/\+/g, " ");
                            return t === !1 ? i : decodeURIComponent(i)
                        }
                    },
                    POSTRedirect: function(e) {
                        var n = document.createElement("form");
                        n.method = "post", n.action = e;
                        var i = [];
                        this.addValue = function(e, t) {
                            e in i ? i[e].value = t : n.appendChild(function() {
                                var n = document.createElement("input");
                                return n.type = "hidden", n.name = e, n.value = t, i[e] = n, n
                            }())
                        }, this.submit = function() {
                            document.body.appendChild(n);
                            var e = t.SsgSerialiser.deserialise("breakframe");
                            ("true" === e || "True" === e || e === !0) && (n.target = "_top"), n.submit()
                        }
                    },
                    GETRedirect: function(e) {
                        var n = {};
                        this.addValue = function(e, t) {
                            n[e] = t
                        }, this.submit = function() {
                            var i = t.SsgSerialiser.deserialise("breakframe");
                            "true" === i || "True" === i || i === !0 ? window.top.location = e + (-1 === e.indexOf("?") ? "?" : "&") + t.SsgUrl.createQuery(n) : window.location = e + (-1 === e.indexOf("?") ? "?" : "&") + t.SsgUrl.createQuery(n)
                        }
                    },
                    SsgSerialiser: {
                        id: "",
                        prefix: "SSG",
                        viewData: {},
                        init: function(e) {
                            this.clearAll(), this.id = e || "", this.prefix = this.prefix + "." + this.id.toLowerCase() + "."
                        },
                        prefixed: function(e) {
                            return this.prefix + e.toLowerCase()
                        },
                        serialise: function(e, t) {
                            this.viewData[this.prefixed(e)] = t
                        },
                        deserialise: function(e) {
                            return this.viewData[this.prefixed(e)] || null
                        },
                        contains: function(e) {
                            return this.prefixed(e) in this.viewData
                        },
                        clearAll: function() {
                            this.viewData = {}
                        },
                        clear: function(e) {
                            delete this.viewData[this.prefixed(e)]
                        }
                    },
                    defer: function(e, t) {
                        var n = t.until;
                        if (n()) e();
                        else var i = t.pause || 100,
                            r = setInterval(function() {
                                n() && (window.clearInterval(r), e())
                            }, i)
                    },
                    BreakFrame: function() {
                        var e = null;
                        try {
                            e = window.parent.location.href
                        } catch (t) {}(null === e || void 0 === e || e !== document.location.href) && (window.parent.location = document.URL)
                    },
                    BreakFrameIfParameterTrue: function(e) {
                        var n = e || "breakframe",
                            i = t.SsgSerialiser.deserialise(n);
                        ("true" === i || "True" === i || i === !0) && t.BreakFrame()
                    },
                    Log: function(e) {
                        var n = "http://devserver.serversidegraphics.com/tom/remotelogger/logging/debug?message=%1 : %2 : %3";
                        if (/debug/.test(window.location.search)) {
                            var i = n.replace("%1", (new Date).getTime());
                            i = i.replace("%2", t.SsgSerialiser.deserialise("CardImageId") || "no-id"), i = i.replace("%3", encodeURIComponent(e)), $.get(i, function() {})
                        }
                    },
                    BrowserCheck: function() {
                        function e(e) {
                            e = (e || navigator.userAgent).toLowerCase();
                            var t = e.match(/android\s([0-9\.]*)/);
                            return t ? parseFloat(t[1]) : !1
                        }

                        function t() {
                            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                                var e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                                return e ? parseInt(e[1], 10) : !1
                            }
                        }

                        function n() {
                            var e = window.navigator.userAgent,
                                t = e.indexOf("MSIE ");
                            if (t > 0) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
                            var n = e.indexOf("Trident/");
                            if (n > 0) {
                                var i = e.indexOf("rv:");
                                return parseInt(e.substring(i + 3, e.indexOf(".", i)), 10)
                            }
                            var r = e.indexOf("Edge/");
                            return r > 0 ? parseInt(e.substring(r + 5, e.indexOf(".", r)), 10) : !1
                        }
                        return this.isVersionSupported = function(i) {
                            var r = !0,
                                o = i || {};
                            if (o.android) {
                                var a = e();
                                a && (r = a >= o.android)
                            }
                            if (o.ios) {
                                var s = t();
                                s && (r = s >= o.ios)
                            }
                            if (o.ie) {
                                var l = n();
                                l && (r = l >= o.ie)
                            }
                            return r
                        }, this
                    }
                };
                return e.exports("Lib.Utils", t)
            }(window.ServerSide || {}), Math.verticesToLines = function(e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var i = n + 1;
                    i === e.length && (i = 0), t.push({
                        p1: e[n],
                        p2: e[i]
                    })
                }
                return t
            }, Math.bytesToSize = function(e) {
                if (0 == e) return "n/a";
                var t = parseInt(Math.floor(Math.log(e) / Math.log(1024)));
                return 0 == t ? e : (e / Math.pow(1024, t)).toFixed()
            }, Math.getIntersection = function(e, t) {
                function n(e, t, n) {
                    if (null == n.x || null == n.y) return !1;
                    var i = t.x > e.x ? t.x : e.x,
                        r = t.x <= e.x ? t.x : e.x,
                        o = t.y > e.y ? t.y : e.y,
                        a = t.y <= e.y ? t.y : e.y;
                    return r <= n.x && i >= n.x && a <= n.y && o >= n.y
                }
                var i = ((e.p1.x * e.p2.y - e.p1.y * e.p2.x) * (t.p1.x - t.p2.x) - (e.p1.x - e.p2.x) * (t.p1.x * t.p2.y - t.p1.y * t.p2.x)) / ((e.p1.x - e.p2.x) * (t.p1.y - t.p2.y) - (e.p1.y - e.p2.y) * (t.p1.x - t.p2.x)),
                    r = ((e.p1.x * e.p2.y - e.p1.y * e.p2.x) * (t.p1.y - t.p2.y) - (e.p1.y - e.p2.y) * (t.p1.x * t.p2.y - t.p1.y * t.p2.x)) / ((e.p1.x - e.p2.x) * (t.p1.y - t.p2.y) - (e.p1.y - e.p2.y) * (t.p1.x - t.p2.x)),
                    o = {
                        x: Math.round(i),
                        y: Math.round(r)
                    };
                return n(e.p1, e.p2, o) && n(t.p1, t.p2, o) ? o : null
            }, Number.prototype.roundTo = function(e) {
                var t = Math.pow(100, e);
                return Math.round(this.valueOf() * t) / t
            }, window.ServerSide = function(e) {
                var t = {
                    addHandler: function(e, t, n) {
                        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
                    },
                    removeHandler: function(e, t, n) {
                        e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t] = null
                    }
                };
                return e.exports("Lib.Dom.EventHandler", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = {
                    Spinner: function(e) {
                        return "<div id='canvas-spinner' class=" + e + ">                       <div class='blockG' id='rotateG_01'></div>                      <div class='blockG' id='rotateG_02'></div>                      <div class='blockG' id='rotateG_03'></div>                      <div class='blockG' id='rotateG_04'></div>                      <div class='blockG' id='rotateG_05'></div>                      <div class='blockG' id='rotateG_06'></div>                      <div class='blockG' id='rotateG_07'></div>                      <div class='blockG' id='rotateG_08'></div>                  </div> "
                    },
                    Transitions: function() {
                        return "<style>                         .fade {                             transition: opacity .2s linear;                             -moz-transition: opacity .2s linear;                            -webkit-transition: opacity .2s linear;                         }                   </style> "
                    }
                };
                return e.exports("Lib.UI", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function() {
                    var e = [],
                        t = this;
                    this.registerEventHandler = function(t, n, i) {
                        t = t.toLowerCase(), "object" != typeof e[t] && (e[t] = []), i ? e[t][i] = n : e[t].push(n)
                    }, this.removeEventHandler = function(t, n) {
                        var i = e[t.toLowerCase()];
                        n < i.length && i.splice(n, 1)
                    }, this.fireEvent = function(t, n) {
                        if (t = t.toLowerCase(), "object" == typeof e[t])
                            for (var i = 0; i < e[t].length; i++) "function" == typeof e[t][i] && e[t][i](n)
                    }, this.exposeEvent = function(e, n, i) {
                        "undefined" == typeof i && (i = n), e.registerEventHandler(n, function(e) {
                            t.fireEvent(i, e)
                        })
                    }, this.contains = function(t) {
                        return !!e[t.toLowerCase()]
                    }
                };
                return e.exports("Framework.Eventing.EventCollection", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Configuration"), e.requires("Lib.Utils");
                var t = {
                    MakeRestPath: function() {
                        for (var t = e.Configuration.Urls.Api, n = 0; n < arguments.length; n++) t += "/" + arguments[n];
                        return t
                    },
                    QueryApi: function(e, t, n, i, r, o) {
                        $.ajax({
                            url: e,
                            type: t,
                            data: o ? n : JSON.stringify(n),
                            success: function(e) {
                                return function(t) {
                                    e._Success(t, i)
                                }
                            }(this),
                            error: function(e) {
                                return function(t) {
                                    e._Error(t, i, r)
                                }
                            }(this),
                            complete: function(e) {
                                return function(t) {
                                    e._Complete(t, i)
                                }
                            }(this),
                            dataType: "json",
                            contentType: o || "application/json",
                            async: !0,
                            cache: !1
                        })
                    },
                    FacebookQueryApi: function(e, t, n, i) {
                        $.ajax({
                            url: e,
                            type: t,
                            data: JSON.stringify(n),
                            success: function(e) {
                                return function(t) {
                                    e._Success(t, i)
                                }
                            }(this),
                            error: function(e) {
                                return function(t) {
                                    e._Error(t, i)
                                }
                            }(this),
                            complete: function(e) {
                                return function(t) {
                                    e._Complete(t, i)
                                }
                            }(this),
                            dataType: "json",
                            async: !0,
                            cache: !1
                        })
                    },
                    _Complete: function(e, t) {},
                    _Success: function(e, t) {
                        t(e)
                    },
                    _Error: function(e, t, n) {
                        n ? n(e) : t(null)
                    }
                };
                return e.exports("Network.RestClient", t)
            }(window.ServerSide || {}), window.ServerSide = function(e, t) {
                e.requires("Lib.Utils");
                var n = {
                    that: this,
                    CustomImageType: {
                        Image: "Image",
                        Facebook: "Facebook"
                    },
                    LayerCategory: {
                        Card: 1,
                        Text: 2,
                        Logo: 3
                    },
                    encodeRequest: function(e) {
                        var t = [];
                        if (e)
                            for (var n in e) t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
                        return t.join("&")
                    },
                    GetDesigner: function(i, r) {
                        t.QueryApi(t.MakeRestPath("designers", i), "get", "", function(t) {
                            null !== t && (t.CreateClient = function(e) {
                                n.CreateClient(t, null, e)
                            }, t.CreateClientWithParams = function(e, i) {
                                n.CreateClient(t, e, i)
                            }, t.GetClient = function(e, i) {
                                n.GetClientById(t, e, i)
                            }, t.GetCategories = function(e) {
                                n.GetCategories(t, e)
                            }, t.GetUploadedImages = function(e, i) {
                                n.GetUploadedImages(t, e, i)
                            }, t.GetSearchResults = function(e, i) {
                                n.GetSearchResults(t, e, i)
                            }, t.GetDataCapture = function(e) {
                                n.GetDataCaptureObject(t, e)
                            }, t.GetStockImage = function(e, i) {
                                n.GetStockImage(t, e, i)
                            }, t.GetFonts = function(e) {
                                n.GetFonts(t, e)
                            }, t.GetDefaultLanguage = function(e) {
                                n.GetDefaultLanguage(t, e)
                            }, t.GetLanguage = function(e, i) {
                                n.GetLanguage(t.HandoverKey, e, i)
                            }, t.UploadImageByUrl = function(e, i, r) {
                                n.UploadImageByUrl(t, e, i, n.CustomImageType.Image, r)
                            }, t.UploadFacebookImageByUrl = function(e, i, r) {
                                n.UploadImageByUrl(t, e, i, n.CustomImageType.Facebook, r)
                            }, t.GetTemplate = function(e, i) {
                                n.GetTemplate(t, e, i)
                            }, t.GetImageUploadUrl = function(i, r) {
                                var o = /Android 2/i.test(navigator.userAgent) ? "&wrap=true" : "",
                                    a = r ? n.LayerCategory[r] : n.LayerCategory.Card;
                                return e.Network.RestClient.MakeRestPath("designers", t.HandoverKey, "ClientDesigns", i.CardImageId, "Uploads?layerid=" + a + o)
                            }, t.PerformRealTimeImageCheck = function(e, t) {
                                n.PerformRealTimeImageCheck(e, t)
                            }), r(t || null)
                        })
                    },
                    CreateClient: function(e, i, r) {
                        var o = this.encodeRequest(i);
                        t.QueryApi(t.MakeRestPath("designers", e.HandoverKey, "clientdesigns"), "post", o, function(t) {
                            t && n.PopulateClientMethods(e, t), r(t)
                        }, function(e) {
                            r(JSON.parse(e.responseText))
                        }, "application/x-www-form-urlencoded")
                    },
                    GetCategories: function(i, r) {
                        var o = e.Lib.Utils.SsgSerialiser.deserialise("languageid");
                        t.QueryApi(i.Galleries.URL + "?langid=" + o, "get", "", function(e) {
                            if (null != e)
                                for (var t = 0; t < e.length; t++) e[t].Knockout = "Monograms" === e[t].Name, e[t].GetCategory = function(e) {
                                    return function(t) {
                                        n.GetCategory(e, t)
                                    }
                                }(e[t]);
                            r(e || null)
                        })
                    },
                    GetCategory: function(n, i) {
                        var r = e.Lib.Utils.SsgSerialiser.deserialise("languageid");
                        t.QueryApi(n.Url + "?langid=" + r, "get", "", i)
                    },
                    GetUploadedImages: function(e, n, i) {
                        t.QueryApi(t.MakeRestPath("designers", e.HandoverKey, "ClientDesigns", n.CardImageId, "Uploads"), "get", "", i)
                    },
                    GetSearchResults: function(e, n, i) {
                        t.QueryApi(t.MakeRestPath("designers", e.HandoverKey, "Images", "?q=" + n), "get", "", i)
                    },
                    GetStockImage: function(e, n, i) {
                        t.QueryApi(t.MakeRestPath("designers", e.HandoverKey, "images", n), "get", "", i)
                    },
                    GetDefaultLanguage: function(e, n) {
                        t.QueryApi(t.MakeRestPath("designers", e.HandoverKey, "languages", e.Language), "get", "", n)
                    },
                    GetLanguage: function(e, n, i) {
                        t.QueryApi(t.MakeRestPath("designers", e, "languages", n), "get", "", i)
                    },
                    GetTemplate: function(e, n, i) {
                        t.QueryApi(t.MakeRestPath("designers", e.HandoverKey, "templates", n), "get", "", i)
                    },
                    GetFonts: function(e, n) {
                        t.QueryApi(e.TextOnImage.Fonts.URL, "get", "", n)
                    },
                    GetDataCaptureObject: function(e, i) {
                        e.DataCapture.CustomDataCaptureEnabled && t.QueryApi(e.DataCapture.Url, "get", "", function(t) {
                            n.PopulateDataCaptureMethods(e, t), i(t)
                        })
                    },
                    UploadImageByUrl: function(e, n, i, r, o) {
                        t.QueryApi(t.MakeRestPath("designers", e.HandoverKey, "ClientDesigns", n.CardImageId, "Uploads"), "post", {
                            Url: i,
                            Type: r
                        }, o)
                    },
                    AddStockImageLayerToClient: function(e, t, i, r) {
                        n.CreateLayer(e, "StockImageLayer", function(e) {
                            e.ImageId = i, e.Configuration.Top = -5, e.Configuration.Bottom = 158, e.Configuration.Left = -5, e.Configuration.Right = 246, t.Layers[t.Layers.length] = e, r(e)
                        })
                    },
                    AddCustomImageLayerToClient: function(e, t, i, r) {
                        n.CreateLayer(e, "CustomImageLayer", function(e) {
                            e.ImageId = i, e.Configuration.Top = -5, e.Configuration.Bottom = 158, e.Configuration.Left = -5, e.Configuration.Right = 246, t.Layers[t.Layers.length] = e, r(e)
                        })
                    },
                    AddTextLayerToClient: function(e, t, i, r, o, a) {
                        var s = function(e) {
                                return -1 !== e.indexOf("rgb") ? rgbToHex(e).replace("#", "") : e.replace("#", "")
                            },
                            l = function(e) {
                                switch (e) {
                                    case "left":
                                        return 0;
                                    case "center":
                                        return 1;
                                    default:
                                        return 2
                                }
                            };
                        n.CreateLayer(e, "TextLayer", function(e) {
                            null == e.Lines && (e.Lines = []);
                            for (var d = 0; d < i.length; d++) e.Lines[e.Lines.length] = n.CreateTextLine(i[d], d, o[d]);
                            e.Font.Size = r.size, e.Font.Name = r.font, e.Font.Id = r.fontId, e.Font.Bold = r.bold, e.Font.Italic = r.italic, e.Font.Alignment = l(r.alignment), e.Font.Colour = s(r.color), e.Font.OutlineColour = r.outlineColour && s(r.outlineColour), e.Font.Shadow = r.shadow, e.Font.LineSpacing = r.lineSpacing, e.Filters = [], t.Layers[t.Layers.length] = e, a(e)
                        })
                    },
                    CreateLayer: function(e, n, i) {
                        t.QueryApi(t.MakeRestPath("designers", e.HandoverKey, "layers", "?type=" + n), "post", "", i)
                    },
                    CreateTextLine: function(e, t, n) {
                        return n = n || {
                            top: 0,
                            left: 0
                        }, {
                            Text: e,
                            Order: t,
                            Top: n.top,
                            Left: n.left
                        }
                    },
                    GetClientById: function(e, i, r) {
                        t.QueryApi(t.MakeRestPath("designers", e.HandoverKey, "clientdesigns", i), "get", "", function(t) {
                            null !== t && n.PopulateClientMethods(e, t), r(t)
                        })
                    },
                    SubmitClient: function(e, n, i, r) {
                        t.QueryApi(t.MakeRestPath("designers", e.HandoverKey, "clientdesigns", n.CardImageId), "put", n, function(e) {
                            i(e)
                        }, r)
                    },
                    PopulateClientMethods: function(e, t) {
                        n.PopulateDataCaptureMethods(e, t.CustomDataCapture), t.UploadImageByUrl = function(i, r) {
                            n.UploadImageByUrl(e, t, i, n.CustomImageType.Image, r)
                        }, t.UploadFacebookImageByUrl = function(i, r) {
                            n.UploadImageByUrl(e, t, i, n.CustomImageType.Facebook, r)
                        }, t.GetUploads = function(i) {
                            n.GetUploadedImages(e, t, function(t) {
                                n.PopulateUploadsMethods(e, t), i(t)
                            })
                        }, t.AddStockImageLayer = function(i, r) {
                            n.AddStockImageLayerToClient(e, t, i, r)
                        }, t.AddCustomImageLayer = function(i, r) {
                            n.AddCustomImageLayerToClient(e, t, i, r)
                        }, t.AddTextLayer = function(i, r, o, a) {
                            n.AddTextLayerToClient(e, t, i, r, o, a)
                        }, t.Submit = function(i, r) {
                            n.SubmitClient(e, t, i, r)
                        }
                    },
                    PopulateDataCaptureMethods: function(e, t) {
                        null != t && (t.toKeyValCollection = function() {
                            for (var e = [], n = 0; n < t.length; n++) e[t[n].Key] = t[n].Value || "";
                            return e
                        })
                    },
                    PopulateUploadsMethods: function(e, t) {
                        t.toCategory = function(e, t) {
                            for (var n = {
                                    Id: t,
                                    Name: e,
                                    Images: [],
                                    GetCategory: function(e) {
                                        e(n)
                                    }
                                }, i = 0; i < this.length; i++) n.Images.push({
                                Id: this[i].Id,
                                ReviewImage: this[i].Url,
                                ThumbNail: this[i].ThumbnailUrl,
                                LargeImage: this[i].Url,
                                ThumbnailUrl: this[i].ThumbnailUrl,
                                Url: this[i].Url
                            });
                            return n
                        }
                    },
                    PerformRealTimeImageCheck: function(e, n) {
                        t.QueryApi(t.MakeRestPath("designers", e.HandoverKey, "ImageChecking", e.Layers.Card.Id), "get", "", function(t) {
                            n({
                                imageId: e.Layers.Card.Id,
                                checkResult: null === t
                            })
                        }, function() {
                            n({
                                imageId: e.Layers.Card.Id,
                                checkResult: !0
                            })
                        })
                    }
                };
                return e.exports("Network.Connectors.PCS.Designer", n)
            }(window.ServerSide || {}, ServerSide.Network.RestClient), window.ServerSide = function(e, t) {
                e.requires("Lib.Utils");
                var n = {
                    that: this,
                    UserToken: "",
                    SetUserCredentials: function(n, i) {
                        var r = e.Lib.Utils.SsgSerialiser.deserialise("FacebookData");
                        if (null === r) {
                            var o = e.Lib.Utils.SsgSerialiser.deserialise("accesstoken"),
                                a = e.Lib.Utils.SsgSerialiser.deserialise("fbappid"),
                                s = {};
                            s.accessToken = o;
                            var l = e.Configuration.Urls.FacebookApp + a + "/GetUserInfo";
                            t.QueryApi(l, "post", s, function(e) {
                                i(e)
                            })
                        } else i(JSON.parse(r))
                    },
                    GetFacebookUserId: function(n, i) {
                        var r = e.Configuration.Urls.FacebookApi + "/" + n.id + "/?fields=id&access_token=" + n.token;
                        t.FacebookQueryApi(r, "get", "", function(e) {
                            i(e)
                        })
                    },
                    GetCategories: function(n, i) {
                        var r = e.Configuration.Urls.FacebookApi + "/" + n.id + "/albums?fields=images,name,id,height,width,source&access_token=" + n.token;
                        t.FacebookQueryApi(r, "get", "", function(e) {
                            i(e)
                        })
                    },
                    GetUserPhotos: function(n, i) {
                        var r = e.Configuration.Urls.FacebookApi + "/" + n.id + "/photos?fields=images,name,id,height,width,source&access_token=" + n.token;
                        t.FacebookQueryApi(r, "get", "", function(e) {
                            i(e)
                        })
                    },
                    GetImages: function(i, r) {
                        var o = "20",
                            a = e.Configuration.Urls.FacebookApi + "/" + i + "/photos?fields=images,name,id,height,width,source&access_token=" + n.UserToken + "&limit=" + o;
                        t.FacebookQueryApi(a, "get", "", function(e) {
                            r(e)
                        })
                    },
                    Get: function(e, n) {
                        t.FacebookQueryApi(e, "get", "", function(e) {
                            n(e)
                        })
                    }
                };
                return e.exports("Network.Connectors.Facebook", n)
            }(window.ServerSide || {}, ServerSide.Network.RestClient), window.ServerSide = function(e) {
                function t() {
                    return "undefined" != typeof l && null != l
                }

                function n(e) {
                    $("*[ref]").each(function() {
                        if (this.attributes.ref) {
                            var t = o(this.attributes.ref.value, e);
                            if ("" == t || null == t) this.attributes["hide-if-empty"] && "true" === this.attributes["hide-if-empty"].value.toLowerCase() && $(this).hide();
                            else {
                                try {
                                    $(this).val(t)
                                } catch (n) {}
                                try {
                                    $(this).html(t)
                                } catch (n) {}
                            }
                        }
                    }), $("font").removeAttr("size")
                }

                function i(t, n) {
                    var i = {
                        languageData: t
                    };
                    n && e.Lib.Utils.extend(i, n), e.Lib.Utils.SsgSerialiser.serialise("ViewData", i), l = t
                }

                function r(t) {
                    if (!d || !s) return t({});
                    var n = e.Lib.Utils.SsgSerialiser.deserialise("viewdata");
                    n && n.languageData ? t(n.languageData) : c.GetLanguage(d, s, function(e) {
                        t(e, n)
                    })
                }

                function o(e, t) {
                    try {
                        var n = e.split("."),
                            i = t[n[0]]
                    } catch (r) {
                        throw r
                    }
                    if (n.length < 2) return void 0 === i ? "" : i;
                    for (var o = 1; o < n.length; o++) i = void 0 === i ? "" : i[n[o]];
                    return void 0 === i ? "" : i
                }
                e.requires("Lib.Utils");
                var a, s, l, d, c = e.Network.Connectors.PCS.Designer,
                    u = function(a) {
                        var c = a || {};
                        s = c.Language, d = c.HandoverKey, r(function(e) {
                            i(e)
                        }), this.getLanguageSet = function(n) {
                            e.Lib.Utils.defer(function() {
                                n(l)
                            }, {
                                until: t
                            })
                        }, this.Apply = function() {
                            e.Lib.Utils.defer(function() {
                                n(l)
                            }, {
                                until: t
                            })
                        }, this.applyTag = function(e) {
                            return o(e, l)
                        }, this.getTagWhenLoaded = function(n, i) {
                            e.Lib.Utils.defer(function() {
                                i(o(n, l))
                            }, {
                                until: t
                            })
                        }, this.getText = function(e, t) {
                            return o(e, t || l)
                        }, this.localize = function(e, t, n, i) {
                            var r = $(e, t);
                            if (r && r.length > 0)
                                for (var o = 0; o < r.length; o++) {
                                    var a = r[o],
                                        s = a.getAttribute("data-ref");
                                    if (s) {
                                        var l = this.getText(s, i) || "";
                                        if (n instanceof Array)
                                            for (var d = 0; d < n.length; d++) a.setAttribute(n[d], l);
                                        else a[n] = l
                                    }
                                }
                        }
                    },
                    p = function(e) {
                        return "undefined" == typeof a && (a = new u(e)), a
                    };
                return e.exports("Framework.UI.Templating.RefLangTemplater", p)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Utils");
                var t, n = {
                        minutes: 6e3,
                        seconds: 1e3,
                        milliseconds: 1
                    },
                    i = 6e3,
                    r = "milliseconds",
                    o = function(e, t) {
                        return "number" == typeof n[e] ? t * n[e] : void 0
                    },
                    a = function(e) {
                        try {
                            $.ajax({
                                url: e,
                                type: "get",
                                async: !0
                            })
                        } catch (t) {}
                    },
                    s = function(e, n) {
                        var s = (n || {
                                period: null
                            }).period || i,
                            l = (n || {
                                units: null
                            }).units || r;
                        a = (n || {
                            period: null
                        }).action || a, s = o(l, s), this.start = function() {
                            try {
                                t = window.setInterval(function() {
                                    a(e)
                                }, s)
                            } catch (n) {}
                        }, this.stop = function() {
                            try {
                                window.clearInterval(t)
                            } catch (e) {}
                        }
                    };
                return e.exports("Components.KeepAlive", s)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Utils");
                var t = function() {
                    var t = this,
                        n = "passthrough";
                    return this.values = {}, this.getValue = function(e) {
                        var n = t.values;
                        return "" !== n && null !== n && e in n ? n[e] : ""
                    }, this.setValue = function(i, r, o) {
                        var a = "undefined" != typeof o && o === !0,
                            s = t.values;
                        ("" === s || null === s) && (s = {}), i in s ? a && (s[i] = r) : s[i] = r, e.Lib.Utils.SsgSerialiser.serialise(n, e.Lib.Utils.SsgUrl.createQuery(s))
                    }, this.storeValues = function(i, r) {
                        var o = {},
                            a = {};
                        for (var s in i) i.hasOwnProperty(s) && (a[s.toLowerCase()] = i[s]);
                        r ? $.extend(o, t.values, a) : $.extend(o, a, t.values), t.values = o, e.Lib.Utils.SsgSerialiser.serialise(n, e.Lib.Utils.SsgUrl.createQuery(o))
                    }, this.values = e.Lib.Utils.SsgUrl.parseQuery(e.Lib.Utils.SsgSerialiser.deserialise(n), !1), this
                };
                return e.exports("Framework.Utils.Passthrough", t)
            }(window.ServerSide || {}), window.ServerSide = function() {
                return _module = function(e) {
                    function t() {
                        d = null, c = 0, u = 0, p = 0, h = 0, g = 0, f = null
                    }

                    function n() {
                        if (w.allowedExtensions = w.allowedExtensions || ["jpeg", "jpg", "png", "gif", "bmp", "tif", "tiff"], w.acceptFiles = w.acceptFiles || "image/*", w.sizeLimit = w.sizeLimit || 10485760, w.minSizeLimit = w.minSizeLimit || 1, t(), m.setAttribute("style", "position: relative;overflow: hidden;direction: ltr;"), !S) {
                            var e = "upload_input_" + (new Date).getTime();
                            m.appendHtml(String.format(C, e, w.acceptFiles)), S = document.getElementById(e)
                        }
                        S.addEventListener("change", function() {
                            r()
                        })
                    }

                    function i(e) {
                        y.onError(0, d, e)
                    }

                    function r() {
                        var e = S.files[0];
                        if (d = e.name, y.onSubmit(0, d), -1 === w.allowedExtensions.indexOf(e.type.replace("image/", ""))) return i("typeError");
                        if (e.size > w.sizeLimit) return i("sizeError");
                        if (e.size < w.minSizeLimit) return i("minSizeError");
                        var t = new FileReader;
                        t.onload = function(t) {
                            v.src = t.target.result, v.onload = function() {
                                return sResultFileSize = bytesToSize(e.size), w.minSize && (v.naturalWidth < w.minSize.Width || v.naturalHeight < w.minSize.Height) ? i("minSizeError") : (f = {
                                    size: sResultFileSize,
                                    type: e.type,
                                    dimension: {
                                        width: v.naturalWidth,
                                        height: v.naturalHeight
                                    }
                                }, void(x && o()))
                            }
                        }, t.readAsDataURL(e)
                    }

                    function o() {
                        iPreviousBytesLoaded = 0, ServerSide.Lib.Utils.defer(function() {
                            y.onUpload(0, d, f)
                        }, {
                            until: function() {
                                return null !== f
                            }
                        });
                        var e = new FormData;
                        $.each(S.files, function(t, n) {
                            e.append(t, n)
                        });
                        var t = new XMLHttpRequest;
                        t.upload.addEventListener("progress", a, !1), t.addEventListener("load", s, !1), t.addEventListener("error", i, !1), t.addEventListener("abort", i, !1), t.open("POST", b.endpoint), t.send(e)
                    }

                    function a(e) {
                        e.lengthComputable ? (c = e.loaded, p = e.total, h = Math.round(100 * e.loaded / e.total), l()) : i("cantCompute")
                    }

                    function s(e) {
                        y.onComplete(0, d, JSON.parse(e.target.responseText))
                    }

                    function l() {
                        var e = c,
                            t = e - u;
                        if (0 != t) {
                            u = e, t = 2 * t;
                            var n = p - u,
                                i = n / t,
                                r = t.toString() + "B/s";
                            t > 1048576 ? r = (Math.round(100 * t / 1048576) / 100).toString() + "MB/s" : t > 1024 && (r = (Math.round(100 * t / 1024) / 100).toString() + "KB/s"), y.onProgress(0, d, c, p, h, r, secondsToTime(i))
                        }
                    }
                    var d, c, u, p, h, g, f, m = e.button,
                        v = e.preview || new Image,
                        b = e.request,
                        y = e.callbacks,
                        w = e.validation || {},
                        x = e.autoUpload || !1,
                        C = '<input id={0} accept="{1}" type="file" title="Choose an image" style="position: absolute; right: 0px; top: 0px; font-family: Arial; font-size: 18px; margin: 0px; padding: 0px; cursor: pointer; opacity: 0;">',
                        S = e.input || null;
                    return n(), {
                        upload: function() {
                            o()
                        },
                        hasUpload: function() {
                            return !!d
                        },
                        reset: function() {
                            t()
                        }
                    }
                }, ServerSide.exports("Framework.Utils.Upload", _module)
            }(window.ServerSide || {}), window.ServerSide = function() {
                return _module = function(e) {
                    function t(e) {
                        return new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$", "i").test(e)
                    }
                    return {
                        isEmailValid: t
                    }
                }, ServerSide.exports("Framework.Utils.ValidationHelper", _module)
            }(window.ServerSide || {}), window.ServerSide = function() {
                return _module = function(e) {
                    function t(e) {
                        return e && e.TextOnImage.Enabled && "v" !== e.Orientation.Type
                    }

                    function n(e) {
                        return e && null != e.Coverage.Logo
                    }

                    function i(e) {
                        return e && e.ClipArtEnabled === !0
                    }

                    function r(e) {
                        return e && ("Enabled" === e.DataCapture.EmailCapture || e.DataCapture.CustomDataCaptureEnabled === !0)
                    }

                    function o() {
                        for (var e = "", t = 0; s > t; t++) e += a.charAt(Math.floor(Math.random() * a.length));
                        return e
                    }
                    var a = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                        s = 8;
                    return {
                        isTextViewEnabled: t,
                        isLogoViewEnabled: n,
                        isClipArtEnabled: i,
                        isDataCaptureEnabled: r,
                        generateId: o
                    }
                }, ServerSide.exports("Framework.Utils.AppHelper", _module)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = {
                    StockImageGallery: function(t, n, i, r, o, a, s) {
                        function l(e) {
                            return "undefined" != typeof n && e in n ? n[e] : ""
                        }

                        function d(e) {
                            "function" == typeof E.onpagechange && E.onpagechange(e)
                        }

                        function c(e, t) {
                            "function" == typeof E.onimagechange && E.onimagechange(e, t)
                        }

                        function u(e, t) {
                            "function" == typeof E.onallimagesloaded && E.onallimagesloaded(e, t)
                        }

                        function p() {
                            t.innerHTML = "", w = document.createElement("div"), w.setAttribute("class", "outerDiv" + N), i > 1 && m(), t.appendChild(w)
                        }

                        function h() {
                            x = document.createElement("div"), x.setAttribute("class", "pagination"), x.style.display = "none", C = document.createElement("button"), C.setAttribute("title", "Previous gallery page"), C.id = "prevPage", C.onclick = function() {
                                _[T].currentPage > 1 && (_[T].currentPage--, b())
                            }, S = document.createElement("button"), S.setAttribute("title", "Next gallery page"), S.id = "nextPage", S.onclick = function() {
                                _[T].currentPage < _[T].pageIndex && (_[T].currentPage++, b())
                            }, k = document.createElement("div"), k.id = "paginationText", x.appendChild(C), x.appendChild(k), x.appendChild(S), t.appendChild(x)
                        }

                        function g(e) {
                            var t = new Image;
                            return t.src = e, t
                        }

                        function f(e) {
                            var t = document.createElement("div");
                            return t.style.backgroundSize = "cover", t.style.backgroundPosition = "center", t.style.backgroundRepeat = "no-repeat", t.setAttribute("class", "gallery-img"), t.setAttribute("alt", e), t
                        }

                        function m() {
                            for (var e = 0; i > e; e++) B[e] = document.createElement("div"), B[e].setAttribute("id", "row" + (e + 1)), B[e].setAttribute("class", "gallery-row"), w.appendChild(B[e])
                        }

                        function v(e) {
                            for (var t = 0, n = 0; i > n; n++) B[n].children.length < P && (P = B[n].children.length, t = n);
                            B[t].appendChild(e), P = B[t].children.length
                        }

                        function b() {
                            $(".imgCont").hide(), $catImgList = $(".imgCont." + T + ".pag" + _[T].currentPage), $catImgList.fadeIn(), x.style.display = "block", $(k).html(String.format(a.text, _[T].currentPage, _[T].pageIndex)), $(C).removeClass("active"), $(S).removeClass("active"), _[T].currentPage > 1 && $(C).addClass("active"), _[T].currentPage < _[T].pageIndex && $(S).addClass("active"), d(_[T].currentPage)
                        }

                        function y(e) {
                            return "undefined" != typeof e && null != e
                        }
                        var w, x, C, S, k, E = this,
                            T = null,
                            _ = {},
                            L = 0,
                            I = 0,
                            D = e.Configuration.Images.DefaultGallerySize,
                            A = null,
                            M = null,
                            B = [],
                            P = 0,
                            H = {
                                Upload: -1,
                                Search: -2
                            },
                            N = r ? " v" : "",
                            z = r ? " rotate" : "";
                        return i = void 0 === typeof i ? 0 : i, E.onimagechange = null, E.onallimagesloaded = null, p(), a && h(), this.setVisibility = function(e) {
                            t.style.display = e ? "block" : "none"
                        }, this.showCustomMessage = function(e) {
                            null === M ? "undefined" != typeof e && (M = document.createElement("span"), M.setAttribute("id", "messageCont"), M.innerHTML = l(e), t.appendChild(M)) : M.style.display = "block"
                        }, this.hideCustomMessage = function() {
                            null !== M && (M.style.display = "none")
                        }, this.createErrorContainer = function() {
                            A = document.createElement("div"), A.setAttribute("class", "errorCont"), A.innerHTML = "<div id='errorImage'></div><span id='errorText'>" + l("galleryKeywordFail") + "</span>";
                            var e = document.createElement("a");
                            e.setAttribute("href", "#/"), e.setAttribute("id", "closeError"), e.onclick = function() {
                                E.closeError()
                            }, A.appendChild(e), t.appendChild(A)
                        }, this.addImage = function(e, t, n, r, s) {
                            var l = y(r) ? r : t.Name,
                                d = y(s) ? s : T,
                                p = document.createElement("button"),
                                h = "";
                            if (L++, a && o) {
                                var m = Math.ceil(L / o);
                                m > _[d].pageIndex && (_[d].pageIndex++, $(x).show(), $(S).removeClass("active").addClass("active"), $(k).html(String.format(a.text, _[d].currentPage, _[d].pageIndex))), m > 1 && (p.style.display = "none"), h = " pag" + _[d].pageIndex
                            }
                            p.setAttribute("class", "imgCont " + d + h + " loading"), p.setAttribute("title", l + " image "), $(p).addClass("tab-item"), p.setAttribute("type", "button"), p.fadeImg = function() {
                                C.style.opacity = .2, $(this).addClass("loading")
                            }, p.addEventListener("click", function(e) {
                                c(p, e)
                            });
                            var b = g(e),
                                C = f(l);
                            C.Id = y(n) ? n : t.Id, p.setAttribute("id", C.Id), y(t) && (C.data = t), b.onload = function() {
                                this.width > this.height && (C.className += z), C.style.backgroundImage = "url('" + this.src + "')", C.style.opacity = 1, $(p).removeClass("loading"), I++, L === I && (I = 0, u(w, L))
                            }, p.appendChild(C), y(s) && s !== T && s != H.Search && (p.style.display = "none"), i > 1 ? v(p) : w.appendChild(p)
                        }, this.clearImages = function() {
                            if (i > 1)
                                for (var e = 0; i > e; e++) B[e].innerHTML = "";
                            else w.innerHTML = ""
                        }, this.showError = function() {
                            A && (w.style.display = "none", A.style.display = "block", "function" == typeof E.onSearchFail && E.onSearchFail())
                        }, this.hideError = function() {
                            A && (A.style.display = "none", w.style.display = "block")
                        }, this.closeError = function() {
                            var e = "#" + t.id + " ";
                            E.hideError(), $(e + "." + H.Search).hide();
                            var n = $("." + T);
                            n.show(), n.parent().hasClass("activeImage") && n.parent().show(), E.updateContainerWidth(D)
                        }, this.setActiveImage = function(e, n, i) {
                            var r = "#" + t.id + " ",
                                o = a ? "" : ":visible",
                                s = $(r).find("#" + e + ":not(." + H.Search + ")" + o);
                            if (s.length > 0) {
                                if (n && a && _[T].pageIndex > 1) {
                                    var l = s.attr("class").match(/pag(\d+)/);
                                    _[T].currentPage = l.length > 0 ? parseInt(l[1]) : 1, b()
                                }
                                var d = $(r + ".active.imgCont");
                                if (d.attr("aria-label", "not selected"), d.removeClass("active"), !i) {
                                    var c = d.parent();
                                    "activeImage" === c.attr("class") && d.unwrap()
                                }
                                var u = $(w).find("#" + e);
                                u.addClass("active"), i || (u.wrap("<div class='activeImage'></div>"), u.hasClass(T) || u.parent().hide()), u.attr("aria-label", "selected")
                            }
                        }, this.filterImagesByAltValue = function(e) {
                            var t = e.split(" "),
                                n = "" === t[t.length - 1] && t.length > 1 ? t.length - 1 : t.length,
                                i = [],
                                r = 0;
                            return $(w).find(".gallery-img").each(function() {
                                for (var e = !1, o = $(this), a = 0; n > a; a++)
                                    if (o.attr("alt").toLowerCase().indexOf(t[a].toLowerCase()) >= 0) {
                                        e = !0;
                                        break
                                    }
                                var s = o.parent();
                                e ? (s.parent().hasClass("activeImage") ? (s.parent().show(), s.show()) : s.show(), i[r] = o.attr("alt"), r++) : s.parent().hasClass("activeImage") ? s.parent().hide() : s.hide()
                            }), i
                        }, this.setCategoryId = function(e) {
                            T = e
                        }, this.getCurrentCategory = function() {
                            return T
                        }, this.setCategory = function(e) {
                            L = 0;
                            var n = "#" + t.id + " ";
                            t.scrollLeft = 0, null != T && ($(n + ".imgCont").hide(), $(n + ".activeImage").hide()), $(n + "." + e).show(), $(n + ".activeImage ." + e).length > 0 && $(n + ".activeImage ." + e).parent().show(), T = e, a && (_[e] || (_[e] = {
                                pageIndex: 1,
                                currentPage: 1
                            }), 1 === _[e].pageIndex ? x.style.display = "none" : b())
                        }, this.updateContainerWidth = function(e) {
                            var t;
                            if ("ontouchstart" in window) {
                                var n = $(".imgCont:visible").length,
                                    i = 1.1 * parseInt($(".imgCont:visible").css("width")),
                                    r = parseInt($(".imgCont:visible").css("height")),
                                    o = parseInt($(w).parent().css("height")),
                                    a = Math.floor(o / r);
                                t = i * Math.ceil(n / a), w.style.width = t + "px"
                            } else {
                                t = e * Math.ceil($(".imgCont:visible").length / 2) + "px"
                            }
                            w.style.width = t
                        }, this.containsCategoryById = function(e) {
                            return t.getElementsByClassName(e).length > 0
                        }, this
                    },
                    GallerySelector: function(e) {
                        function t(e) {
                            var t = document.createElement("option");
                            return t.innerHTML = e, t.value = e, t.onclick = function() {
                                this.blur(), o.blur()
                            }, t
                        }

                        function n() {
                            "function" == typeof i.oncategorychange && i.oncategorychange(o.options[o.selectedIndex], o.options[o.selectedIndex].data)
                        }
                        var i = this;
                        this.oncategorychange = null;
                        var r = {},
                            o = document.createElement("select");
                        o.setAttribute("id", "galleryDropdown"), o.setAttribute("class", "innerShadow"), o.onchange = n;
                        var a = document.createElement("div");
                        a.setAttribute("id", "gallery-select"), a.setAttribute("class", "styledSelect");
                        var s = document.createElement("div");
                        return s.setAttribute("id", "selectorDiv"), a.appendChild(o), s.appendChild(a), e.innerHTML = "", e.appendChild(s), this.addCategoryAtTop = function(e, n) {
                            var i = t(e);
                            i.data = n, o.firstChild ? o.insertBefore(i, o.firstChild) : o.appendChild(i);
                            for (var a in r) r[a]++;
                            var s = n.Id || n.id;
                            r[s] = i.index
                        }, this.addCategory = function(e, n, i) {
                            var a = t(e);
                            a.data = n, "undefined" != typeof i && null != i ? o.add(a, o.options[i]) : o.appendChild(a);
                            var s = n.Id || n.id;
                            r[s] = o.options.length - 1
                        }, this.containsCategory = function(e) {
                            for (var t = 0; t < o.options.lenght; t++)
                                if (o.options[t].value === e) return !0;
                            return !1
                        }, this.setActiveCategoryIndex = function(e) {
                            o.selectedIndex = r[e]
                        }, this.setActiveCategory = function(e) {
                            o.selectedIndex = r[e], n()
                        }, this.setVisibility = function(t) {
                            e.style.display = t ? "block" : "none"
                        }, this
                    },
                    FlatGallerySelector: function(e, t) {
                        function n() {
                            if (r.categories && r.categories.forEach(function(e) {
                                    i.addCategory(e.Name, e)
                                }), r.selectedCategory) {
                                i.selectedId = r.selectedCategory;
                                for (var e = 0, t = i.categories.length; t > e; e++) {
                                    var n = i.categories[e];
                                    n.id === i.selectedId && (i.placeholder.innerHTML = n.name)
                                }
                            }
                        }
                        var i = this;
                        i.dropDown = $(e), i.placeholder = $(i.dropDown).find("span")[0], i.opts = $(i.dropDown).find("ul.dropdown")[0], i.val = "", i.selectedId = -1, i.categories = [];
                        var r = t || {};
                        this.oncategorychange = r.onCategoryChange || function() {};
                        return i.dropDown.on("click", function() {
                            return i.dropDown.toggleClass("active"), !1
                        }), this.addCategoryAtTop = function(e, t) {
                            var n = t.Id || t.id,
                                r = this.addOption(n, e);
                            i.categories.unshift({
                                id: t.Id || t.id,
                                name: e,
                                data: t
                            }), $(i.opts).prepend(r), 1 === i.categories.length && (i.placeholder.innerHTML = e)
                        }, this.addCategory = function(e, t) {
                            var n = t.Id || t.id,
                                r = this.addOption(n, e);
                            i.categories.push({
                                id: t.Id || t.id,
                                name: e,
                                data: t
                            }), $(i.opts).append(r), 1 === i.categories.length && (i.placeholder.innerHTML = e)
                        }, this.setActiveCategory = function(e) {
                            i.selectedId = e;
                            for (var t = 0, n = i.categories.length; n > t; t++) {
                                var r = i.categories[t];
                                r.id === e && (i.placeholder.innerHTML = r.name, i.oncategorychange(i, r.data))
                            }
                        }, this.setVisibility = function(t) {
                            e.style.display = t ? "block" : "none"
                        }, this.getCategories = function() {
                            return this.categories
                        }, this.addOption = function(e, t) {
                            var n = $('<li class="list-item" id="' + e + '"><a class="" href="#">' + t + "</a></li>");
                            return n.on("click", function(e) {
                                e.preventDefault();
                                var t = parseInt($(e.target).parent().attr("id"));
                                i.setActiveCategory(t)
                            }), n
                        }, n(), this
                    },
                    GallerySearch: function(e, t) {
                        function n(e) {
                            return "undefined" != typeof t && e in t ? t[e] : ""
                        }

                        function i(e) {
                            13 === e.keyCode && r()
                        }

                        function r() {
                            "function" == typeof o.onsearchclick && o.onsearchclick(s.value.trim())
                        }
                        var o = this;
                        o.onsearchclick = null;
                        var a = document.createElement("span");
                        a.setAttribute("id", "search-text"), a.innerHTML = n("galleryKeyword");
                        var s = document.createElement("input");
                        s.type = "text", s.setAttribute("id", "search-box"), s.setAttribute("class", "textbox1"), s.onkeyup = i;
                        var l = document.createElement("input");
                        return l.type = "button", l.onclick = r, l.setAttribute("id", "go-button"), l.setAttribute("class", "bar-button"), l.setAttribute("value", n("galleryKeywordGo")), e.innerHTML = "", e.appendChild(a), e.appendChild(s), e.appendChild(l), this.setVisibility = function(t) {
                            e.style.display = t ? "block" : "none"
                        }, this.clearSearchText = function() {
                            s.value = ""
                        }, this
                    }
                };
                return e.exports("Components.Gallery.Controller", t)
            }(window.ServerSide || {}), window.ServerSide = function() {
                return _module = function(e) {
                    function t(e) {
                        n.style.width = e + "%"
                    }
                    var n = document.createElement("div");
                    e.appendChild(n), t(0), this.setPercentage = function(e) {
                        if (e > 100 || 0 > e) throw "LoadingBar.setPercentage value is out of sensible bounds (0->100)";
                        t(e)
                    }, this.setInnerText = function(e) {
                        n.innerHTML = e
                    }, this.hide = function() {
                        n.style.visibility = "hidden"
                    }, this.show = function() {
                        n.style.visibility = "visible"
                    }
                }, ServerSide.exports("Framework.UI.LoadingBar", _module)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Utils");
                var t = function(t, n, i, r, o) {
                    function a(e) {
                        return "undefined" != typeof passthrough && e.toLowerCase() in passthrough ? passthrough[e.toLowerCase()] : ""
                    }

                    function s(e) {
                        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || 65 == e.keyCode && e.ctrlKey === !0 || e.keyCode >= 35 && e.keyCode <= 39 || (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105) && e.preventDefault()
                    }

                    function l(e) {
                        e.preventDefault()
                    }

                    function d(e) {
                        var t = this.childNodes[0];
                        return t.options[t.selectedIndex].value
                    }

                    function c(e) {
                        return this.checked ? "True" : "False"
                    }

                    function u(e) {
                        return this.value
                    }

                    function p(e) {
                        var t = new RegExp("^[0-9]+$");
                        return t.test(this.value)
                    }

                    function h(e) {
                        var t = new RegExp(this.regexp, "i");
                        return t.test(this.value)
                    }

                    function g(e, t) {
                        var n = document.createElement("span");
                        return n.className = "data-capture-label", n.innerHTML = e, t && $(n).addClass("required-field"), n
                    }

                    function f(e) {
                        var t = document.createElement("div");
                        return t.className = "validation", L || (t.innerHTML = e ? "*" : ""), t
                    }

                    function m(e) {
                        var t;
                        switch (e.Type) {
                            case "DropDown":
                                t = D(e);
                                break;
                            case "CheckBox":
                                t = A(e);
                                break;
                            default:
                                t = M(e)
                        }
                        return !e.AllowUserEdit && t.validPassthrough && (t.disabled = !0, "DropDown" === e.Type && (t.className += " disabledDD", t.childNodes[0].disabled = !0)), e.Mandatory && (t.mandatory = !0), t.setAttribute("id", e.Key), t.className += " dcElement", t.label = e.Label, t.returnOnHandback = e.HandbackValue, T.push(t), t
                    }

                    function v() {
                        $("#dataCapture .active", n).removeClass("active"), $(".validation", n).html("")
                    }

                    function b(e) {
                        e.addClass("active"), e.html("")
                    }

                    function y(e) {
                        var t = document.createElement("option");
                        return t.innerHTML = e.Key, t.value = e.Value, e.Default && (t.selected = !0), t
                    }

                    function w(e, t) {
                        _ ? C(e, t) : x(e, t)
                    }

                    function x(e, t) {
                        var n = document.createElement("td");
                        n.className = "tdLabel";
                        var i = document.createElement("td");
                        i.className = "tdElement", n.appendChild(g(t.Label)), i.appendChild(m(t)), e.appendChild(n), e.appendChild(i);
                        var r = f(t.Mandatory),
                            o = document.createElement("td");
                        o.appendChild(r), o.className = "tdValidation", e.appendChild(o)
                    }

                    function C(e, t) {
                        if ("CheckBox" === t.Type) {
                            var n = document.createElement("td");
                            n.className = "tdElement", n.appendChild(m(t)), n.appendChild(g(t.Label, t.Mandatory)), e.appendChild(n);
                            var i = f();
                            n.appendChild(i), n.colSpan = "3"
                        } else {
                            var r = document.createElement("td");
                            r.className = "tdLabel";
                            var n = document.createElement("td");
                            n.className = "tdElement", r.appendChild(g(t.Label, t.Mandatory)), n.appendChild(m(t)), e.appendChild(r), e.appendChild(n);
                            var i = f(t.mandatory),
                                o = document.createElement("td");
                            o.appendChild(i), o.className = "tdValidation", e.appendChild(o)
                        }
                    }

                    function S(e) {
                        var t = document.createElement("div");
                        return t.className = "data-capture-item", t.appendChild(g(e.Label, e.Mandatory)), t.appendChild(m(e)), t.appendChild(f(e.Mandatory)), t
                    }
                    o || (o = {});
                    var k = document.createElement("table"),
                        E = document.createElement("tbody"),
                        T = [],
                        _ = o.isSingleColumn || !1,
                        L = o.hideInitialValidationContent || !1;
                    passthrough = (new e.Framework.Utils.Passthrough).values || [], i = i || {
                        checkbox: {
                            invalid: ""
                        },
                        regexp: {
                            invalid: "",
                            numericOnly: ""
                        },
                        input: {
                            length: ""
                        },
                        email: {
                            invalid: "",
                            mandatory: "",
                            label: "",
                            confirmlabel: "",
                            nomatch: ""
                        },
                        mandatory: "",
                        competition: {
                            label: ""
                        }
                    }, k.setAttribute("id", "dataCapture");
                    var I, D = function(e) {
                            var t = document.createElement("select");
                            t.className += " ssgDropDown", t.setAttribute("tabindex", e.index);
                            var n = document.createElement("div");
                            n.className += " ssg-select";
                            for (var i = 0; i < e.Options.length; i++) {
                                var r = y(e.Options[i]);
                                t.appendChild(r)
                            }
                            var o = a(e.Key);
                            if ("" != o) {
                                t.validPassthrough = !1;
                                for (var i = 0; i < t.options.length; i++)
                                    if (t.options[i].value === o) {
                                        t.selectedIndex = i, n.validPassthrough = !0;
                                        break
                                    }
                            }
                            return n.appendChild(t), n.isValid = n.getValue = d, n
                        },
                        A = function(e) {
                            var t = document.createElement("input");
                            t.type = "checkbox", t.validationMessages = {}, t.setAttribute("tabindex", e.index);
                            var n = "" !== e.Default ? e.Default : "",
                                r = a(e.Key),
                                o = "" !== r ? r : n;
                            return "true" === o ? (t.checked = !0, t.validPassthrough = !0) : "false" !== o && (t.validPassthrough = !1), t.isValid = function() {
                                return !this.mandatory || this.checked && this.mandatory
                            }, t.getValue = c, t.validationMessages.invalid = t.validationMessages.mandatory = i.checkbox.invalid, t
                        },
                        M = function(e) {
                            var t = document.createElement("input"),
                                n = null != e.Length && 0 !== e.Length,
                                r = "" !== e.Default ? e.Default : "",
                                o = a(e.Key),
                                d = "" !== o ? o : r;
                            switch (t.validPassthrough = "" !== o, t.className = "textbox1", t.validationMessages = {}, t.setAttribute("tabindex", e.index), t.type = "text", e.Type) {
                                case "Numeric":
                                    t.onkeydown = s, t.onpaste = l, t.value = d, t.isValid = p, t.validationMessages.invalid = String.format(i.regexp.numericOnly, e.Label), t.type = "number";
                                    break;
                                case "RegExp":
                                    var c = i.regexp.custom ? i.regexp.custom[e.Key] : i.regexp.invalid;
                                    t.value = o, t.regexp = r, t.isValid = h, t.onpaste = l, t.validationMessages.invalid = String.format(c, e.Label);
                                    break;
                                default:
                                    t.value = d
                            }
                            return n && (t.maxLength = e.Length, t.validationMessages.length = String.format(i.input.length, e.Label, e.Length)), t.getValue = u, t.validationMessages.mandatory = String.format(i.mandatory, e.Label), t
                        },
                        B = function(e) {
                            return this.validateFields("undefined" != typeof e && e)
                        },
                        P = function(e) {
                            this.removeAllValidationWarnings();
                            for (var t = this.dcElements, n = [], i = 0, r = 0; r < t.length; r++) {
                                var o = t[r];
                                o.disabled || (o.mandatory && "" === o.getValue() && (e ? $(o).addClass("active") : this.addValidationWarning($(o).parent().next().find(".validation")), n[i] = o.validationMessages.mandatory, i++), "" !== o.getValue() && null != o.maxlength && o.value.length < o.maxlength && (e ? $(o).addClass("active") : this.addValidationWarning($(o).parent().next().find(".validation")), n[i] = o.validationMessages.length, i++), "" === o.getValue() || null == o.isValid || o.isValid() || (e ? $(o).addClass("active") : this.addValidationWarning($(o).parent().next().find(".validation")), n[i] = o.validationMessages.invalid, i++))
                            }
                            return n
                        },
                        H = function(e) {
                            for (var t = {}, n = T, i = 0; i < n.length; i++) {
                                var r = n[i],
                                    o = r.getValue(),
                                    a = e ? r.returnOnHandback : !0;
                                a && (t[r.getAttribute("id")] = o)
                            }
                            for (var i = 0; i < z.length; i++) t[z[i].Key] = "RegExp" === z[i].Type ? "" : z[i].Default;
                            return t
                        },
                        N = [],
                        z = [],
                        O = 0,
                        U = 0,
                        R = 0,
                        F = 0,
                        G = 0;
                    G = o.maxRows ? o.maxRows : r ? 2 * e.Configuration.DataCapture.MaxRows : e.Configuration.DataCapture.MaxRows;
                    for (var j = 0; j < t.length; j++) {
                        if (t[j].Display) N[O] = t[j], O++;
                        else if (t[j].HandbackValue) {
                            var W = a(t[j].Key);
                            "" !== W && (t[j].Default = W), z[U] = t[j], U++
                        }
                        t[j].index = j + 1
                    }
                    if (N.length > G ? (I = F = G, R = N.length - G) : I = N.length, o.isSingleColumn)
                        for (var j = 0; I > j; j++) n.appendChild(S(N[j])), 0 !== R && (n.appendChild(S(N[F])), R--, F++);
                    else {
                        for (var j = 0; I > j; j++) {
                            var V = document.createElement("tr");
                            w(V, N[j]), 0 !== R && (w(V, N[F]), R--, F++), E.appendChild(V)
                        }
                        k.appendChild(E), n && n.appendChild(k)
                    }
                    return {
                        dcElements: T,
                        getValues: H,
                        getValidationMessages: B,
                        validateFields: P,
                        _createFieldset: w,
                        removeAllValidationWarnings: v,
                        addValidationWarning: b
                    }
                };
                return e.exports("Components.DataCapture.Controller", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = {
                    email: function(e, t, n) {
                        function i(e) {
                            return "undefined" != typeof t && e in t ? decodeURIComponent(t[e]) : ""
                        }

                        function r(e, t) {
                            var n = document.createElement("td");
                            n.className = "tdLabel";
                            var r = document.createElement("td");
                            r.className = "tdElement";
                            var o = document.createElement("td");
                            o.className = "tdValidation";
                            var a = document.createElement("div");
                            a.className = "emailValidation", a.innerHTML = "*", o.appendChild(a);
                            var s = document.createElement("span");
                            s.innerHTML = t, n.appendChild(s);
                            var l = document.createElement("input");
                            l.type = "email", l.label = t, l.className = "textbox1", l.isValid = function() {
                                var e = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$", "i");
                                return e.test(this.value)
                            };
                            var d = i("emailaddress");
                            "" != d && (l.value = d), e.getInputField = function() {
                                return l
                            }, e.getValidationField = function() {
                                return a
                            }, r.appendChild(l), e.appendChild(n), e.appendChild(r), e.appendChild(o)
                        }

                        function o() {
                            $("#emailCapture .active").removeClass("active"), $(".emailValidation").html("*")
                        }

                        function a(e) {
                            $(e).addClass("active"), $(e).html("")
                        }
                        var s = document.createElement("table");
                        s.setAttribute("id", "emailCapture");
                        var l = document.createElement("tr");
                        r(l, n.email.label);
                        var d = document.createElement("tr");
                        return r(d, n.email.confirmlabel), this.getValidationMessages = function(e) {
                            var t = "undefined" != typeof e && e;
                            o();
                            var i = new Array,
                                r = l.getInputField(),
                                s = d.getInputField(),
                                c = l.getValidationField(),
                                u = d.getValidationField(),
                                p = 0;
                            return ("" === r.value || "" === s.value) && (t ? ($(r).addClass("active"), $(s).addClass("active")) : (a(c), a(u)), i[p] = n.email.mandatory, p++), r.isValid() && s.isValid() || (t ? ($(r).addClass("active"), $(s).addClass("active")) : (a(c), a(u)), i[p] = n.email.invalid, p++), r.value !== s.value && (t ? ($(r).addClass("active"), $(s).addClass("active")) : (a(c), a(u)), i[p] = n.email.nomatch, p++), i
                        }, this.getEmailValue = function() {
                            return l.getInputField().value
                        }, s.appendChild(l), s.appendChild(d), e.appendChild(s), this
                    },
                    competition: function(e, t) {
                        var n = document.createElement("table");
                        n.setAttribute("id", "competition");
                        var i = document.createElement("tr");
                        i.innerHTML = "<td colspan=3></td>";
                        var r = document.createElement("tr"),
                            o = document.createElement("td");
                        o.setAttribute("class", "tdLabel"), o.innerHTML = t.competition.label;
                        var a = document.createElement("td");
                        a.setAttribute("class", "tdElement"), a.setAttribute("colspan", "2");
                        var s = document.createElement("input");
                        s.setAttribute("id", "chkCompetition"), s.type = "checkbox", s.checked = !0, a.appendChild(s), r.appendChild(o), r.appendChild(a), n.appendChild(i), n.appendChild(r), e.appendChild(n), this.isChecked = function() {
                            return s.checked
                        }
                    }
                };
                return e.exports("Components.DataCapture.EmailCapture", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(e) {
                    function t(e) {
                        var t = document.createElement("li");
                        t.innerHTML = e, o.appendChild(t)
                    }

                    function n() {
                        o.innerHTML = ""
                    }
                    var i = document.createElement("div");
                    i.setAttribute("id", "validationContainer");
                    var r = document.createElement("div");
                    r.setAttribute("id", "validationImage");
                    var o = document.createElement("ul");
                    return this.addMessages = function(e, i) {
                        n();
                        for (var r = i && e.length >= i ? i : e.length, o = 0; r > o; o++) t(e[o])
                    }, i.appendChild(r), i.appendChild(o), e.appendChild(i), this
                };
                return e.exports("Components.DataCapture.Validation", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Dom.EventHandler"), e.requires("Lib.Utils");
                var t = function(t, n, i, r) {
                    var o = this,
                        a = 1,
                        s = 1,
                        l = e.Lib.Utils.options(r);
                    n.style.backgroundImage = "url(" + t + ")", this.setMode = function(e) {
                        if (!(e in i)) throw "CssSprite :: mode '" + e + "' was not found";
                        var t = -Math.round(i[e].x * a),
                            r = -Math.round(i[e].y * s);
                        n.style.backgroundPosition = t + "px " + r + "px"
                    }, e.Lib.Dom.EventHandler.addHandler(window, "load", function() {
                        if (l.isNotNullObject("tileSize") && l.isNotNullObject("sheetSize")) {
                            a = n.clientWidth / r.tileSize.width, s = n.clientHeight / r.tileSize.height;
                            var e = r.sheetSize.width * a,
                                t = r.sheetSize.height * s;
                            n.style.backgroundSize = e + "px " + t + "px"
                        }
                        l.isNotNullString("defaultMode") && o.setMode(r.defaultMode)
                    }), r.defaultMode && this.setMode(r.defaultMode)
                };
                return e.exports("Framework.UI.CssSprite", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Framework.Eventing.EventCollection"), e.requires("Framework.UI.CssSprite");
                var t = {
                    CssButton: function(t, n, i) {
                        function r(e, t) {
                            a.fireEvent(e, t)
                        }
                        if (!t) throw new B("Button element is not defined");
                        var o = {
                                disabled: "disabled",
                                activated: "activated",
                                deactivated: "deactivated"
                            },
                            a = new e.Framework.Eventing.EventCollection,
                            s = !0,
                            l = o.activated,
                            d = function(e) {
                                "string" == typeof n[e] && (t.className = t.className.replace(n[l], ""), t.className = t.className + " " + n[e], l = e)
                            };
                        t.onclick = function(e) {
                            s && r("onclick", e)
                        }, this.disable = function() {
                            s = !1, d(o.disabled)
                        }, this.activate = function() {
                            s = !0, d(o.activated)
                        }, this.deactivate = function() {
                            s = !0, d(o.deactivated)
                        }, this.registerEventHandler = function(e, t) {
                            a.registerEventHandler(e, t)
                        }, this.getEventName = function() {
                            return t.getAttribute("eventname")
                        }
                    },
                    FastButton: function(t, n, i, r) {
                        function o(e, t) {
                            l.fireEvent(e, t)
                        }
                        var a = !0,
                            s = new e.Framework.UI.CssSprite(n, t, i, r),
                            l = new e.Framework.Eventing.EventCollection;
                        t.onclick = function(e) {
                            a && o("onclick", e)
                        }, this.disable = function() {
                            a = !1, s.setMode("inactive")
                        }, this.activate = function() {
                            a = !0, s.setMode("active")
                        }, this.deactivate = function() {
                            a = !0, s.setMode("active")
                        }, this.registerEventHandler = function(e, t) {
                            l.registerEventHandler(e, t)
                        }, this.getEventName = function() {
                            return t.getAttribute("eventname")
                        }
                    },
                    Button: function(t, n) {
                        function i(e, t) {
                            a.fireEvent(e, t)
                        }
                        var r = "Skins/ClassicWhite/Mobile/images/";
                        n && n.resourceLocation ? r = n.resourceLocation : "string" == typeof n && (r = n);
                        var o = t + "-button",
                            a = new e.Framework.Eventing.EventCollection,
                            s = !0,
                            l = document.getElementById(o);
                        if (null === l) throw "No image is associated with the button : " + o;
                        var d = "IMG" === l.tagName || "INPUT" === l.tagName ? l : l.getElementsByTagName("img")[0],
                            c = r + o + "-active.png",
                            u = r + o + "-inactive.png",
                            p = r + o + "-disabled.png";
                        l.onclick = function(e) {
                            s && i("onclick", e)
                        }, this.disable = function() {
                            d.src = p, d.disabled = !0, s = !1
                        }, this.activate = function() {
                            d.src = c, d.disabled = !1, s = !0
                        }, this.deactivate = function() {
                            d.src = u, d.disabled = !1, s = !0
                        }, this.registerEventHandler = function(e, t) {
                            a.registerEventHandler(e, t)
                        }, this.getEventName = function() {
                            return l.getAttribute("eventname")
                        }
                    },
                    Slider: function(t, n) {
                        function i(e) {
                            a.fireEvent("onclick", parseInt(e))
                        }

                        function r(e, t, n) {
                            var i = parseInt(u.slider("value")) + e;
                            t(i) && (i = n), u.slider("value", i)
                        }
                        var o = t + "-slider",
                            a = new e.Framework.Eventing.EventCollection,
                            s = n && n.maxScale ? n.maxScale : 200,
                            l = n && n.minScale ? n.minScale : 10,
                            d = 1,
                            c = document.getElementById(o),
                            u = jQuery(c);
                        u.slider({
                            from: l,
                            to: s,
                            step: d,
                            skin: n && n.sliderSkinName ? n.sliderSkinName : "classicwhite",
                            limits: !1,
                            onstatechange: i,
                            dimension: "%"
                        }), this.registerEventHandler = function(e, t) {
                            a.registerEventHandler(e, t)
                        }, this.activate = function() {
                            u.next().show(), u.prev().hide(), $("#slider-td").removeClass("slider-td-disabled")
                        }, this.deactivate = function() {
                            u.next().show(), u.prev().hide(), $("#slider-td").removeClass("slider-td-disabled")
                        }, this.disable = function() {
                            u.next().hide(), u.prev().show(), $("#slider-td").addClass("slider-td-disabled")
                        }, this.getEventName = function() {
                            return c.getAttribute("eventname")
                        }, this.incValue = function() {
                            r(2, function(e) {
                                return e > s
                            }, s)
                        }, this.decValue = function() {
                            r(-2, function(e) {
                                return l > e
                            }, l)
                        }, this.setScale = function(e) {
                            u.slider("value", e)
                        }
                    },
                    Combo: function(e, n, i) {
                        var r = i ? i.minusButton : new t.Button("scaledown", n),
                            o = i ? i.plusButton : new t.Button("scaleup", n),
                            a = new t.Slider("scale", n);
                        o.registerEventHandler("onclick", function(e) {
                            a.incValue()
                        }), r.registerEventHandler("onclick", function(e) {
                            a.decValue()
                        }), this.registerEventHandler = function(e, t) {
                            a.registerEventHandler(e, t)
                        }, this.activate = function() {
                            r.activate(), o.activate(), a.activate()
                        }, this.deactivate = function() {
                            r.deactivate(), o.deactivate(), a.deactivate()
                        }, this.getEventName = function() {
                            return a.getEventName()
                        }, this.setScale = function(e) {
                            a.setScale(e)
                        }, this.disable = function(e) {
                            r.disable(), o.disable(), a.disable()
                        }
                    },
                    NativeRange: function(n, i, r) {
                        r = r || {};
                        var o = i ? i.minusButton : new t.Button("scaledown", r),
                            a = i ? i.plusButton : new t.Button("scaleup", r),
                            s = new e.Framework.Eventing.EventCollection,
                            l = $(n);
                        l.val(r.defaultValue || 100), l.on("input", function(e) {
                            s.fireEvent("onscalechange", parseInt(l.val()))
                        }), l.on("change", function(e) {
                            s.fireEvent("onscalechange", parseInt(l.val()))
                        }), a.registerEventHandler("onclick", function(e) {
                            l[0].stepUp(), s.fireEvent("onscalechange", parseInt(l.val()))
                        }), o.registerEventHandler("onclick", function(e) {
                            l[0].stepDown(), s.fireEvent("onscalechange", parseInt(l.val()))
                        }), this.registerEventHandler = function(e, t) {
                            s.registerEventHandler(e, t)
                        }, this.activate = function() {
                            o.activate(), a.activate(), l.prop("disabled", !1)
                        }, this.deactivate = function() {
                            o.deactivate(), a.deactivate(), l.prop("disabled", !1)
                        }, this.disable = function() {
                            o.disable(), a.disable(), l.prop("disabled", !0)
                        }, this.getEventName = function() {
                            return l.prop("eventname")
                        }, this.setScale = function(e) {
                            l.val(e), s.fireEvent("onscalechange", parseInt(l.val()))
                        }
                    },
                    Section: function(n, i, r) {
                        function o(e, t) {
                            s && c.fireEvent(e, t)
                        }
                        var a = [],
                            s = !1,
                            l = n + "-controls",
                            d = document.getElementById(l),
                            c = new e.Framework.Eventing.EventCollection;
                        this.registerEventHandler = function(e, t) {
                            c.registerEventHandler(e, t)
                        }, this.activate = function() {
                            d && (d.style.display = "block");
                            for (var e = 0; e < a.length; e++) a[e].deactivate();
                            s = !0
                        }, this.deactivate = function() {
                            for (var e = 0; e < a.length; e++) a[e].deactivate();
                            s = !0
                        }, this.getName = function() {
                            return n
                        }, this.disable = function() {
                            s = !1;
                            for (var e = 0; e < a.length; e++) a[e].disable()
                        };
                        for (var u = 0; u < i.length; u++) a[u] = "string" != typeof i[u] ? i[u] : new t.Button(i[u], r), a[u].registerEventHandler("onclick", function(e) {
                            return function(t) {
                                o(e.getEventName(), t)
                            }
                        }(a[u]));
                        this.activate()
                    }
                };
                return e.exports("Framework.UI.WidgetLib", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Utils");
                var t = function(t, n, i, r) {
                    function o(e) {
                        v.setCategory(e.Id);
                        for (var t = r.nImages && !h && e.Images.length >= r.nImages ? r.nImages : e.Images.length, n = 0; t > n; n++) {
                            var i = r.useThumbnail ? e.Images[n].ThumbNail : e.Images[n].ReviewImage;
                            v.addImage(i, e.Images[n], e.Images[n].Id, null, null)
                        }
                        r.layer && v.setActiveImage(r.layer.Id, null, !0), "function" == typeof c.onsetload && c.onsetload()
                    }

                    function a(e) {
                        for (var t = [], n = 0; n < e.length; n++) r.layer.Uploads && -1 !== r.layer.Uploads.indexOf(e[n].Id) && t.push(e[n]);
                        return t.toCategory = e.toCategory, t
                    }

                    function s() {
                        r.layer && i.Client.GetUploads(function(e) {
                            if (e = a(e), e.length > 0 && r.insertCustom !== !1)
                                if ("Standard" === r.categoryType) {
                                    var t = e.toCategory(g.applyTag("myImages"), -1);
                                    e.GetCategory = function(e) {
                                        e(t)
                                    }, b.addCategoryAtTop(g.applyTag("myImages"), t), m = u.Available
                                } else m = u.Available;
                            else m = u.NoCustom
                        })
                    }

                    function l(e) {
                        for (var t = 0; t < e.length; t++) {
                            var n = e[t];
                            ("undefined" == typeof r.knockout || r.knockout === !0 && n.Knockout || r.knockout !== !0 && !n.Knockout) && (e[t].ImageType && e[t].ImageType !== r.categoryType || b.addCategory(e[t].Name, e[t]))
                        }
                        s()
                    }

                    function d() {
                        e.Lib.Utils.defer(function() {
                            m == u.Available && b.setActiveCategory(-1)
                        }, {
                            until: function() {
                                return m != u.Pending
                            }
                        })
                    }
                    var c = this;
                    r = r || {}, r.categoryType = r.categoryType || "Standard";
                    var u = {
                            Pending: 0,
                            Available: 1,
                            NoCustom: 2
                        },
                        p = n.nodeName ? n : null,
                        h = null,
                        g = (e.Network.Connectors.PCS.Designer, new e.Framework.UI.Templating.RefLangTemplater(i.Designer));
                    i.Designer.Galleries.Pagination && (h = {}, h.text = g.applyTag("paginationText"));
                    var f = e.Lib.Utils.SsgSerialiser.deserialise("category"),
                        m = u.Pending;
                    this.oncategorychange = null, this.onimagechange = null, this.onfirstcategoryload = null, this.onsetload = null, this.onallimagesloaded = null;
                    var v = new e.Components.Gallery.Controller.StockImageGallery(t, null, null, r.isVertical, r.nImages, h),
                        b = p ? new e.Components.Gallery.Controller.GallerySelector(p) : n;
                    this.addCustomImageCategory = function() {
                        i.Client.GetUploads(function(e) {
                            if (e.length > 0) {
                                var t = e.toCategory(g.applyTag("myImages"), -1);
                                e.GetCategory = function(e) {
                                    e(t)
                                };
                                for (var n, i = 0, r = b.getCategories().length; r > i; i++) {
                                    var a = b.getCategories()[i];
                                    if (-1 === a.id) {
                                        n = a;
                                        break
                                    }
                                }
                                n ? (n.data.Images = t.Images.slice(), v.clearImages(), o(t)) : (b.addCategoryAtTop(g.applyTag("myImages"), t), m = u.Available), b.setActiveCategory(t.Id)
                            } else m = u.NoCustom
                        })
                    }, b.oncategorychange = function(t, n) {
                        f = n, e.Lib.Utils.SsgSerialiser.serialise("category", f), v.containsCategoryById(n.Id) ? (v.setCategory(n.Id), "function" == typeof c.oncategorychange && c.oncategorychange(t, n)) : n.GetCategory(function(i) {
                            o(i);
                            var r = e.Lib.Utils.SsgSerialiser.deserialise("isCategoryLoaded");
                            r || (v.setActiveImage(i.Images[0].Id, null, !0), e.Lib.Utils.SsgSerialiser.serialise("isCategoryLoaded", !0), "function" == typeof c.onfirstcategoryload && c.onfirstcategoryload(i)), "function" == typeof c.oncategorychange && c.oncategorychange(t, n)
                        })
                    }, v.onimagechange = function(e, t) {
                        "function" == typeof c.onimagechange && c.onimagechange(e, t, f)
                    }, v.onallimagesloaded = function(e, t) {
                        "function" == typeof c.onallimagesloaded && c.onallimagesloaded(e, t)
                    }, v.onpagechange = function(e) {
                        "function" == typeof c.onpagechange && c.onpagechange(e)
                    }, this.show = function(e) {
                        v.setVisibility(e), b.setVisibility(e)
                    }, this.setActiveImage = function(e, t, n) {
                        v.setActiveImage(e, t, n)
                    }, r.startHidden && v.setVisibility(!1), i.Designer.Galleries.Enabled ? i.Designer.GetCategories(function(e) {
                        l(e), r.layer && "Custom" === r.layer.Type ? d() : null != f ? b.setActiveCategory(f.Id) : b.setActiveCategory(e[0].Id)
                    }) : (s(), d())
                };
                return e.exports("Components.Gallery.Adaptors.GallerySelectorUploads", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Utils");
                var t = function(t, n, i, r, o) {
                    function a(e) {
                        for (var n = o.nImages && e.Images.length >= o.nImages ? o.nImages : e.Images.length, i = 0; n > i; i++) t.addImage(e.Images[i].LargeImage, e.Images[i], null, null, e.Id, n);
                        t.updateContainerWidth(p), o.layer && t.setActiveImage(o.layer.Id), "function" == typeof u.onsetload && u.onsetload()
                    }

                    function s(e) {
                        for (var t = [], n = 0; n < e.length; n++) o.layer.Uploads && -1 !== o.layer.Uploads.indexOf(e[n].Id) && t.push(e[n]);
                        return t.toCategory = e.toCategory, t
                    }

                    function l() {
                        r.Client.GetUploads(function(t) {
                            var i = new e.Framework.UI.Templating.RefLangTemplater(r.Designer);
                            if (t = s(t), t.length > 0 && insertCustom) {
                                var o = t.toCategory(i.applyTag("myImages"), f.Upload);
                                t.GetCategory = function(e) {
                                    e(o)
                                }, n.addCategoryAtTop(i.applyTag("myImages"), o), v = g.Available
                            } else v = g.NoCustom
                        })
                    }

                    function d(e) {
                        for (var t = 0; t < e.length; t++) {
                            var i = e[t];
                            ("undefined" == typeof o.knockout || o.knockout === !0 && i.Knockout || o.knockout !== !0 && !i.Knockout) && n.addCategory(i.Name, i)
                        }
                        l()
                    }

                    function c() {
                        e.Lib.Utils.defer(function() {
                            v == g.Available && n.setActiveCategory(-1)
                        }, {
                            until: function() {
                                return v != g.Pending
                            }
                        })
                    }
                    o || (o = {});
                    var u = this,
                        p = e.Configuration.Images.DefaultGallerySize,
                        h = "undefined" != typeof i && null !== i;
                    insertCustom = "undefined" != typeof o.insertCustom ? o.insertCustom : !0;
                    var g = {
                            Pending: 0,
                            Available: 1,
                            NoCustom: 2
                        },
                        f = {
                            Upload: -1,
                            Search: -2
                        },
                        m = e.Lib.Utils.SsgSerialiser.deserialise("category"),
                        v = g.Pending,
                        b = !0;
                    this.oncategorychange = null, this.onimagechange = null, this.onfirstcategoryload = null, this.onsetload = null, this.onallimagesloaded = null, t.createErrorContainer(), h && (i.onsearchclick = function(e) {
                        if ("" !== e) {
                            var n, i = t.filterImagesByAltValue(e),
                                o = new Array;
                            t.updateContainerWidth(p), r.Designer.GetSearchResults(e, function(e) {
                                if (null != e) {
                                    for (var r = 0; r < e.length; r++) {
                                        n = !1;
                                        for (var s = 0; s < i.length; s++)
                                            if (e[r].Name === i[s]) {
                                                n = !0;
                                                break
                                            }
                                        n || o.push(e[r])
                                    }
                                    if (o.length < 1 && i.length < 1) t.showError();
                                    else {
                                        t.hideError();
                                        var l = {
                                            Images: o
                                        };
                                        l.Id = f.Search, a(l)
                                    }
                                }
                            })
                        } else t.closeError()
                    }), n.oncategorychange = function(n, r) {
                        h && i.clearSearchText(), m = r, e.Lib.Utils.SsgSerialiser.serialise("category", m), t.containsCategoryById(r.Id) ? (t.setCategory(r.Id), t.updateContainerWidth(p), "function" == typeof u.oncategorychange && u.oncategorychange(n, r)) : r.GetCategory(function(e) {
                            t.setCategory(e.Id), a(e), b && "function" == typeof u.onfirstcategoryload && (t.setActiveImage(e.Images[0].Id), u.onfirstcategoryload(e), b = !1), "function" == typeof u.oncategorychange && u.oncategorychange(n, r)
                        })
                    }, t.onimagechange = function(e, t) {
                        "function" == typeof u.onimagechange && u.onimagechange(e, t, m)
                    }, t.onallimagesloaded = function(e, t) {
                        "function" == typeof u.onallimagesloaded && u.onallimagesloaded(e, t)
                    }, r.Designer.Galleries.Enabled ? r.Designer.GetCategories(function(e) {
                        d(e), o.layer && "Custom" === o.layer.Type ? c() : null != m ? n.setActiveCategory(m.Id) : n.setActiveCategory(e[0].Id)
                    }) : (l(), c())
                };
                return e.exports("Components.Gallery.Adaptors.GallerySelectorSearchUploads", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, i) {
                    var r = this;
                    this.onimagechange = null;
                    e.Configuration.Images.DefaultGallerySize;
                    this.onfirstcategoryload = null, this.onsetload = null, this.onallimagesloaded = null;
                    var o = e.Lib.Utils.SsgSerialiser.deserialise("category");
                    DesignerController.designer.GetCategories(function(a) {
                        function s(e) {
                            t.setCategory(e.Id);
                            for (var n = i && e.Images.length >= i ? i : e.Images.length, o = 0; n > o; o++) t.addImage(e.Images[o].LargeImage, e.Images[o], null, null, e.Id, n);
                            "function" == typeof r.onsetload && r.onsetload()
                        }
                        for (var l = 0; l < a.length; l++) n.addCategory(a[l].Name, a[l]);
                        n.oncategorychange = function(n, i) {
                            o = i, e.Lib.Utils.SsgSerialiser.serialise("category", o), t.containsCategoryById(i.Id) ? t.setCategory(i.Id) : i.GetCategory(function(e) {
                                t.setCategory(e.Id), s(e)
                            })
                        }, a[0].GetCategory(function(e) {
                            s(e), o = e, t.setActiveImage(e.Images[0].Id), "function" == typeof r.onfirstcategoryload && r.onfirstcategoryload(e)
                        }), t.onimagechange = function(e, t) {
                            "function" == typeof r.onimagechange && r.onimagechange(e, t, o)
                        }, t.onallimagesloaded = function(e, t) {
                            "function" == typeof r.onallimagesloaded && r.onallimagesloaded(e, t)
                        }
                    })
                };
                return e.exports("Components.Gallery.Adaptors.GallerySelector", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, i, r, o) {
                    var a = this,
                        s = e.Configuration.Images.DefaultGallerySize;
                    this.onimagechange = null, this.onfirstcategoryload = null, this.onsetload = null, this.onallimagesloaded = null, t.createErrorContainer();
                    var l = null;
                    DesignerController.designer.GetCategories(function(d) {
                        function c(e, n) {
                            for (var i = o && cat.Images.length >= o ? o : cat.Images.length, l = 0; i > l; l++) t.addImage(e[l].LargeImage, e[l], null, null, n, i);
                            t.updateContainerWidth(s), r && t.setActiveImage(r.Id), "function" == typeof a.onsetload && a.onsetload()
                        }
                        for (var u = 0; u < d.length; u++) n.addCategory(d[u].Name, d[u]);
                        n.oncategorychange = function(e, n) {
                            l = n, i.clearSearchText(), t.containsCategoryById(n.Id) ? (t.setCategory(n.Id), t.updateContainerWidth(s)) : n.GetCategory(function(e) {
                                t.setCategory(e.Id), c(e.Images, e.Id)
                            })
                        }, i.onsearchclick = function(e) {
                            if ("" !== e) {
                                var n, i = t.filterImagesByAltValue(e),
                                    r = new Array;
                                t.updateContainerWidth(s), DesignerController.designer.GetSearchResults(e, function(e) {
                                    if (null != e) {
                                        for (var o = 0; o < e.length; o++) {
                                            n = !1;
                                            for (var a = 0; a < i.length; a++)
                                                if (e[o].Name === i[a]) {
                                                    n = !0;
                                                    break
                                                }
                                            n || r.push(e[o])
                                        }
                                        r.length < 1 ? t.showError() : (t.hideError(), c(r))
                                    }
                                })
                            } else t.closeError()
                        }, d[0].GetCategory(function(e) {
                            t.setCategory(e.Id), l = e, t.setActiveImage(e.Images[0].Id), "function" == typeof a.onfirstcategoryload && a.onfirstcategoryload(e)
                        }), t.onimagechange = function(t, n) {
                            e.Lib.Utils.SsgSerialiser.serialise("category", l), "function" == typeof a.onimagechange && a.onimagechange(t, n, l)
                        }, t.onallimagesloaded = function(e, t) {
                            "function" == typeof a.onallimagesloaded && a.onallimagesloaded(e, t)
                        }
                    })
                };
                return e.exports("Components.Gallery.Adaptors.GallerySelectorSearch", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, i, r) {
                    function o(e) {
                        return e.height < f.Height && e.height > m.Height && e.width < f.Width && e.width > m.Width
                    }

                    function a(t, n, i) {
                        e.Network.Connectors.Facebook.GetFacebookUserId(t, function(e) {
                            e ? n({
                                token: t.token,
                                id: e.id
                            }) : i ? w({
                                error: "failed to get user id"
                            }) : n({
                                token: t.token,
                                id: null
                            })
                        })
                    }

                    function s(t, n) {
                        e.Network.Connectors.Facebook.GetUserPhotos(t, function(e) {
                            var t = c(e.data);
                            e.paging.next ? l(e.paging.next, [], function(e) {
                                t = t.concat(e), n(t)
                            }) : n(t)
                        })
                    }

                    function l(t, n, i) {
                        e.Network.Connectors.Facebook.Get(t, function(e) {
                            n = n.concat(c(e.data)), e.paging.next ? l(e.paging.next, n, i) : i(n)
                        })
                    }

                    function d(t, n) {
                        e.Network.Connectors.Facebook.GetCategories(t, function(e) {
                            n(e)
                        })
                    }

                    function c(e) {
                        var t = [];
                        if (e && e.length > 0)
                            for (var n = 0; n < e.length; n++) {
                                var i = u(e[n].images);
                                i && t.push({
                                    id: e[n].id,
                                    source: i.source
                                })
                            }
                        return t
                    }

                    function u(e) {
                        if (e && e.length > 0)
                            for (var t = 0; t < e.length; t++)
                                if (o(e[t])) return e[t]
                    }

                    function p(e) {
                        S.setCategory(e.id);
                        for (var t = 0; t < e.images.length; t++) {
                            var n = e.images[t];
                            S.addImage(n.source, n, n.id, "Facebook image " + t, e.id)
                        }
                        S.updateContainerWidth(b)
                    }

                    function h() {
                        a(v, function(e) {
                            d(e, function(e) {
                                e && e.data && e.data.length > 0 && e.data.forEach(function(e) {
                                    s({
                                        token: v.token,
                                        id: e.id
                                    }, function(t) {
                                        if (t.length > 0) {
                                            var i = {
                                                id: C.length,
                                                facebookAlbumId: e.id,
                                                name: e.name,
                                                images: t
                                            };
                                            C.push(i), n.addCategory(i.name, i), 1 == C.length && p(i)
                                        }
                                    })
                                })
                            })
                        }, function() {
                            return null
                        }), n.oncategorychange = function(t, n) {
                            x = n, e.Lib.Utils.SsgSerialiser.serialise("category", x), S.containsCategoryById(n.id) ? (S.setCategory(n.id), "function" == typeof g.oncategorychange && g.oncategorychange(t, n)) : (p(n), "function" == typeof g.oncategorychange && g.oncategorychange(t, n)), S.updateContainerWidth(b)
                        }, S.onimagechange = function(e, t) {
                            "function" == typeof g.onimagechange && g.onimagechange(e, t)
                        }, S.onallimagesloaded = function(e, t) {
                            "function" == typeof g.onallimagesloaded && g.onallimagesloaded(e, t)
                        }
                    }
                    var g = this,
                        f = r.maxSize || {
                            Height: 1e3,
                            Width: 1e4
                        },
                        m = r.minSize || {
                            Height: 672,
                            Width: 1050
                        },
                        v = r.fbData,
                        b = r.galleryWidth || e.Configuration.Images.DefaultGallerySize,
                        y = null;
                    this.oncategorychange = null, this.onimagechange = null, this.onfirstcategoryload = null, this.onsetload = null, this.onallimagesloaded = null;
                    var w = r.onError || function(e) {},
                        x = e.Lib.Utils.SsgSerialiser.deserialise("category"),
                        C = [],
                        S = new e.Components.Gallery.Controller.StockImageGallery(t, null, null, r.isVertical, r.nImages, y);
                    h()
                };
                return e.exports("Components.Gallery.Adaptors.FacebookSelector", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(e, t) {
                    function n() {
                        e.innerHTML = ""
                    }
                    var i = t.maxSize || 20,
                        r = t.imageClassName || "gallery-image",
                        o = t.onImageSelected || function() {},
                        a = (t.tabIndexOffset, t.imageType || "Review");
                    return this.loadImages = function(t) {
                        n();
                        for (var s = Math.min(i, t.length), l = 0; s > l; l++) {
                            var d = t[l],
                                c = $("<button></button>");
                            c.addClass(r).attr("id", d.Id).attr("data-image-locked", d.Locked), d.Name && (c.attr("title", d.Name), c.attr("aria-label", d.Name));
                            var u = "Large" === a ? d.LargeImage : d.ReviewImage || d.LargeImage;
                            c.css("background-image", "url(" + u + ")"), c.click(function(e) {
                                o(e.target.id)
                            }), c.on("keydown", function(e) {
                                !e || 13 !== e.keyCode && 32 !== e.keyCode || o(e.target.id)
                            }), e.appendChild(c[0])
                        }
                    }, t.images && this.loadImages(t.images), this
                };
                return e.exports("Components.MiniImageGallery", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Dom.EventHandler");
                var t = function(t, n, i) {
                    function r(e) {
                        return p = !1, u.touchPoint = {
                            x: e.pageX,
                            y: e.pageY
                        }, u.startPoint = {
                            x: e.pageX,
                            y: e.pageY
                        }, u.modelSnapshot = n.clone(), null != u.gestureStart && u.gestureStart(c(e)), s(e)
                    }

                    function o(e) {
                        return null != u.touchPoint && null != u.startPoint && (u.touchPoint.x = e.pageX, u.touchPoint.y = e.pageY, null == u.gestureChange || p || u.gestureChange(c(e))), s(e)
                    }

                    function a(e) {
                        return null == u.gestureEnd || null == u.startPoint || p || u.gestureEnd(c(e)), this.touchPoint = null, this.startPoint = null, s(e)
                    }

                    function s(e) {
                        return e.stopPropagation(), e.preventDefault(), e.returnValue = !1, !1
                    }

                    function l(e, t) {
                        return {
                            x: e.x - t.x,
                            y: e.y - t.y
                        }
                    }

                    function d() {
                        return l(u.touchPoint, u.startPoint)
                    }

                    function c(e) {
                        var t = d();
                        return {
                            x: t.x,
                            y: t.y,
                            scale: 0,
                            rotation: 0,
                            snapshot: u.modelSnapshot,
                            innerEvent: e,
                            target: u.el
                        }
                    }
                    var u = this;
                    this.el = t, this.gestureStart = null, this.gestureChange = null, this.gestureEnd = null, this.touchPoint = null, this.startPoint = null, this.modelSnapshot = null;
                    var p = !1;
                    this.attachEvents = function() {
                        e.Lib.Dom.EventHandler.addHandler(u.el, "mousedown", r), e.Lib.Dom.EventHandler.addHandler(u.el, "mousemove", o), e.Lib.Dom.EventHandler.addHandler(u.el, "mouseup", a)
                    }, this.detachEvents = function() {
                        e.Lib.Dom.EventHandler.removeHandler(u.el, "mousedown", r), e.Lib.Dom.EventHandler.removeHandler(u.el, "mousemove", o), e.Lib.Dom.EventHandler.removeHandler(u.el, "mouseup", a)
                    }, this.stopCurrentEvent = function() {
                        p = !0
                    }, this.attachEvents()
                };
                return e.exports("Components.Canvas.Gestures.CanvasMoveGesture", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Dom.EventHandler");
                var t = function(e, t) {
                    this.el = e, this.gestureStart = null, this.gestureChange = null, this.gestureEnd = null, this.touchPoint = null, this.startPoint = null, this.modelSnapshot = null, this.AttachEvents(t)
                };
                return t.prototype.AttachEvents = function(t) {
                    function n(e) {
                        return e.stopPropagation(), e.preventDefault(), e.returnValue = !1, !1
                    }
                    var i = this;
                    this.startHandler = function(e) {
                        return i.touchPoint = {
                            x: e.pageX,
                            y: e.pageY
                        }, i.startPoint = {
                            x: e.pageX,
                            y: e.pageY
                        }, i.modelSnapshot = t.clone(), null != i.gestureStart && i.gestureStart(i._MakeGestureEvent(e)), n(e)
                    }, this.moveHandler = function(e) {
                        return null != i.touchPoint && (i.touchPoint.x = e.pageX, i.touchPoint.y = e.pageY, null != i.gestureChange && i.gestureChange(i._MakeGestureEvent(e))), n(e)
                    }, this.endHandler = function(e) {
                        return null != i.gestureEnd && i.gestureEnd(i._MakeGestureEvent(e)), i.touchPoint = null, i.startPoint = null, n(e)
                    }, e.Lib.Dom.EventHandler.addHandler(this.el, "mousedown", this.startHandler), e.Lib.Dom.EventHandler.addHandler(this.el, "mousemove", this.moveHandler), e.Lib.Dom.EventHandler.addHandler(this.el, "mouseup", this.endHandler)
                }, t.prototype.DetachEvents = function() {
                    e.Lib.Dom.EventHandler.removeHandler(this.el, "mousedown", this.startHandler), e.Lib.Dom.EventHandler.removeHandler(this.el, "mousemove", this.moveHandler), e.Lib.Dom.EventHandler.removeHandler(this.el, "mouseup", this.endHandler)
                }, t.prototype.getDelta = function() {
                    return this._getDifference(this.touchPoint, this.startPoint)
                }, t.prototype.getDeltaScale = function() {
                    var e = this.modelSnapshot ? this.modelSnapshot.getCentre() : null;
                    return null != this.touchPoint && null != e ? (this._toScaler(this.touchPoint, e) - this._toScaler(this.startPoint, e)) / this.modelSnapshot.width : null
                }, t.prototype._getDifference = function(e, t) {
                    return {
                        x: e.x - t.x,
                        y: e.y - t.y
                    }
                }, t.prototype._toScaler = function(e, t) {
                    var n = this._getDifference(e, t);
                    return Math.sqrt(Math.pow(n.x, 2) + Math.pow(n.y, 2))
                }, t.prototype._MakeGestureEvent = function(e) {
                    var t = this.getDeltaScale(),
                        n = this;
                    return {
                        x: 0,
                        y: 0,
                        scale: t,
                        rotation: 0,
                        snapshot: n.modelSnapshot,
                        innerEvent: e,
                        target: n.el
                    }
                }, e.exports("Components.Canvas.Gestures.CanvasScaleGesture", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Dom.EventHandler");
                var t = function(e, t) {
                    this.el = e, this.gestureStart = null, this.gestureChange = null, this.gestureEnd = null, this.touchPoint = null, this.startPoint = null, this.modelSnapshot = null, this.AttachEvents(t)
                };
                return t.prototype.AttachEvents = function(t) {
                    function n(e) {
                        return e.stopPropagation(), e.preventDefault(), e.returnValue = !1, !1
                    }
                    var i = this;
                    this.startHandler = function(e) {
                        return i.touchPoint = {
                            x: e.pageX,
                            y: e.pageY
                        }, i.startPoint = {
                            x: e.pageX,
                            y: e.pageY
                        }, i.modelSnapshot = t.clone(), null != i.gestureStart && i.gestureStart(i._MakeGestureEvent(e)), n(e)
                    }, this.moveHandler = function(e) {
                        return null != i.touchPoint && (i.touchPoint.x = e.pageX, i.touchPoint.y = e.pageY, null != i.gestureChange && i.gestureChange(i._MakeGestureEvent(e))), n(e)
                    }, this.endHandler = function(e) {
                        return null != i.gestureEnd && i.gestureEnd(i._MakeGestureEvent(e)), i.touchPoint = null, i.startPoint = null, n(e)
                    }, e.Lib.Dom.EventHandler.addHandler(this.el, "mousedown", this.startHandler), e.Lib.Dom.EventHandler.addHandler(this.el, "mousemove", this.moveHandler), e.Lib.Dom.EventHandler.addHandler(this.el, "mouseup", this.endHandler)
                }, t.prototype.DetachEvents = function() {
                    e.Lib.Dom.EventHandler.removeHandler(this.el, "mousedown", this.startHandler), e.Lib.Dom.EventHandler.removeHandler(this.el, "mousemove", this.moveHandler), e.Lib.Dom.EventHandler.removeHandler(this.el, "mouseup", this.endHandler)
                }, t.prototype.getDeltaAngle = function() {
                    var e = this.modelSnapshot ? this.modelSnapshot.getCentre() : null;
                    return null != this.touchPoint && null != e ? this._getAngle(e, this.startPoint) - this._getAngle(e, this.touchPoint) : null
                }, t.prototype._getDifference = function(e, t) {
                    return {
                        x: e.x - t.x,
                        y: e.y - t.y
                    }
                }, t.prototype._getAngle = function(e, t) {
                    var n = this._getDifference(e, t);
                    return Math.atan2(n.y, n.x)
                }, t.prototype._MakeGestureEvent = function(e) {
                    var t = this.getDeltaAngle(),
                        n = this;
                    return {
                        x: 0,
                        y: 0,
                        scale: 0,
                        rotation: t,
                        snapshot: n.modelSnapshot,
                        innerEvent: e,
                        target: n.el
                    }
                }, e.exports("Components.Canvas.Gestures.CanvasRotateGesture", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = e.Components.Canvas.Gestures,
                    n = function(n, i, r) {
                        var o = this,
                            a = !0;
                        this.onMove = null, this.onRotate = null, this.onScale = null, this.onEnd = null;
                        var s = function(e) {
                                var t = "position:absolute; background-color: #fff; width: 9px; height: 9px; cursor: pointer; border-radius: 5px; border: 1px solid #31B7DB",
                                    n = function(n) {
                                        var i = document.createElement("div");
                                        return i.className = "handle-circle", i.setAttribute("style", t), n(i), e.appendChild(i), i
                                    },
                                    i = "-5px",
                                    r = [n(function(e) {
                                        e.style.right = i, e.style.bottom = i
                                    }), n(function(e) {
                                        e.style.left = i, e.style.top = i
                                    }), n(function(e) {
                                        e.style.right = i, e.style.top = i
                                    }), n(function(e) {
                                        e.style.left = i, e.style.bottom = i
                                    })],
                                    o = {},
                                    a = function(e, t, n) {
                                        return e.surrounds(t, n) ? (o = e, !0) : !1
                                    };
                                return {
                                    hide: function() {
                                        r[0].style.display = "none", r[1].style.display = "none", r[2].style.display = "none", r[3].style.display = "none"
                                    },
                                    show: function() {
                                        r[0].style.display = "block", r[1].style.display = "block", r[2].style.display = "block", r[3].style.display = "block"
                                    },
                                    anySurround: function(e, t) {
                                        return a(r[0], e, t) || a(r[1], e, t) || a(r[2], e, t) || a(r[3], e, t)
                                    },
                                    getLastSurroundingHandle: function() {
                                        return o
                                    },
                                    each: function(e) {
                                        for (var t = 0; t < r.length; t++) e(r[t])
                                    }
                                }
                            }(i.parentNode),
                            l = null,
                            d = 0,
                            c = 0;
                        e.Lib.Dom.EventHandler.addHandler(n, "mousemove", function(e) {
                            s.anySurround(e.pageX, e.pageY) && a ? (s.getLastSurroundingHandle().className = "handle-circle hightlighted-handle", s.getLastSurroundingHandle().style.backgroundColor = "#00FFFF") : s.each(function(e) {
                                e.className = "handle-circle", e.style.backgroundColor = "#fff"
                            }), i.surrounds(e.pageX, e.pageY) && a ? n.style.cursor = "pointer" : n.style.cursor = "auto"
                        });
                        var u = new t.CanvasMoveGesture(n, r);
                        u.gestureStart = function(e) {
                            i.surrounds(e.innerEvent.pageX, e.innerEvent.pageY) && !s.anySurround(e.innerEvent.pageX, e.innerEvent.pageY) && a && (l = i, g(e, 2))
                        }, u.gestureChange = function(e) {
                            l === i && a && null != o.onMove && o.onMove(e)
                        }, u.gestureEnd = function(e) {
                            f(e)
                        };
                        var p = new t.CanvasRotateGesture(n, r);
                        p.gestureStart = function(e) {
                            s.anySurround(e.innerEvent.pageX, e.innerEvent.pageY) && a && (l = s.getLastSurroundingHandle(), g(e, 1))
                        }, p.gestureChange = function(e) {
                            l === s.getLastSurroundingHandle() && a && null != o.onRotate && o.onRotate(e)
                        }, p.gestureEnd = function(e) {
                            f(e)
                        };
                        var h = new t.CanvasScaleGesture(n, r);
                        h.gestureStart = function(e) {
                            s.anySurround(e.innerEvent.pageX, e.innerEvent.pageY) && a && (l = s.getLastSurroundingHandle(), g(e, 1))
                        }, h.gestureChange = function(e) {
                            l === s.getLastSurroundingHandle() && a && null != o.onScale && o.onScale(e)
                        }, h.gestureEnd = function(e) {
                            f(e)
                        };
                        var g = function(e, t) {
                                n.style.position = "fixed", c += t, "function" == typeof o.onStart && a && 2 === c && (o.onStart(e), c = 0)
                            },
                            f = function(e) {
                                a && (l = null, d++, n.style.position = "absolute", "function" == typeof o.onEnd && 3 === d && (o.onEnd(e), d = 0))
                            };
                        this.disable = function() {
                            a = !1, s.hide()
                        }, this.enable = function() {
                            a = !0, s.show()
                        }, this.glow = function(e) {
                            i.style["-moz-box-shadow"] = i.style["-webkit-box-shadow"] = i.style.boxShadow = e ? "rgb(49, 183, 219) 0px 0px 0px 1px" : ""
                        }, this.glow(!0), this.setMoveMode = function() {}, this.setScaleMode = function() {}, this.setRotateMode = function() {}
                    };
                return e.exports("Components.Canvas.EventLayers.HandleBasedCanvasEventLayer", n)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = e.Components.Canvas.Gestures,
                    n = function(e, n, i) {
                        var r = this;
                        this.onMove = null, this.onRotate = null, this.onScale = null, this.onEnd = null;
                        var o = document.createElement("img");
                        o.src = "img/handle4.png", o.style.width = "50px", o.style.height = "50px", o.style.position = "absolute", o.style.right = "0px", o.style.bottom = "0px", n.parentNode.appendChild(o);
                        var a = null,
                            s = new t.MoveGesture(e, i);
                        s.gestureStart = function(e) {
                            n.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && !o.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && (a = n)
                        }, s.gestureChange = function(e) {
                            a === n && null != r.onMove && r.onMove(e)
                        }, s.gestureEnd = function(e) {
                            a = null, "function" == typeof r.onEnd && r.onEnd(e)
                        };
                        var l = new t.SingleFingerRotateGesture(e, i);
                        l.gestureStart = function(e) {
                            o.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && (a = o)
                        }, l.gestureChange = function(e) {
                            a === o && null != r.onRotate && r.onRotate(e)
                        }, l.gestureEnd = function(e) {
                            a = null, "function" == typeof r.onEnd && r.onEnd(e)
                        };
                        var d = new t.SingleFingerScaleGesture(e, i);
                        d.gestureStart = function(e) {
                            o.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && (a = o)
                        }, d.gestureChange = function(e) {
                            a === o && null != r.onScale && r.onScale(e)
                        }, d.gestureEnd = function(e) {
                            a = null, "function" == typeof r.onEnd && r.onEnd(e)
                        }, this.disable = function() {}, this.enable = function() {}
                    };
                return e.exports("Components.Canvas.EventLayers.AndroidEventLayer", n)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(e, t) {
                    this.el = e, this.gestureStart = null, this.gestureChange = null, this.gestureEnd = null, this.modelSnapshot = null, this.touchPoint = null, this.startPoint = null, this._initEvents(t)
                };
                return t.prototype._initEvents = function(e) {
                    var t = this,
                        n = new re(this.el, {
                            prevent_default: !0,
                            scale_treshold: 0,
                            rotation_threshold: 0
                        });
                    n.ontransformstart = function(n) {
                        t.modelSnapshot = e.clone(), t.touchPoint = {
                            x: n.position.x,
                            y: n.position.y
                        }, t.startPoint = {
                            x: n.position.x,
                            y: n.position.y
                        }, null != t.gestureStart && t.gestureStart(t._MakeGestureEvent(n))
                    }, n.ontransform = function(e) {
                        t.touchPoint.x = e.position.x, t.touchPoint.y = e.position.y, null != t.gestureChange && t.gestureChange(t._MakeGestureEvent(e))
                    }, n.ontransformend = function(e) {
                        null != t.gestureEnd && t.gestureEnd(t._MakeGestureEvent(e))
                    }
                }, t.prototype.getDelta = function() {
                    return this._getDifference(this.touchPoint, this.startPoint)
                }, t.prototype._getDifference = function(e, t) {
                    return {
                        x: e.x - t.x,
                        y: e.y - t.y
                    }
                }, t.prototype._MakeGestureEvent = function(e) {
                    var t = this,
                        n = this.getDelta();
                    return {
                        x: n.x,
                        y: n.y,
                        scale: e.scale - 1,
                        rotation: 2 * -(e.rotation / 360) * Math.PI,
                        snapshot: t.modelSnapshot,
                        innerEvent: e.originalEvent
                    }
                }, e.exports("Components.Canvas.Gestures.PinchGesture", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(e, t) {
                    this.el = e, this.touchPoint = null, this.startPoint = null, this.gestureStart = null, this.gestureChange = null, this.gestureEnd = null, this.modelSnapshot = null, this._initEvents(t, this)
                };
                return t.prototype._initEvents = function(e, t) {
                    this.startHandler = function(n) {
                        n.stopPropagation(), t.initMoveGesture(e.clone(), n), null != t.gestureStart && t.gestureStart(t._MakeGestureEvent(n))
                    }, this.moveHandler = function(e) {
                        e.preventDefault(), t.updateTouchPoint(e), null != t.gestureChange && t.gestureChange(t._MakeGestureEvent(e))
                    }, this.endHandler = function(e) {
                        null != t.gestureEnd && t.gestureEnd(t._MakeGestureEvent(e))
                    }, this.el.addEventListener("touchstart", this.startHandler), this.el.addEventListener("touchmove", this.moveHandler), this.el.addEventListener("touchend", this.endHandler)
                }, t.prototype.detachEvents = function() {
                    this.el.removeEventListener("touchstart", this.startHandler), this.el.removeEventListener("touchmove", this.moveHandler), this.el.removeEventListener("touchend", this.endHandler)
                }, t.prototype.initMoveGesture = function(e, t) {
                    this.modelSnapshot = e, this.touchPoint = {
                        x: t.pageX,
                        y: t.pageY
                    }, this.startPoint = {
                        x: t.pageX,
                        y: t.pageY
                    }
                }, t.prototype.updateTouchPoint = function(e) {
                    this.touchPoint.x = e.pageX, this.touchPoint.y = e.pageY
                }, t.prototype.getDelta = function() {
                    return this._getDifference(this.touchPoint, this.startPoint)
                }, t.prototype._getDifference = function(e, t) {
                    return {
                        x: e.x - t.x,
                        y: e.y - t.y
                    }
                }, t.prototype._MakeGestureEvent = function(e) {
                    var t = this.getDelta(),
                        n = this;
                    return {
                        x: t.x,
                        y: t.y,
                        scale: 0,
                        rotation: 0,
                        snapshot: n.modelSnapshot,
                        innerEvent: e
                    }
                }, e.exports("Components.Canvas.Gestures.TwoFingerMoveGesture", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(e, t) {
                    this.el = e, this.gestureStart = null, this.gestureChange = null, this.gestureEnd = null, this.modelSnapshot = null, this._initEvents(t, this)
                };
                return t.prototype._initEvents = function(e, t) {
                    this.startHandler = function(n) {
                        n.stopPropagation(), n.preventDefault(), t.modelSnapshot = e.clone(), null != t.gestureStart && t.gestureStart(t._MakeGestureEvent(n))
                    }, this.moveHandler = function(e) {
                        e.preventDefault(), null != t.gestureChange && t.gestureChange(t._MakeGestureEvent(e))
                    }, this.endHandler = function(e) {
                        e.preventDefault(), null != t.gestureEnd && t.gestureEnd(t._MakeGestureEvent(e))
                    }, this.el.addEventListener("gesturestart", this.startHandler), this.el.addEventListener("gesturechange", this.moveHandler), this.el.addEventListener("gestureend", this.endHandler)
                }, t.prototype.detachEvents = function() {
                    this.el.removeEventListener("gesturestart", this.startHandler), this.el.removeEventListener("gesturechange", this.moveHandler), this.el.removeEventListener("gestureend", this.endHandler)
                }, t.prototype._MakeGestureEvent = function(e) {
                    var t = this;
                    return {
                        x: 0,
                        y: 0,
                        scale: e.scale - 1,
                        rotation: 2 * -(e.rotation / 360) * Math.PI,
                        snapshot: t.modelSnapshot,
                        innerEvent: e
                    }
                }, e.exports("Components.Canvas.Gestures.ApplePinchGesture", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = e.Components.Canvas.Gestures,
                    n = function(e, n, i) {
                        var r = this,
                            o = !0;
                        this.onMove = null, this.onRotate = null, this.onScale = null, this.onEnd = null, this.onMulti = null;
                        var a = null,
                            s = new t.MoveGesture(e, i);
                        s.gestureStart = function(e) {
                            n.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && (a = n)
                        }, s.gestureChange = function(e) {
                            a === n && null != r.onMove && o && r.onMove(e)
                        }, s.gestureEnd = function(e) {
                            a = null, "function" == typeof r.onEnd && o && r.onEnd(e)
                        };
                        var l = new t.ApplePinchGesture(e, i);
                        l.gestureStart = function(e) {
                            n.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && (a = n, "function" == typeof r.onMulti && r.onMulti())
                        }, l.gestureChange = function(e) {
                            a === n && (s.stopCurrentEvent(), null != r.onScale && o && r.onScale(e), null != r.onRotate && o && r.onRotate(e))
                        }, l.gestureEnd = function(e) {
                            a = null, "function" == typeof r.onEnd && o && r.onEnd(e)
                        };
                        var d = new t.TwoFingerMoveGesture(e, i);
                        d.gestureStart = function(e) {
                            n.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && (a = n, e.innerEvent.touches.length > 1 && "function" == typeof r.onMulti && r.onMulti())
                        }, d.gestureChange = function(e) {
                            a === n && (s.stopCurrentEvent(), null != r.onMove && o && r.onMove(e))
                        }, d.gestureEnd = function(e) {
                            a = null, "function" == typeof r.onEnd && o && r.onEnd(e)
                        }, this.disable = function() {
                            o = !1
                        }, this.enable = function() {
                            o = !0
                        }
                    };
                return e.exports("Components.Canvas.EventLayers.AppleEventLayer", n)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(e) {
                    function t(e) {
                        return e[0] + "," + e[1] + "," + e[2] + "," + e[3] + "," + e[4] + "," + e[5] + "," + e[6] + "," + e[7] + "," + e[8] + "," + e[9] + "," + e[10] + "," + e[11] + "," + e[12] + "," + e[13] + "," + e[14] + "," + e[15]
                    }
                    this.Update = function(n) {
                        var i = (n.flip ? "-180" : "0", n.flip ? "-1" : "1"),
                            r = Math.cos(n.rotation) * n.scale,
                            o = r,
                            a = Math.sin(-n.rotation) * n.scale,
                            s = Math.sin(n.rotation) * n.scale,
                            l = n.left,
                            d = n.top,
                            c = n.scale,
                            u = [r, a, 0, 0, s, o, 0, 0, 0, 0, c, 0, l, d, 0, 1];
                        e.style["-webkit-transform"] = e.style["-ms-transform"] = e.style["-o-transform"] = e.style.MozTransform = "matrix3d(" + t(u) + ")scaleX(" + i + ")", u = r = o = r = a = s = l = d = c = null
                    }
                };
                return e.exports("Components.Canvas.Core.Matrix3dCssEngine", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(e) {
                    this.Update = function(t) {
                        var n = t.flip ? "-1" : "1";
                        e.style["-webkit-transform"] = e.style["-ms-transform"] = e.style["-o-transform"] = e.style.MozTransform = "translate(" + t.left + "px," + t.top + "px)scale(" + t.scale + ") rotateZ(" + -t.rotation + "rad)scaleX(" + n + ")"
                    }
                };
                return e.exports("Components.Canvas.Core.Translate2dCssEngine", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n) {
                    function i() {
                        return r = document.getElementById("overlay" + n), null != r ? r : (r = document.createElement("div"), r.style.width = "100%", r.style.height = "100%", r.style.position = "absolute", r.style.zIndex = e.Configuration.Canvas.zIndex.overlay + n, r.style.top = 0, r.style.left = 0, r.style.backgroundColor = "rgba(255, 255, 255, 0)", r.id = "overlay" + n, t.parentNode.parentNode.appendChild(r), r)
                    }
                    var r;
                    return {
                        renderOverlay: function(e) {},
                        setIndex: function(t) {
                            r.style.zIndex = e.Configuration.Canvas.zIndex.overlay + t
                        },
                        getIndex: function() {
                            return r.style.zIndex - e.Configuration.Canvas.zIndex.overlay
                        },
                        getEventLayer: function(n) {
                            var r = e.Components.Canvas.EventLayers;
                            if (!Modernizr.touch) return new r.HandleBasedCanvasEventLayer(i(), t, n);
                            if (Modernizr.ios) return new r.AppleEventLayer(i(), t, n);
                            if (Modernizr.android2x) return new r.AndroidEventLayer(i(), t, n);
                            var o = new r.ModalHammerEventLayer(i(), t, n);
                            return o.setMoveMode(), o
                        }
                    }
                };
                return e.exports("Components.Canvas.EventLayers.HandleBasedEventFactory", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, i) {
                    this.listener = e.Components.Canvas.EventLayers.EventFacades.WebkitEventFacade, this.el = t, this.gestureStart = null, this.gestureChange = null, this.gestureEnd = null, this.touchPoint = null, this.startPoint = null, this.modelSnapshot = null, this._cancelled = !1, this.AttachEvents(n)
                };
                return t.prototype.AttachEvents = function(e) {
                    var t = this;
                    this.startHandler = function(n) {
                        n.stopPropagation(), t._cancelled = !1, t._init(e.clone(), n), null != t.gestureStart && t.gestureStart(t._MakeGestureEvent(n))
                    }, this.moveHandler = function(e) {
                        e.stopPropagation(), e.preventDefault(), t.updateTouchPoint(e), null == t.gestureChange || t._cancelled || t.gestureChange(t._MakeGestureEvent(e))
                    }, this.endHandler = function(e) {
                        e.stopPropagation(), null == t.gestureEnd || this._cancelled || t.gestureEnd(t._MakeGestureEvent(e))
                    }, this.listener.addEventListener(this.el, "touchstart", this.startHandler), this.listener.addEventListener(this.el, "touchmove", this.moveHandler), this.listener.addEventListener(this.el, "touchend", this.endHandler)
                }, t.prototype.detachEvents = function() {
                    this.listener.removeEventListener(this.el, "touchstart", this.startHandler), this.listener.removeEventListener(this.el, "touchmove", this.moveHandler), this.listener.removeEventListener(this.el, "touchend", this.endHandler)
                }, t.prototype._init = function(e, t) {
                    this.touchPoint = {
                        x: t.touches[0].pageX,
                        y: t.touches[0].pageY
                    }, this.startPoint = {
                        x: t.touches[0].pageX,
                        y: t.touches[0].pageY
                    }, this.modelSnapshot = e
                }, t.prototype.updateTouchPoint = function(e) {
                    this.touchPoint.x = e.touches[0].pageX, this.touchPoint.y = e.touches[0].pageY
                }, t.prototype.getDelta = function() {
                    return this._getDifference(this.touchPoint, this.startPoint)
                }, t.prototype._getDifference = function(e, t) {
                    return {
                        x: e.x - t.x,
                        y: e.y - t.y
                    }
                }, t.prototype.stopCurrentEvent = function() {
                    this._cancelled = !0
                }, t.prototype._MakeGestureEvent = function(e) {
                    var t = this.getDelta(),
                        n = this;
                    return {
                        x: t.x,
                        y: t.y,
                        scale: 0,
                        rotation: 0,
                        snapshot: n.modelSnapshot,
                        innerEvent: e,
                        target: n.el
                    }
                }, e.exports("Components.Canvas.Gestures.MoveGesture", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(e, t) {
                    this.el = e, this.gestureStart = null, this.gestureChange = null, this.gestureEnd = null, this.touchPoint = null, this.startPoint = null, this.modelSnapshot = null, this.AttachEvents(t)
                };
                return t.prototype.AttachEvents = function(e) {
                    var t = this;
                    this.startHandler = function(n) {
                        t.initScaleRotateGesture(e.clone(), n), null != t.gestureStart && t.gestureStart(t._MakeGestureEvent(n)), n.stopPropagation()
                    }, this.moveHandler = function(e) {
                        e.preventDefault(), t.updateTouchPoint(e), null != t.gestureChange && t.gestureChange(t._MakeGestureEvent(e)), e.stopPropagation()
                    }, this.endHandler = function(e) {
                        null != t.gestureEnd && t.gestureEnd(t._MakeGestureEvent(e)), e.stopPropagation()
                    }, this.el.addEventListener("touchstart", this.startHandler), this.el.addEventListener("touchmove", this.moveHandler), this.el.addEventListener("touchend", this.endHandler)
                }, t.prototype.DetachEvents = function() {
                    this.el.removeEventListener("touchstart", this.startHandler), this.el.removeEventListener("touchmove", this.moveHandler), this.el.removeEventListener("touchend", this.endHandler)
                }, t.prototype.initScaleRotateGesture = function(e, t) {
                    this.touchPoint = {
                        x: t.touches[0].pageX,
                        y: t.touches[0].pageY
                    }, this.startPoint = {
                        x: t.touches[0].pageX,
                        y: t.touches[0].pageY
                    }, this.modelSnapshot = e
                }, t.prototype.updateTouchPoint = function(e) {
                    this.touchPoint.x = e.touches[0].pageX, this.touchPoint.y = e.touches[0].pageY
                }, t.prototype.getDelta = function() {
                    return this._getDifference(this.touchPoint, this.startPoint)
                }, t.prototype.getDeltaScale = function() {
                    var e = this.modelSnapshot.getCentre();
                    return this._toScaler(this.touchPoint, e) - this._toScaler(this.startPoint, e)
                }, t.prototype._getDifference = function(e, t) {
                    return {
                        x: e.x - t.x,
                        y: e.y - t.y
                    }
                }, t.prototype._toScaler = function(e, t) {
                    var n = this._getDifference(e, t);
                    return Math.sqrt(Math.pow(n.x, 2) + Math.pow(n.y, 2))
                }, t.prototype._MakeGestureEvent = function(e) {
                    var t = this.getDeltaScale(),
                        n = this;
                    return {
                        x: 0,
                        y: 0,
                        scale: t,
                        rotation: 0,
                        snapshot: n.modelSnapshot,
                        innerEvent: e,
                        target: n.el
                    }
                }, e.exports("Components.Canvas.Gestures.SingleFingerScaleGesture", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(e, t) {
                    this.el = e, this.gestureStart = null, this.gestureChange = null, this.gestureEnd = null, this.touchPoint = null, this.startPoint = null, this.modelSnapshot = null, this.AttachEvents(t)
                };
                return t.prototype.AttachEvents = function(e) {
                    var t = this;
                    this.startHandler = function(n) {
                        t.initScaleRotateGesture(e.clone(), n), null != t.gestureStart && t.gestureStart(t._MakeGestureEvent(n)), n.stopPropagation()
                    }, this.moveHandler = function(e) {
                        e.preventDefault(), t.updateTouchPoint(e), null != t.gestureChange && t.gestureChange(t._MakeGestureEvent(e)), e.stopPropagation()
                    }, this.endHandler = function(e) {
                        null != t.gestureEnd && t.gestureEnd(t._MakeGestureEvent(e)), e.stopPropagation()
                    }, this.el.addEventListener("touchstart", this.startHandler), this.el.addEventListener("touchmove", this.moveHandler), this.el.addEventListener("touchend", this.endHandler)
                }, t.prototype.DetachEvents = function() {
                    this.el.removeEventListener("touchstart", this.startHandler), this.el.removeEventListener("touchmove", this.moveHandler), this.el.removeEventListener("touchend", this.endHandler)
                }, t.prototype.initScaleRotateGesture = function(e, t) {
                    this.touchPoint = {
                        x: t.touches[0].pageX,
                        y: t.touches[0].pageY
                    }, this.startPoint = {
                        x: t.touches[0].pageX,
                        y: t.touches[0].pageY
                    }, this.modelSnapshot = e
                }, t.prototype.updateTouchPoint = function(e) {
                    this.touchPoint.x = e.touches[0].pageX, this.touchPoint.y = e.touches[0].pageY
                }, t.prototype.getDeltaAngle = function() {
                    var e = this.modelSnapshot.getCentre();
                    return this._getAngle(e, this.startPoint) - this._getAngle(e, this.touchPoint)
                }, t.prototype._getDifference = function(e, t) {
                    return {
                        x: e.x - t.x,
                        y: e.y - t.y
                    }
                }, t.prototype._getAngle = function(e, t) {
                    var n = this._getDifference(e, t);
                    return Math.atan2(n.y, n.x)
                }, t.prototype._MakeGestureEvent = function(e) {
                    var t = this.getDeltaAngle(),
                        n = this;
                    return {
                        x: 0,
                        y: 0,
                        scale: 0,
                        rotation: t,
                        snapshot: n.modelSnapshot,
                        innerEvent: e,
                        target: n.el
                    }
                }, e.exports("Components.Canvas.Gestures.SingleFingerRotateGesture", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = e.Components.Canvas.Gestures,
                    n = function(e, n, i) {
                        var r = this;
                        this.onMove = null, this.onRotate = null, this.onScale = null, this.onEnd = null, this.onMulti = null;
                        var o = !0,
                            a = null,
                            s = new t.PinchGesture(e, i);
                        s.gestureStart = function(e) {
                            n.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && (a = n), e.innerEvent.touches.length > 1 && "function" == typeof r.onMulti && r.onMulti()
                        }, s.gestureChange = function(e) {
                            a === n && (null != r.onScale && o && r.onScale(e), null != r.onRotate && o && r.onRotate(e), null != r.onMove && o && r.onMove(e))
                        }, s.gestureEnd = function(e) {
                            a = null, "function" == typeof r.onEnd && o && r.onEnd(e);
                        }, this.disable = function() {
                            o = !1
                        }, this.enable = function() {
                            o = !0
                        }
                    };
                return e.exports("Components.Canvas.EventLayers.HammerEventLayer", n)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = e.Components.Canvas.EventLayers,
                    n = function(e, n, i) {
                        var r = this;
                        this.onMove = null, this.onRotate = null, this.onScale = null, this.onEnd = null;
                        var o = new t.HammerEventLayer(e, n, i),
                            a = new t.ModalTouchEventLayer(e, n, i);
                        o.onMulti = function(e) {
                            o.enable(), a.disable()
                        }, a.onSingle = function(e) {
                            o.disable(), a.enable()
                        }, o.onMove = a.onMove = function(e) {
                            "function" == typeof r.onMove && r.onMove(e)
                        }, o.onRotate = a.onRotate = function(e) {
                            "function" == typeof r.onRotate && r.onRotate(e)
                        }, o.onScale = a.onScale = function(e) {
                            "function" == typeof r.onScale && r.onScale(e)
                        }, a.onEnd = function(e) {
                            "function" == typeof r.onEnd && r.onEnd(e)
                        }, o.onEnd = function(e) {
                            "function" == typeof r.onEnd && r.onEnd(e)
                        }, this.setMoveMode = function() {
                            o.disable(), a.enable(), a.setMoveMode()
                        }, this.setRotateMode = function() {
                            o.disable(), a.enable(), a.setRotateMode()
                        }, this.setScaleMode = function() {
                            o.disable(), a.enable(), a.setScaleMode()
                        }, this.disable = function() {
                            o.disable(), a.disable()
                        }, this.enable = function() {
                            o.enable(), a.enable()
                        }
                    };
                return e.exports("Components.Canvas.EventLayers.ModalHammerEventLayer", n)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = {
                    WebkitEventFacade: {
                        addEventListener: function(e, t, n) {
                            e.addEventListener(t, n)
                        },
                        removeEventListener: function(e, t, n) {
                            e.removeEventListener(t, n)
                        }
                    },
                    WinMoEventFacade: {
                        addEventListener: function(e, t, n) {
                            e.attachEvent(t, n)
                        },
                        removeEventListener: function(e, t, n) {
                            e.detachEvent(t, n)
                        }
                    }
                };
                return e.exports("Components.Canvas.EventLayers.EventFacades", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = e.Components.Canvas.Gestures,
                    n = function(e, n, i) {
                        var r = this,
                            o = !0;
                        this.onMove = null, this.onRotate = null, this.onScale = null, this.onEnd = null, this.onSingle = null;
                        var a = "move";
                        this.setMoveMode = function() {
                            a = "move"
                        }, this.setScaleMode = function() {
                            a = "scale"
                        }, this.setRotateMode = function() {
                            a = "rotate"
                        };
                        var s = null,
                            l = new t.MoveGesture(e, i);
                        l.gestureStart = function(e) {
                            n.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && !n.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && (s = n), 1 === e.innerEvent.touches.length && "function" == typeof r.onSingle && r.onSingle()
                        }, l.gestureChange = function(e) {
                            s === n && null != r.onMove && "move" === a && o && r.onMove(e)
                        }, l.gestureEnd = function(e) {
                            s = null, "function" == typeof r.onEnd && "move" === a && o && r.onEnd(e)
                        };
                        var d = new t.SingleFingerRotateGesture(e, i);
                        d.gestureStart = function(e) {
                            n.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && (s = n)
                        }, d.gestureChange = function(e) {
                            s === n && null != r.onRotate && "rotate" === a && o && r.onRotate(e)
                        }, d.gestureEnd = function(e) {
                            s = null, "function" == typeof r.onEnd && "rotate" === a && o && r.onEnd(e)
                        };
                        var c = new t.SingleFingerScaleGesture(e, i);
                        c.gestureStart = function(e) {
                            n.surrounds(e.innerEvent.touches[0].pageX, e.innerEvent.touches[0].pageY) && (s = n)
                        }, c.gestureChange = function(e) {
                            s === n && null != r.onScale && "scale" === a && o && r.onScale(e)
                        }, c.gestureEnd = function(e) {
                            s = null, "function" == typeof r.onEnd && "scale" === a && o && r.onEnd(e)
                        }, this.disable = function() {
                            o = !1
                        }, this.enable = function() {
                            o = !0
                        }
                    };
                return e.exports("Components.Canvas.EventLayers.ModalTouchEventLayer", n)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, i) {
                    var r = this,
                        o = e.Lib.Utils.options(n),
                        a = o.isNullOrEmpty("opacity") ? .4 : n.opacity,
                        s = o.isNullOrEmpty("glowOpacity") ? a : n.glowOpacity,
                        l = o.isNullOrEmpty("glowColor") ? "#31b7db" : n.glowColor,
                        d = o.isNullOrEmpty("borderStyle") ? "" : n.borderStyle,
                        c = (n.displayLayers || [], document.createElement("div"));
                    c.id = "bleed-glow", c.style.position = "absolute", c.style.zIndex = e.Configuration.Canvas.zIndex.bleed;
                    this.setCardCoverage = function(e, t, n) {
                        var i = hexToRgb(l);
                        t && (c.style["-moz-box-shadow"] = c.style["-webkit-box-shadow"] = c.style.boxShadow = "0px 0px 0px " + t.x + "px rgba(" + i.r + ", " + i.g + ", " + i.b + ", " + s + ")"), e && (c.style.width = e.width + "px", c.style.height = e.height + "px", c.style.left = e.left + "px", c.style.top = e.top + "px"), n && (c.style.borderRadius = n + "px")
                    }, this.showGlow = function(e) {
                        c.style.display = e ? "block" : "none"
                    }, this.showBorder = function() {
                        c.style.border = d
                    }, this.hideBorder = function() {
                        c.style.border = ""
                    }, this.setIndex = function(t) {
                        c.style.zIndex = e.Configuration.Canvas.zIndex.bleed + t
                    }, this.render = function() {
                        c.style.border = d, c.style.boxSizing = c.style.MozBoxSizing = c.style.webkitBoxSizing = "border-box", t.appendChild(c)
                    }, this.setBleed = function(e, t) {
                        r.setCardCoverage(null, {
                            x: e,
                            y: t
                        }, null)
                    }, this.Test = {
                        init: function(e, t, n, i) {
                            r.vertices = t.getVertices(n, i), r.bleedBox = e
                        },
                        linesIntersect: function() {
                            for (var e = Math.verticesToLines(r.vertices), t = Math.verticesToLines([{
                                    x: Math.round(r.bleedBox.left),
                                    y: Math.round(r.bleedBox.bottom)
                                }, {
                                    x: Math.round(r.bleedBox.left),
                                    y: Math.round(r.bleedBox.top)
                                }, {
                                    x: Math.round(r.bleedBox.right),
                                    y: Math.round(r.bleedBox.top)
                                }, {
                                    x: Math.round(r.bleedBox.right),
                                    y: Math.round(r.bleedBox.bottom)
                                }]), n = 0; n < e.length; n++)
                                for (var i = 0; i < t.length; i++)
                                    if (null != Math.getIntersection(e[n], t[i])) return !0;
                            return !1
                        },
                        noOverlap: function() {
                            return r.vertices[0].y < r.bleedBox.top && r.vertices[1].y < r.bleedBox.top && r.vertices[2].y < r.bleedBox.top && r.vertices[3].y < r.bleedBox.top || r.vertices[0].y > r.bleedBox.bottom && r.vertices[1].y > r.bleedBox.bottom && r.vertices[2].y > r.bleedBox.bottom && r.vertices[3].y > r.bleedBox.bottom || r.vertices[0].x < r.bleedBox.left && r.vertices[1].x < r.bleedBox.left && r.vertices[2].x < r.bleedBox.left && r.vertices[3].x < r.bleedBox.left || r.vertices[0].x > r.bleedBox.right && r.vertices[1].x > r.bleedBox.right && r.vertices[2].x > r.bleedBox.right && r.vertices[3].x > r.bleedBox.right
                        },
                        allInside: function() {
                            return r.vertices[0].y > r.bleedBox.top && r.vertices[1].y > r.bleedBox.top && r.vertices[2].y > r.bleedBox.top && r.vertices[3].y > r.bleedBox.top && r.vertices[0].x > r.bleedBox.left && r.vertices[1].x > r.bleedBox.left && r.vertices[2].x > r.bleedBox.left && r.vertices[3].x > r.bleedBox.left && r.vertices[0].x < r.bleedBox.right && r.vertices[1].x < r.bleedBox.right && r.vertices[2].x < r.bleedBox.right && r.vertices[3].x < r.bleedBox.right && r.vertices[0].y < r.bleedBox.bottom && r.vertices[1].y < r.bleedBox.bottom && r.vertices[2].y < r.bleedBox.bottom && r.vertices[3].y < r.bleedBox.bottom
                        },
                        run: function() {
                            return !this.allInside() && !this.noOverlap() && !this.linesIntersect()
                        }
                    }
                };
                return e.exports("Components.Canvas.Objects.CardCoverage", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function() {
                    return {
                        Items: [],
                        Models: [],
                        Options: [],
                        CardSize: null,
                        length: function() {
                            return this.Items.length
                        },
                        moveUp: function(e) {
                            this.setOrder(e, e + 1)
                        },
                        moveDown: function(e) {
                            this.setOrder(e, e - 1)
                        },
                        moveTop: function(e) {
                            this.setOrder(e, this.length() - 1)
                        },
                        moveBottom: function(e) {
                            this.setOrder(e, 0)
                        },
                        setOrder: function(e, t) {
                            this.Items.move(e, t);
                            for (var n = 0; n < this.length(); n++) this.Items[n].setIndex(n)
                        },
                        add: function(e, t) {
                            this.Items.push(e);
                            for (var n = !1, i = 0; i < this.Options.length; i++)
                                if (this.Options[i].name === t.name) {
                                    n = !0;
                                    break
                                }
                            n || this.Options.push(t)
                        },
                        remove: function(e) {
                            this.Options.splice(e, 1);
                            var t = document.querySelector(".canvas-layer#layer" + e);
                            t.parentNode && t.parentNode.removeChild(t), this.Items.splice(e, 1), this.Models.splice(e, 1);
                            for (var n = 0; n < this.Items.length; n++) {
                                var i = this.Items[n];
                                if (i.id !== n) {
                                    var t = document.querySelector(".canvas-layer#layer" + i.id);
                                    t && t.setAttribute("id", "layer" + n), i.id = n
                                }
                            }
                        },
                        removeByName: function(e) {
                            for (var t = 0; t < this.Items.length; t++)
                                if (this.Items[t].name === e) return this.remove(t)
                        },
                        removeOptionByName: function(e) {
                            for (var t = 0; t < this.Options.length; t++)
                                if (this.Options[t].name === e) {
                                    this.Options.splice(t, 1);
                                    break
                                }
                        },
                        resetAll: function(e) {
                            for (var t = 0; t < this.length(); t++) this.Items[t].reset()
                        },
                        disableAll: function(e) {
                            for (var t = 0; t < this.length(); t++) this.Items[t].disable()
                        },
                        enableAll: function(e) {
                            for (var t = 0; t < this.length(); t++) this.Items[t].enable()
                        }
                    }
                };
                return e.exports("Components.Canvas.Objects.LayerCollection", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, i) {
                    var r = n.options || {},
                        o = n.layers.Options[i],
                        a = e.Configuration.Canvas.zIndex.layer + (i || 0),
                        s = this,
                        l = "<div id='customerImage' class='fade' style='top:50%; left:50%; position:absolute; z-index:" + a + "'>                              <style>                                 #customerImage-lining img { top:0; left:0; position:absolute; }                                 </style>                                <div id='customerImage-lining' style='position:relative; width:100%; height:100%; display: none'>                               </div>                          </div>",
                        d = {
                            width: 241,
                            height: 153
                        },
                        c = null,
                        u = null,
                        p = null,
                        h = null,
                        g = null,
                        f = null,
                        m = !1,
                        v = r.isVertical,
                        b = void 0 !== o.isVertical ? o.isVertical : v;
                    this.onLoad = function() {}, this.setImage = function(e) {
                        if (null !== g && null !== h) try {
                            h.removeChild(g)
                        } catch (t) {}
                        p.style.opacity = "0", f = document.getElementById("canvas-spinner"), f && (f.style.opacity = 1);
                        var n = new Image;
                        n.onload = y, n.src = e
                    }, this.setPosition = function(e, t) {
                        u = {
                            x: e,
                            y: t
                        }, p.style.top = Math.round(t) + "px", p.style.left = Math.round(e) + "px"
                    }, this.getPosition = function() {
                        return u
                    }, this.setSize = function(e, t) {
                        c = {
                            height: t,
                            width: e
                        }, p.style.width = Math.round(e) + "px", p.style.height = Math.round(t) + "px"
                    }, this.update = function(e, t, n, i) {
                        s.setSize(n, i), s.setPosition(t, e), m && (g.style.width = Math.round(i) + "px", g.style.height = Math.round(n) + "px", g.style.top = Math.round(-(n - i) / 2) + "px", g.style.left = Math.round((n - i) / 2) + "px")
                    }, this.getDisplayedSize = function() {
                        return c
                    }, this.getRawImageSize = function() {
                        return d
                    }, this.getRawImageAspectRatio = function() {
                        return d.width / d.height
                    }, this.getBoundingBox = function() {
                        return p.getBoundingClientRect()
                    }, this.getRotationAdjustment = function(e) {
                        return v && !m ? -90 : v && m && e ? 180 : 0
                    }, this.getDomElement = function() {
                        return p
                    }, this.getCustomerImageLining = function() {
                        return h
                    }, this.setIndex = function(t) {
                        p.style.zIndex = e.Configuration.Canvas.zIndex.layer + t
                    }, this.getIndex = function(t) {
                        return p.style.zIndex - e.Configuration.Canvas.zIndex.layer
                    };
                    var y = function() {
                        g = this, g.width > g.height && b ? (g.style["-webkit-transform"] = g.style["-ms-transform"] = g.style["-o-transform"] = g.style.MozTransform = "rotate(90deg)", m = !0) : m = !1, d = m ? {
                            width: g.height,
                            height: g.width
                        } : {
                            width: g.width,
                            height: g.height
                        }, g.style.width = "100%", g.style.height = "100%", h.appendChild(g), h.style.display = "block", f = document.getElementById("canvas-spinner"), f && (f.style.opacity = 0), p.style.opacity = 1, s.onLoad(g)
                    };
                    this.render = function(e) {
                        t.prependHtml(l), p = $("#layer" + i + " #customerImage")[0], h = $("#layer" + i + " #customerImage-lining")[0], e && (p.style.overflow = "hidden")
                    }, this.center = function(e, t, n) {
                        var i = t ? -n : r.customImageMargin || 0,
                            o = {},
                            a = e.width() / d.width,
                            l = e.height() / d.height,
                            c = Math[t ? "min" : "max"](l, a);
                        o.width = d.width * c + 2 * i, o.height = d.height * c + 2 * i, o.left = e.left + (e.width() - o.width) / 2, o.top = e.top + (e.height() - o.height) / 2, s.update(o.top, o.left, o.width, o.height)
                    }
                };
                return e.exports("Components.Canvas.Objects.ImageLayer", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, i, r, o) {
                    function a(e, t) {
                        var n = t.split(/ |-/),
                            i = new Array,
                            r = n[0] + " ";
                        e.html(n[0]);
                        for (var o = e.height(), a = 1; a < n.length; a++) e.html(e.html() + " " + n[a]), e.height() > o && (o = e.height(), i.push(r), r = ""), r += n[a] + " ";
                        return r && i.push(r), i
                    }
                    var s = e.Configuration.Canvas.zIndex.layer + (i || 0),
                        l = 1 === r,
                        d = "background:transparent; top:50%; left:50%; white-space:pre-wrap; text-indent:0; position:absolute; z-index:" + s,
                        c = "<label id='customerTextLabel{0}' class='customTextLabel' style='" + d + "'> </label>",
                        u = "",
                        p = [],
                        h = {},
                        g = {},
                        f = {},
                        m = 0;
                    new Array;
                    this.setSize = function(e, t) {
                        l ? _$textLabels.css("min-height", h.size + "px") : (m = Math.round((t / r - h.size) / r), _$textLabels.css("padding-top", m + "px"), _$textLabels.css("min-height", Math.round(t / r) - m + "px")), _$textLabels.css((o ? "min-" : "") + "width", Math.round(e) + "px"), g = {
                            height: t,
                            width: e
                        }
                    }, this.setPosition = function(e, t) {
                        _$textLabels.css("left", Math.round(t) + "px");
                        for (var n = 0; r > n; n++) _$textLabels.eq(n).css("top", Math.round(e + n * (g.height / r)) + "px");
                        f = {
                            top: e,
                            left: t
                        }
                    }, this.getDomElement = function(e) {
                        return "undefined" != typeof e ? _$textLabels[e] : p
                    }, this.updateText = function(e, t) {
                        _$textLabels[t - 1].innerHTML = e
                    }, this.setIndex = function(t) {
                        _$textLabels.css("zIndex", e.Configuration.Canvas.zIndex.layer + t)
                    }, this.getIndex = function(t) {
                        return _$textLabels[0].style.zIndex - e.Configuration.Canvas.zIndex.layer
                    }, this.setStyle = function(e) {
                        $.extend(h, e), _$textLabels.css("color", h.color), _$textLabels.css("font-family", h.font), h.size = Math.round(h.size), g.height && g.width && !l && this.setSize(g.width, g.height), _$textLabels.css("font-size", h.size * n.scaleFactor + "px"), _$textLabels.css("font-weight", h.bold ? "bold" : ""), _$textLabels.css("font-style", h.italic ? "italic" : ""), _$textLabels.css("text-shadow", h.shadow ? "#3E3E3E 2px 2px 5px" : ""), _$textLabels.css("text-align", h.alignment), l && _$textLabels.css("line-height", (h.size + 5) * n.scaleFactor + "px")
                    }, this.getStyle = function() {
                        return h
                    }, this.getText = function() {
                        var e = new Array;
                        if (l)
                            for (var t = p[0].innerHTML.split(/\r?\n/), n = 0; n < t.length; n++) e = e.concat(a(_$textLabels.eq(0), t[n]));
                        else
                            for (var n = 0; r > n; n++) e = e.concat(_$textLabels.eq(n).html());
                        return e
                    }, this.getTextPosition = function() {
                        for (var e = [], t = 0; r > t; t++) {
                            var n = _$textLabels.eq(t),
                                i = n.html();
                            n.html("").append("<span>" + i + "</span>");
                            var o = n.children().first().position().left;
                            e[t] = {
                                left: o,
                                top: g.height / 2 * t + m
                            }, n.html(i)
                        }
                        return e
                    }, this.render = function() {
                        t.prependHtml(u), _$textLabels = $("#layer" + i + " .customTextLabel"), p = _$textLabels.toArray()
                    };
                    for (var v = 0; r > v; v++) u += String.format(c, v)
                };
                return e.exports("Components.Canvas.Objects.TextLayer", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, r) {
                    var o, a = e.Configuration.Canvas.zIndex.layer + (r || 0),
                        l = "background:transparent; top:50%; left:50%; text-indent:0; position:absolute; z-index:" + a,
                        d = "<div  id='cardMg'><div class='mgInitial mg0'>C</div><div class='mgInitial mg1'>J</div><div class='mgInitial mg2'>F</div></div>",
                        l = {},
                        c = {},
                        u = {},
                        p = 0;
                    this.setSize = function(e, t) {
                        p = Math.round((t / 2 - l.size) / 2), _$textLabels.css("padding-top", p + "px"), _$textLabels.css("min-width", Math.round(e) + "px"), _$textLabels.css("min-height", Math.round(t / 2) - p + "px"), c = {
                            height: t,
                            width: e
                        }
                    }, this.setPosition = function(e, t) {
                        _$textLabels.css("left", Math.round(t) + "px"), _$textLabels.eq(0).css("top", Math.round(e) + "px"), _$textLabels.eq(1).css("top", Math.round(e + c.height / 2) + "px"), u = {
                            top: e,
                            left: t
                        }
                    }, this.getDomElement = function(e) {
                        return "undefined" != typeof e ? _$textLabels[e] : o
                    }, this.updateText = function(e, t) {
                        _$textLabels[t - 1].innerHTML = e
                    }, this.setIndex = function(t) {
                        _$textLabels.css("zIndex", e.Configuration.Canvas.zIndex.layer + t)
                    }, this.getIndex = function(t) {
                        return _$textLabels[0].style.zIndex - e.Configuration.Canvas.zIndex.layer
                    }, this.setStyle = function(e) {
                        $.extend(l, e), _$textLabels.css("color", l.color), _$textLabels.css("font-family", l.font), l.size = Math.round(l.size)
                    }, this.getStyle = function() {
                        return l
                    }, this.getText = function() {
                        return [o[0].innerHTML, o[1].innerHTML]
                    }, this.getTextPosition = function() {
                        var e = [];
                        for (i = 0; i < 3; i++) {
                            var t, n, r = $("#cardMg .mg" + i),
                                o = r.html();
                            t = parseInt(r.css("left")), n = parseInt(r.css("top")), s = parseInt(r.css("font-size")), colour = r.css("color"), e[i] = {
                                left: t,
                                top: n,
                                color: colour,
                                size: s,
                                text: o
                            }
                        }
                        return e
                    }, this.render = function() {
                        t.prependHtml(d), _$textLabels = $("#cardMg")
                    }
                };
                return e.exports("Components.Canvas.Objects.MonogramLayer", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Utils");
                var t = function(t, n, i) {
                    var r = this,
                        o = e.Lib.Utils.options(n.options),
                        a = n.options.isVertical,
                        s = o.isNullOrEmpty("maskOpacity") ? .6 : n.options.maskOpacity,
                        l = n.options.boxShadowColor || "255,255,255",
                        d = e.Configuration.Canvas.zIndex.template,
                        c = "0px 0px 5px 1000px rgba(" + l + "," + s + ")",
                        u = n.options.templateBorder || "none",
                        p = "<img alt='' id='productTemplate' class='fade'                              style='position:absolute; opacity:0; border:" + u + "; z-index:" + d + "; -moz-box-shadow: " + c + "; -webkit-box-shadow: " + c + "; box-shadow: " + c + ";' /> " + e.Lib.UI.Transitions() + e.Lib.UI.Spinner("fade"),
                        h = null,
                        g = null,
                        f = function(e, t) {
                            e && "function" == typeof t && (e.addEventListener ? e.addEventListener("load", t, !1) : e.attachEvent("onload", t))
                        },
                        m = function(e, t) {
                            return {
                                width: e,
                                height: t
                            }
                        },
                        v = function(e, t) {
                            return a && (t += r.size.width), {
                                top: e,
                                left: t
                            }
                        };
                    this.setSize = function(e, t) {
                        h.style.width = (a ? t : e) + "px", h.style.height = (a ? e : t) + "px"
                    }, this.setPosition = function(e, t) {
                        if (h.style.top = r.offset.top + "px", h.style.left = r.offset.left + "px", a) {
                            var n = $(h);
                            n.css("transform", "rotate(90deg)"), n.css("transform-origin", "top left"), n.css("-webkit-transform", "rotate(90deg)"), n.css("-webkit-transform-origin", "top left")
                        }
                    }, this.getSize = function() {
                        return r.size
                    }, this.getPosition = function() {
                        return r.offset
                    }, this.setOpacity = function(e) {
                        h.style.opacity = e
                    }, this.getBoundingBox = function() {
                        return h.getBoundingClientRect()
                    }, this.setTemplate = function(e, t) {
                        f(h, t), h.src = e
                    }, this.update = function(e, t) {
                        r.size = m(e.width, e.height), r.offset = v(e.top, e.left), t && (r.setSize(r.size.width, r.size.height), r.setPosition(r.size.left, r.size.top))
                    };
                    var b = function() {
                        g.style.top = r.size.height / 2 - g.clientHeight / 2 + r.offset.top + "px", g.style.left = (n.options.isVertical ? r.offset.left - (r.size.width / 2 + g.clientWidth / 2) : r.size.width / 2 - g.clientWidth / 2 + r.offset.left) + "px"
                    };
                    this.render = function() {
                        t.appendHtml(p), h = document.getElementById("productTemplate"), g = document.getElementById("canvas-spinner"), h.style.borderRadius = this.size.width / n.standardCardSize.width * 10 + "px", r.update(i, !0), b(), f(h, function() {
                            1 !== this.width && 1 !== this.height && 0 == this.style.opacity && (this.style.opacity = 1)
                        })
                    }, this.size = m(i.width, i.height), this.offset = v(i.top, i.left)
                };
                return e.exports("Components.Canvas.Objects.Template", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(e, n, i, r, o, a, s, l) {
                    var d = this;
                    this.top = n, this.left = e, this.width = i, this.height = r, this.rotation = o, this.scale = a, this.flip = s, this.cardCoverage = null, this.fittingArea = null, this.bleed = null, this.imageUrl = null, this.enabled = null, this.offset = l, this.containerOffset = {
                        x: 0,
                        y: 0
                    }, this.clone = function() {
                        return new t(d.left, d.top, d.width, d.height, d.rotation, d.scale, d.flip, d.offset)
                    }, this.getCentre = function() {
                        return {
                            x: d.left + d.width / 2 + d.offset.x,
                            y: d.top + d.height / 2 + d.offset.y
                        }
                    }, this.getRotationDegrees = function() {
                        return (360 - 360 * this.rotation / (2 * Math.PI)).roundTo(0)
                    }, this.getRotationPositive = function() {
                        return 2 * Math.PI - this.rotation
                    }, this.getPercentageScale = function() {
                        return 100 * d.scale
                    }, this.deserialise = function(e, t) {
                        null != e && (d.left = e.left * t.x, d.top = e.top * t.y, d.width = e.width, d.height = e.height, d.rotation = e.rotation, d.scale = e.scale, d.flip = e.flip, d.enabled = e.enabled, d.cardCoverage = e.cardCoverage, d.fittingArea = e.fittingArea, d.bleed = e.bleed, d.imageUrl = e.imageUrl)
                    }, this.setOffset = function(e) {
                        d.offset.x = e.x + d.containerOffset.x, d.offset.y = e.y + d.containerOffset.y
                    }
                };
                return e.exports("Components.Canvas.Models.Image", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(e, n) {
                    var i = this;
                    this.text = n || [], this.style = {
                        font: e.font,
                        fontId: e.fontId,
                        size: e.size,
                        bold: e.bold,
                        italic: e.italic,
                        shadow: e.shadow,
                        alignment: e.alignment,
                        color: e.color,
                        colorId: e.colorId,
                        outlineColour: e.outlineColour,
                        lineSpacing: e.lineSpacing
                    }, this.position = null, this.bleed = null, this.enabled = null, this.clone = function() {
                        var e = i.style;
                        return new t(e.font, e.size, e.bold, e.italic, e.shadow, e.alignment, e.color)
                    }, this.deserialise = function(e) {
                        null != e && (i.text = e.text, i.style = e.style, i.enabled = e.enabled, i.position = e.position, i.bleed = e.bleed)
                    }
                };
                return e.exports("Components.Canvas.Models.Text", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Utils");
                var t = function(t, n, i, r) {
                    i.options = i.options || {};
                    var o = this,
                        a = i.options.isVertical,
                        s = {
                            x: 5,
                            y: 5
                        },
                        l = {
                            x: 5,
                            y: 5
                        };
                    this.imageLoaded = function() {};
                    var d, c, u = i.template,
                        p = i.templateModel,
                        h = function() {
                            d = i.options.scale && i.options.scale.x || p.width / i.standardCardSize.width, c = i.options.scale && i.options.scale.y || p.height / i.standardCardSize.height
                        };
                    h();
                    var g = !1;
                    i.options.scaleFactor = d;
                    var f = {
                            top: 0,
                            left: 0,
                            bottom: i.standardCardSize.height,
                            right: i.standardCardSize.width,
                            width: function() {
                                return this.right - this.left
                            },
                            height: function() {
                                return this.bottom - this.top
                            }
                        },
                        m = {},
                        v = i.layers.Options[r].inset === !0,
                        b = new e.Components.Canvas.Objects.ImageLayer(t, i, r),
                        y = new e.Components.Canvas.Objects.CardCoverage(t, i.options, p);
                    y.render(), b.render(), b.onLoad = function(e) {
                        1 !== e.width && 1 !== e.height && o.positionCustomImage()
                    }, this.positionCustomImage = function() {
                        var e = v ? 0 : 2,
                            t = f;
                        g && (t = m, e = 0), h();
                        var n = w(t, p, {
                            x: l.x + e,
                            y: l.y + e
                        });
                        b.center(n, v, l.y);
                        var i = b.getDisplayedSize(),
                            r = b.getPosition();
                        o.imageLoaded({
                            width: i.width,
                            height: i.height,
                            left: r.x,
                            top: r.y
                        })
                    }, this.positionCardCoverage = function(e) {
                        e && (p = e), h();
                        var t = w(f, p, {
                                x: 0,
                                y: 0
                            }),
                            n = {
                                top: t.top,
                                left: t.left,
                                width: t.width(),
                                height: t.height()
                            },
                            i = {
                                x: l.x * d,
                                y: l.y * c
                            };
                        y.setCardCoverage(n, i, 10 * d)
                    }, this.getConfiguration = function() {
                        var e = b.getBoundingBox(),
                            t = u.getBoundingBox(),
                            n = a ? {
                                top: ((t.right - e.right) / d).roundTo(0),
                                left: ((e.top - t.top) / c).roundTo(0),
                                bottom: ((t.width - (e.left - t.left)) / d).roundTo(0),
                                right: ((e.bottom - t.bottom + t.height) / c).roundTo(0)
                            } : {
                                top: ((e.top - t.top) / c).roundTo(0),
                                left: ((e.left - t.left) / d).roundTo(0),
                                bottom: ((e.bottom - t.bottom + t.height) / c).roundTo(0),
                                right: ((e.right - t.right + t.width) / d).roundTo(0)
                            };
                        return n
                    }, this.getRotationDegrees = function() {
                        return n.getRotationDegrees() + b.getRotationAdjustment(1 == n.flip)
                    }, this.isCoveringCard = function() {
                        return y.Test.init(w(f), b.getDomElement(), n.getRotationDegrees(), n.scale), y.Test.run()
                    }, this.notAllInside = function() {
                        return y.Test.init(w(f), b.getDomElement(), n.getRotationDegrees(), n.scale), y.Test.allInside()
                    };
                    var w = function(e, t, n) {
                        var i = t || u.getBoundingBox(),
                            r = n || l;
                        return {
                            top: i.top + (e.top - r.y) * c,
                            bottom: i.top + (e.bottom + r.y) * c,
                            left: i.left + (e.left - r.x) * d,
                            right: i.left + (e.right + r.x) * d,
                            width: function() {
                                return this.right - this.left
                            },
                            height: function() {
                                return this.bottom - this.top
                            }
                        }
                    };
                    this.setImage = function(e) {
                        b.setImage(e)
                    }, this.setBleed = function(e, t) {
                        l.x = e, l.y = t, o.positionCardCoverage()
                    }, this.setCardCoverage = function(e) {
                        f.top = e.top + s.y, f.left = e.left + s.y, f.bottom = e.bottom - s.x, f.right = e.right - s.x, o.positionCardCoverage(i.templateModel)
                    }, this.setFittingArea = function(e) {
                        g = !0, m.top = e.top, m.left = e.left, m.bottom = e.bottom, m.right = e.right
                    }, this.getCustomerImageLining = function() {
                        return b.getCustomerImageLining()
                    }, this.setIndex = function(e) {
                        b.setIndex(e), y.setIndex(e)
                    }, this.getIndex = function() {
                        return b.getIndex()
                    }, this.getCustomerImage = function() {
                        return b.getDomElement()
                    }, this.showGlow = function(e) {
                        y.showGlow(e)
                    }, this.showBorder = function() {
                        y.showBorder()
                    }, this.hideBorder = function() {
                        y.hideBorder()
                    }
                };
                return e.exports("Components.Canvas.Manipulators.Image", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, i, r, o, a) {
                    var s, l, d, c, u = i.templateModel,
                        p = i.template,
                        h = {
                            x: 1,
                            y: 1
                        },
                        g = function() {
                            s = u.width / i.standardCardSize.width, l = u.height / i.standardCardSize.height
                        };
                    g(), i.options.scaleFactor = s, i.options.glowColor = i.layers.Options[r].glowColor, i.options.opacity = 1;
                    var f = new e.Components.Canvas.Objects.CardCoverage(t, i.options, u),
                        m = new e.Components.Canvas.Objects.TextLayer(t, i.options, r, n.text.length, a);
                    f.render(), m.render();
                    var v = {
                            top: 0,
                            left: 0,
                            bottom: 153,
                            right: 241,
                            width: function() {
                                return this.right - this.left
                            },
                            height: function() {
                                return this.bottom - this.top
                            }
                        },
                        b = function() {
                            n.style.size = n.style.size || Math.floor(d.height / i.layers.Options[r].scaleFactor), m.setStyle(n.style);
                            for (var e = 0; e < n.text.length; e++) m.updateText(n.text[e] || "", e + 1)
                        },
                        y = function() {
                            m.setSize(d.width, d.height), m.setPosition(d.top, d.left)
                        },
                        w = function() {
                            var e = i.templateModel;
                            g(), _coverageArea = {
                                top: e.top + v.top * l,
                                bottom: e.top + v.bottom * l,
                                left: e.left + v.left * s,
                                right: e.left + v.right * s,
                                width: function() {
                                    return this.right - this.left
                                },
                                height: function() {
                                    return this.bottom - this.top
                                }
                            }, d = {
                                top: _coverageArea.top,
                                bottom: _coverageArea.bottom,
                                left: _coverageArea.left,
                                right: _coverageArea.right,
                                width: _coverageArea.width(),
                                height: _coverageArea.height()
                            }, f.setCardCoverage(d, h), b(), y(), x()
                        },
                        x = function() {
                            var e = p.getBoundingBox();
                            c = {
                                top: e.top + (v.top - h.y) * l,
                                bottom: e.top + (v.bottom + h.y) * l,
                                left: e.left + (v.left - h.x) * s,
                                right: e.left + (v.right + h.x) * s
                            }
                        };
                    this.positionCardCoverage = function() {
                        w()
                    }, this.getConfiguration = function() {
                        x();
                        for (var e = p.getBoundingBox(), t = m.getTextPosition(), n = [], i = {
                                top: ((c.top - e.top) / s).roundTo(0),
                                left: ((c.left - e.left) / s).roundTo(0),
                                bottom: ((c.bottom - e.bottom + e.height) / l).roundTo(0),
                                right: ((c.right - e.right + e.width) / l).roundTo(0)
                            }, r = 0; r < t.length; r++) n[r] = {
                            top: (t[r].top + i.top + h.y - 1).roundTo(2),
                            left: (t[r].left + i.left + h.x + 1).roundTo(2)
                        };
                        return i.Text = n, i
                    }, this.testCoverage = function() {
                        var e = [];
                        x();
                        for (var t = 0; o > t; t++) f.Test.init(c, m.getDomElement(t), 0, 1), e[t] = f.Test.allInside();
                        return e
                    }, this.setBleed = function(e, t) {
                        f.setBleed(e, t), h.x = e, h.y = t, x()
                    }, this.hideBleed = function() {
                        f.showGlow(!1)
                    }, this.setIndex = function(e) {
                        m.setIndex(e), f.setIndex(e)
                    }, this.getIndex = function() {
                        return m.getIndex()
                    }, this.updateText = function(e, t) {
                        m.updateText(e, t)
                    }, this.getText = function() {
                        return m.getText()
                    }, this.setCardCoverage = function(e, t, n, i) {
                        v.top = e, v.left = t, v.bottom = n, v.right = i, w()
                    }, this.updateTextSyle = function(e) {
                        m.setStyle(e)
                    }, this.getTextSyle = function() {
                        return m.getStyle()
                    }
                };
                return e.exports("Components.Canvas.Manipulators.Text", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, i, r, o) {
                    var a, s, l, d = i.templateModel,
                        c = i.template,
                        u = {
                            x: 1,
                            y: 1
                        },
                        p = function() {
                            a = d.width / i.standardCardSize.width, s = d.height / i.standardCardSize.height
                        };
                    p(), i.options.scaleFactor = a, i.options.glowColor = i.layers.Options[r].glowColor, i.options.opacity = 1;
                    var h = new e.Components.Canvas.Objects.CardCoverage(t, i.options, d),
                        g = new e.Components.Canvas.Objects.MonogramLayer(t, i.options, r);
                    h.render(), g.render();
                    var f = {
                            top: 0,
                            left: 0,
                            bottom: 153,
                            right: 241,
                            width: function() {
                                return this.right - this.left
                            },
                            height: function() {
                                return this.bottom - this.top
                            }
                        },
                        m = function() {
                            var e = c.getBoundingBox();
                            l = {
                                top: e.top + (f.top - u.y) * s,
                                bottom: e.top + (f.bottom + u.y) * s,
                                left: e.left + (f.left - u.x) * a,
                                right: e.left + (f.right + u.x) * a
                            }
                        };
                    this.positionCardCoverage = function() {}, this.getConfiguration = function() {
                        m();
                        for (var e = c.getBoundingBox(), t = g.getTextPosition(), n = [], i = {
                                top: ((l.top - e.top) / a).roundTo(0),
                                left: ((l.left - e.left) / a).roundTo(0),
                                bottom: ((l.bottom - e.bottom + e.height) / s).roundTo(0),
                                right: ((l.right - e.right + e.width) / s).roundTo(0)
                            }, r = 0; r < t.length; r++) n[r] = {
                            top: (t[r].top + i.top).roundTo(0),
                            left: (t[r].left + i.left + 2 * u.x).roundTo(0)
                        };
                        return i.Text = n, i
                    }, this.testCoverage = function() {
                        var e = [];
                        m();
                        for (var t = 0; o > t; t++) h.Test.init(l, g.getDomElement(t), 0, 1), e[t] = h.Test.allInside();
                        return e
                    }, this.setBleed = function(e, t) {
                        h.setBleed(e, t), u.x = e, u.y = t, m()
                    }, this.hideBleed = function() {
                        h.showGlow(!1)
                    }, this.setIndex = function(e) {
                        g.setIndex(e), h.setIndex(e)
                    }, this.getIndex = function() {
                        return g.getIndex()
                    }, this.updateText = function(e, t) {
                        g.updateText(e, t)
                    }, this.getText = function() {
                        return g.getText()
                    }, this.setCardCoverage = function(e, t, n, i) {
                        f.top = e, f.left = t, f.bottom = n, f.right = i
                    }, this.updateTextSyle = function(e) {
                        g.setStyle(e)
                    }, this.getTextSyle = function() {
                        return g.getStyle()
                    }
                };
                return e.exports("Components.Canvas.Manipulators.Monogram", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Utils");
                var t = function(t, n, i) {
                    function r() {
                        c.top = g.top, c.left = g.left, c.bottom = g.bottom, c.right = g.right, c.scale = g.scale, c.rotation = g.rotation, c.flip = g.flip, h.serialise()
                    }

                    function o() {
                        return new e.Components.Canvas.Models.Image(0, 0, 0, 0, 0, 1, !1, {
                            x: 0,
                            y: 0
                        }, {})
                    }

                    function a(t) {
                        return Modernizr.csstransforms3d ? new e.Components.Canvas.Core.Matrix3dCssEngine(t) : new e.Components.Canvas.Core.Translate2dCssEngine(t)
                    }
                    this.id = t;
                    var s = {
                        x: 1,
                        y: 1
                    };
                    i.options.scale && (s.x = i.options.scale.x || i.options.scale, s.y = i.options.scale.y || i.options.scale);
                    var l = void 0 !== i.layers.Options[t].isVertical ? i.layers.Options[t].isVertical : i.options.isVertical;
                    if (i.options.preview) {
                        var d = i.layers.Models[t],
                            c = d ? new e.Components.Canvas.Models.Image(d.left * s.x, d.top * s.y, d.width, d.height, d.rotation, d.scale, d.flip, {
                                x: null,
                                y: null
                            }) : new e.Components.Canvas.Models.Image(0, 0, 0, 0, 0, 1, !1, {
                                x: null,
                                y: null
                            }, {}),
                            u = new e.Components.Canvas.Manipulators.Image(n, c, i, t),
                            p = a(u.getCustomerImage());
                        return p.Update(c), d && d.cardCoverage && u.setCardCoverage(d.cardCoverage), d && d.fittingArea && u.setFittingArea(d.fittingArea), d && d.imageUrl && u.setImage(d.imageUrl), d && d.bleed && u.setBleed(d.bleed.x, d.bleed.y), this.SetImage = function(e) {
                            u.setImage(e)
                        }, this.setCardCoverage = function(e, t, n, r) {
                            var o = i.options.isVertical ? {
                                left: t,
                                top: e,
                                bottom: r,
                                right: n
                            } : {
                                left: t,
                                top: e,
                                bottom: n,
                                right: r
                            };
                            u.setCardCoverage(o)
                        }, this.setBleed = function(e, t) {
                            c.bleed = {
                                x: e,
                                y: t
                            }, u.setBleed(e, t)
                        }, this.getConfiguration = function() {
                            var e = u.getConfiguration();
                            return e.rotation = u.getRotationDegrees(), e.flip = c.flip, e.order = u.getIndex(), e
                        }, n.style.overflow = "hidden", n.style.position = "absolute", n.style.top = 0, n.style.left = 0, n.style.width = "100%", n.style.height = "100%", void u.showGlow(!1)
                    }
                    var h = this,
                        c = o(),
                        g = c.clone(),
                        f = (2 * Math.PI).roundTo(2),
                        m = (Math.PI / 2).roundTo(2),
                        v = (Math.PI + m).roundTo(2);
                    this.snapshot = null, c.deserialise(i.layers.Models[t], s), this.enabled = !1;
                    var b = !1;
                    this.isCoveringCard = !1, this.onImageLoad = null;
                    var u = new e.Components.Canvas.Manipulators.Image(n, c, i, t);
                    this.positionCustomImage = function() {
                        u.positionCustomImage()
                    }, u.imageLoaded = function(e) {
                        c.width = e.width, c.height = e.height, c.setOffset({
                            x: e.left,
                            y: e.top
                        }), b = !1, h.enabled && w.enable(), h.imageLoaded()
                    };
                    var p = a(u.getCustomerImage()),
                        y = e.Components.Canvas.EventLayers.HandleBasedEventFactory(u.getCustomerImageLining(), t),
                        w = y.getEventLayer(c);
                    w.onMove = function(e) {
                        null != typeof h.onMove && h.onMove(e), "function" == typeof h.onEventComplete && h.onEventComplete(e)
                    }, w.onRotate = function(e) {
                        "function" == typeof h.onRotate && h.onRotate(e), "function" == typeof h.onEventComplete && h.onEventComplete(e)
                    }, w.onScale = function(e) {
                        "function" == typeof h.onScale && h.onScale(e), "function" == typeof h.onEventComplete && h.onEventComplete(e)
                    }, w.onEnd = function(e) {
                        "function" == typeof h.onGestureComplete && h.onGestureComplete(c), h.serialise()
                    }, w.onStart = function(e) {
                        "function" == typeof h.onGestureStart && h.onGestureStart(c)
                    }, this.setIndex = function(e) {
                        u.setIndex(e), y.setIndex(e)
                    }, this.getIndex = function() {
                        return y.getIndex()
                    }, this.testCardCoverage = function() {
                        return i.layers.Options[h.id].inset ? h.isCoveringCard = u.notAllInside() : h.isCoveringCard = u.isCoveringCard(), h.isCoveringCard = $(n.parentElement).width() ? h.isCoveringCard : !0, "function" == typeof h.onCardCoverageChange && h.onCardCoverageChange(h.isCoveringCard), h.isCoveringCard
                    }, this.setMoveMode = function() {
                        w.enable(), w.setMoveMode()
                    }, this.setRotateMode = function() {
                        w.enable(), w.setRotateMode()
                    }, this.setScaleMode = function() {
                        w.enable(), w.setScaleMode()
                    }, this.setFlipMode = function() {}, this.setNoMode = function() {
                        w.disable()
                    }, this.setBleed = function(e, t) {
                        c.bleed = {
                            x: e,
                            y: t
                        }, u.setBleed(e, t), h.serialise()
                    }, this.setCardCoverage = function(e, t, n, i) {
                        var r = l ? {
                            left: t,
                            top: e,
                            bottom: e + i - t,
                            right: t + n - e
                        } : {
                            left: t,
                            top: e,
                            bottom: n,
                            right: i
                        };
                        c.cardCoverage = r, u.setCardCoverage(r), h.serialise()
                    }, this.setFittingArea = function(e, t, n, r) {
                        var o = i.options.isVertical ? {
                            left: t,
                            top: e,
                            bottom: r,
                            right: n
                        } : {
                            left: t,
                            top: e,
                            bottom: n,
                            right: r
                        };
                        u.setFittingArea(o), c.fittingArea = o
                    }, this.update = function() {
                        p.Update(c), h.testCardCoverage()
                    }, this.SetImage = function(e, t) {
                        b = !0, t && (r(), h.update()), u.setImage(e), c.imageUrl = e, h.serialise()
                    }, this.hasImage = function() {
                        return !!c.imageUrl
                    }, this.updateMaskAndTemplate = function() {
                        u.positionCardCoverage(i.templateModel), h.serialise()
                    }, this.disable = function() {
                        h.enabled = !1, c.enabled = !1, w.disable(), h.serialise(), $("#layer" + h.id).css("pointer-events", "none")
                    }, this.enable = function() {
                        h.enabled = !0, c.enabled = !0, b || w.enable(), h.serialise(), $("#layer" + h.id).css("pointer-events", "auto")
                    }, this.showBorder = function() {
                        u.showBorder()
                    }, this.hideBorder = function() {
                        u.hideBorder()
                    }, this.showGlow = function(e) {
                        u.showGlow(e), w.glow && w.glow(e)
                    }, this.reset = function() {
                        r(), h.setup(), h.update(), "function" == typeof h.onImageScale && h.onImageScale(c.getPercentageScale())
                    }, this.addOnScaleListener = function(e) {
                        h.onImageScale = e
                    }, this.addOnImageLoadListener = function(e) {
                        h.onImageLoad = e
                    }, this.imageLoaded = function() {
                        "function" == typeof h.onImageScale && h.onImageScale(c.getPercentageScale()), "function" == typeof h.onImageLoad && h.onImageLoad()
                    }, this.onMove = function(e) {
                        h.enabled && h.UpdateModelMove(e)
                    }, this.onRotate = function(e) {
                        h.enabled && h.UpdateModelRotate(e)
                    }, this.onScale = function(e) {
                        h.enabled && (h.UpdateModelScale(e), "function" == typeof h.onImageScale && h.onImageScale(c.getPercentageScale()))
                    }, this.UpdateModelScale = function(e) {
                        c.scale = e.snapshot.scale + e.scale
                    }, this.UpdateModelMove = function(e) {
                        c.top = e.snapshot.top + e.y, c.left = e.snapshot.left + e.x
                    }, this.onEventComplete = function(e) {
                        h.update()
                    }, this.UpdateModelRotate = function(e) {
                        h.SetAngle(e.snapshot.rotation + e.rotation)
                    }, this.SetAngle = function(e) {
                        h.enabled && (e >= f && (e -= f), 0 > e && (e = f + e), c.rotation = e), h.serialise()
                    }, this.positionCustomImage = function() {
                        u.positionCustomImage()
                    }, this.moveUp = function(e) {
                        c.top -= e, h.update(), h.serialise()
                    }, this.moveDown = function(e) {
                        c.top += e, h.update(), h.serialise()
                    }, this.moveRight = function(e) {
                        c.left += e, h.update(), h.serialise()
                    }, this.moveLeft = function(e) {
                        c.left -= e, h.update(), h.serialise()
                    }, this.rotate = function(e) {
                        h.SetAngle(c.rotation + e), h.update()
                    }, this.scale = function(e) {
                        c.scale = e / 100, h.update(), h.serialise()
                    }, this.getScale = function() {
                        return c.getPercentageScale()
                    }, this.scaleUp = function(e) {
                        c.scale += e / 100, h.update(), h.serialise()
                    }, this.scaleDown = function(e) {
                        c.scale -= e / 100, h.update(), h.serialise()
                    }, this.flip = function() {
                        h.enabled && (c.flip = !c.flip, h.update(), h.serialise())
                    }, this.SnapRight = function() {
                        var e = 0;
                        c.rotation > 0 && c.rotation <= m ? e = 0 : c.rotation > m && c.rotation <= Math.PI.roundTo(2) ? e = m : c.rotation > Math.PI && c.rotation <= v ? e = Math.PI.roundTo(2) : (c.rotation > m + Math.PI && c.rotation <= f || 0 === c.rotation) && (e = v), h.SetAngle(e), h.update()
                    }, this.SnapLeft = function() {
                        var e = 0;
                        c.rotation >= 0 && c.rotation < m.roundTo(2) ? e = m : c.rotation >= m && c.rotation < Math.PI ? e = Math.PI.roundTo(2) : c.rotation >= Math.PI && c.rotation < v ? e = v : c.rotation >= m + Math.PI && c.rotation < f && (e = 0), h.SetAngle(e), h.update()
                    }, this.RevertGesture = function(e) {
                        null !== e.snapshot && (c.top = e.snapshot.top, c.left = e.snapshot.left, c.rotation = e.snapshot.rotation, c.scale = e.snapshot.scale), h.update()
                    }, this.TakeSnapshot = function() {
                        h.snapshot = c.clone()
                    }, this.update(), this.getConfiguration = function() {
                        var e = u.getConfiguration();
                        return e.rotation = u.getRotationDegrees(), e.flip = c.flip, e.order = h.getIndex(), e
                    }, this.snap90Left = function() {
                        h.SnapLeft()
                    }, this.snap90Right = function() {
                        h.SnapRight()
                    }, this.rotate90Left = function() {
                        h.Rotate(m)
                    }, this.rotate90Right = function() {
                        h.Rotate(-m)
                    }, i.events.registerEventHandler("onrotate", function() {
                        h.setup(), h.positionCustomImage(), h.update()
                    }), this.setup = function() {
                        if (n.parentNode) {
                            var e = n.parentNode.getTopLeft();
                            c.containerOffset = {
                                x: e.left,
                                y: e.top
                            }
                        }
                        h.updateMaskAndTemplate(), "function" == typeof n.onresize && n.onresize()
                    }, this.getDomCont = function() {
                        return n
                    }, this.serialise = function() {
                        var e = jQuery.extend({}, c);
                        e.left = c.left / s.x, e.top = c.top / s.y, i.layers.Models[h.id] = e, i.serialise()
                    }, c.cardCoverage && (u.setCardCoverage(c.cardCoverage), h.hasCardCoverage = !0), c.fittingArea && u.setFittingArea(c.fittingArea), c.bleed && (u.setBleed(c.bleed.x, c.bleed.y), h.hasBleed = !0), c.enabled ? h.enabled = !0 : w.disable(), e.Lib.Utils.options(i.options).isNotNullBoolean("showGlow") ? this.showGlow(i.options.showGlow) : this.showGlow(!0)
                };
                return e.exports("Components.Canvas.ViewControllers.Image", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, i) {
                    var r = this;
                    this.id = t;
                    var o = {
                            enabled: !1
                        },
                        a = function(e, t) {
                            this.enabled = !0;
                            var n = function(e) {
                                    for (var t = new Array, n = 0; n < e.length; n++) t.push(document.getElementById(e[n]));
                                    return t
                                },
                                i = function(e, t) {
                                    if (e.value.length > 0) {
                                        var n = r.alphanumericOnly(e);
                                        p.updateText(n, t + 1), r.testCardCoverage(), u.text[t] = n, r.serialise()
                                    }
                                },
                                o = function(e) {
                                    $(a[e]).on("input propertychange paste", function() {
                                        i(this, e)
                                    })
                                };
                            this.enable = function(e) {
                                var t = a[e - 1];
                                t.enabled = !0, t.removeAttribute("maxlength")
                            }, this.disable = function(e) {
                                var t = a[e - 1];
                                t.enabled = !1, t.setAttribute("maxlength", t.value.length)
                            }, this.disableAll = function() {
                                for (var e = 0; e < a.length; e++) a[e].enabled = !1, a[e].setAttribute("maxlength", a[e].value.length)
                            };
                            var a = n(e);
                            if (a.every(function(e) {
                                    return null === e
                                })) this.enabled = !1;
                            else
                                for (var s = 0; s < a.length; s++) a[s] && (o(s), a[s].enabled = !0, t && t[s] && (a[s].value = t[s]))
                        },
                        s = {
                            font: "Arial",
                            fontId: 1,
                            size: 18,
                            bold: !1,
                            italic: !1,
                            shadow: !1,
                            alignment: "left",
                            color: "#000000",
                            colorId: "black",
                            lineSpacing: 22,
                            outlineColour: null
                        };
                    $.extend(s, i.layers.Options[t].Style);
                    for (var l = i.layers.Options[t].txtBoxes, d = [""], c = 0; c < l.length - 1; c++) d = d.concat([""]);
                    var u = new e.Components.Canvas.Models.Text(s, d);
                    u.deserialise(i.layers.Models[t]), !i.options.preview && l && (o = new a(l, u.text));
                    var p = new e.Components.Canvas.Manipulators.Text(n, u, i, t, l.length, o.enabled);
                    if (this.setup = function() {
                            r.serialise()
                        }, this.alphanumericOnly = function(e) {
                            var t = e.value,
                                n = t[t.length - 1];
                            if (!n.match(/^[a-zA-Z0-9\s]+$/)) {
                                var i = t.substring(0, t.length - 1);
                                return e.value = i, i
                            }
                            return t
                        }, this.disable = function(e) {
                            o.disable(e), r.serialise()
                        }, this.enable = function(e) {
                            o.enable(e), r.serialise()
                        }, this.setCardCoverage = function(e, t, n, i) {
                            var o = {
                                top: e,
                                left: t,
                                bottom: n,
                                right: i
                            };
                            u.position = o, p.setCardCoverage(e, t, n, i), r.serialise()
                        }, this.setBleed = function(e, t) {
                            u.bleed = {
                                x: e,
                                y: t
                            }, p.setBleed(e, t), r.serialise()
                        }, this.getDomCont = function() {
                            return n
                        }, this.setIndex = function(e) {
                            p.setIndex(e)
                        }, this.getIndex = function() {
                            return p.getIndex()
                        }, this.testCardCoverage = function() {
                            _textCoverage = p.testCoverage();
                            for (var e = [], t = 0; t < _textCoverage.length; t++) _textCoverage[t] || e.push(t + 1);
                            return r.isCoveringCard = 0 == e.length, "function" == typeof r.onCardCoverageChange && r.onCardCoverageChange(0 == e.length || e), 0 == e.length || e
                        }, this.updateTextSyle = function(e) {
                            $.extend(u.style, e), p.updateTextSyle(e), r.testCardCoverage(), r.serialise()
                        }, this.setTextStyle = function(e) {
                            return p.updateTextSyle(e)
                        }, this.getTextSyle = function() {
                            return p.getTextSyle()
                        }, this.getText = function() {
                            return p.getText()
                        }, this.serialise = function() {
                            i.layers.Models[t] = u, i.serialise()
                        }, this.deserialise = function() {
                            i.deserialise(), u.deserialise(i.layers.Models[t])
                        }, this.getConfiguration = function() {
                            var e = p.getConfiguration();
                            return e.lines = u.text, e.style = u.style, e.order = r.getIndex(), e.rotation = 0, e.flip = !1, e
                        }, i.events.registerEventHandler("onrotate", function() {
                            p.positionCardCoverage()
                        }), u.bleed && p.setBleed(u.bleed.x, u.bleed.y), u.position) {
                        var h = u.position;
                        p.setCardCoverage(h.top, h.left, h.bottom, h.right)
                    }
                    i.options.preview && p.hideBleed()
                };
                return e.exports("Components.Canvas.ViewControllers.Text", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                var t = function(t, n, i) {
                    var r = this,
                        o = function(e, t) {
                            var n = function(e) {
                                    for (var t = [], n = 0; n < e.length; n++) t.push(document.getElementById(e[n]));
                                    return t
                                },
                                i = n(e),
                                o = function(e, t) {
                                    l.updateText(e.value, t + 1), r.testCardCoverage(), s.text[t] = e.value, r.serialise()
                                },
                                a = function(e) {
                                    i[e].onkeyup = function(t) {
                                        o(t.target, e), t.target.enabled ? t.target.removeAttribute("maxlength") : t.target.setAttribute("maxlength", t.target.value.length)
                                    }
                                };
                            this.enable = function(e) {
                                i[e - 1].enabled = !0
                            }, this.disable = function(e) {
                                i[e - 1].enabled = !1
                            }, this.disableAll = function() {
                                for (var e = 0; e < i.length; e++) i[e].enabled = !1
                            };
                            for (var d = 0; d < i.length; d++) i[d] && (a(d), i[d].enabled = !0, t && t[d] && (i[d].value = t[d]))
                        },
                        a = {
                            font: "Arial",
                            size: null,
                            bold: !1,
                            italic: !1,
                            shadow: !1,
                            alignment: "left",
                            color: "#000000",
                            colorId: "black",
                            lineSpacing: 0,
                            outlineColour: "#ffffff"
                        };
                    $.extend(a, i.layers.Options[t].Style);
                    var s = new e.Components.Canvas.Models.Text(a);
                    s.deserialise(i.layers.Models[t]);
                    var l = new e.Components.Canvas.Manipulators.Monogram(n, s, i, t, 3);
                    if (!i.options.preview && i.layers.Options[t].txtBoxes) var d = new o(i.layers.Options[t].txtBoxes, s.text);
                    if (this.setup = function() {
                            r.serialise()
                        }, this.disable = function(e) {
                            d.disable(e), r.serialise()
                        }, this.enable = function(e) {
                            d.enable(e), r.serialise()
                        }, this.setIndex = function(e) {
                            l.setIndex(e)
                        }, this.clear = function() {
                            $("#layer" + t).remove()
                        }, this.updateTextStyle = function(e) {
                            $.extend(s.style, e), l.updateTextSyle(e), r.serialise()
                        }, this.serialise = function() {
                            i.layers.Models[t] = s, i.serialise()
                        }, this.deserialise = function() {
                            i.deserialise(), s.deserialise(i.layers.Models[t])
                        }, this.getConfiguration = function() {
                            var e = l.getConfiguration();
                            return e
                        }, i.events.registerEventHandler("onrotate", function() {
                            l.positionCardCoverage()
                        }), s.bleed && l.setBleed(s.bleed.x, s.bleed.y), s.position) {
                        var c = s.position;
                        l.setCardCoverage(c.top, c.left, c.bottom, c.right)
                    }
                    i.options.preview && l.hideBleed()
                };
                return e.exports("Components.Canvas.ViewControllers.Monogram", t)
            }(window.ServerSide || {}), window.ServerSide = function(e) {
                e.requires("Lib.Utils");
                var t = function(t, n) {
                    function i() {
                        a(), g.options.preview || g.events.registerEventHandler("onrotate", function() {
                            h(g.layers.CardSize)
                        }), o(), s(), l(), null != t.oncontrollerload && t.oncontrollerload(t), t.loaded = !0
                    }

                    function r(e) {
                        for (var t = 0; t < g.layers.Options.length; t++)
                            if (e === g.layers.Options[t].uuid) return g.layers.Options[t];
                        return null
                    }

                    function o() {
                        t.innerHTML = "", t.style.position = "relative", t.style.overflow = "hidden", t.loaded = !1
                    }

                    function a() {
                        g.deserialise(), ("undefined" == typeof n || null === n) && (n = {}), e.Lib.Utils.options(g.options).insertAll(n, !1), g.layers.Options = g.options.layers || (g.layers.Options.length > 0 ? g.layers.Options : null) || [{
                            name: "imageLayer",
                            type: "Image",
                            uuid: f.generateId()
                        }], g.options.isVertical = "orientation" in g.options && "vertical" === g.options.orientation, g.standardCardSize = g.options.isVertical ? {
                            width: e.Configuration.Canvas.StandardCardSize.height,
                            height: e.Configuration.Canvas.StandardCardSize.width
                        } : e.Configuration.Canvas.StandardCardSize;
                        var t = !g.layers || !g.layers.CardSize || "scale" in n ? {
                            width: g.standardCardSize.width,
                            height: g.standardCardSize.height
                        } : {
                            width: g.layers.CardSize.width,
                            height: g.layers.CardSize.height
                        };
                        n.scale && (t.width *= n.scale.x || n.scale, t.height *= n.scale.y || n.scale), h(t)
                    }

                    function s() {
                        g.template = new e.Components.Canvas.Objects.Template(t, g, g.templateModel), g.options.preview && (t.style.width = g.template.size.width + "px", t.style.height = g.template.size.height + "px"), g.template.render(), t.template = g.template
                    }

                    function l() {
                        for (var e = 0; e < g.layers.Options.length; e++) {
                            var t = g.layers.Options[e],
                                n = d(e, t);
                            g.options.displayLayers && -1 === g.options.displayLayers.indexOf(t.name) && n.show(!1)
                        }
                    }

                    function d(n, i) {
                        var r = u(n);
                        return t.appendChild(r), r = new e.Components.Canvas.ViewControllers[i.type](n, r, g), r.uuid = i.uuid, g.options.preview || r.setup(), g.layers.add(r, i), t[i.name] = c(r)
                    }

                    function c(e) {
                        return e.setOrder = function(e) {
                            g.layers.setOrder(this.getIndex(), e)
                        }, e.up = function() {
                            g.layers.moveUp(this.getIndex())
                        }, e.down = function() {
                            g.layers.moveDown(this.getIndex())
                        }, e.top = function() {
                            g.layers.moveTop(this.getIndex())
                        }, e.bottom = function() {
                            g.layers.moveBottom(this.getIndex())
                        }, e.show = function(e) {
                            e ? g.layers.moveTop(this.getIndex()) : g.layers.moveBottom(this.getIndex()), this.getDomCont().style.display = e ? "block" : "none"
                        }, e
                    }

                    function u(e) {
                        var t = document.createElement("div");
                        return t.id = "layer" + e, t.className = "canvas-layer", t
                    }

                    function p() {
                        var e = 241 / 153,
                            t = m.hasClass("landscape"),
                            i = n.widthFactor ? n.widthFactor : .7,
                            r = n.heightFactor ? n.heightFactor.ls : .35,
                            o = n.heightFactor ? n.heightFactor.pt : .3,
                            a = m.width() * i,
                            s = a / e,
                            l = t ? m.height() * r : m.height() * o;
                        s > l && (s = l, a = s * e), n.margin = (m.width() - a) / 2
                    }

                    function h(i) {
                        if (n.isResponsive && p(), "undefined" != typeof n && "margin" in n && e.Lib.Utils.options(n).isNotNullNumber("margin")) {
                            var r = i.width;
                            i.width = v.width() - 2 * n.margin, i.height *= i.width / r, t.style.height = i.height + (g.options.isVertical ? n.margin / 2 : 2 * n.margin) + "px"
                        }
                        "undefined" != typeof n && "size" in n && "width" in n.size && "height" in n.size && (i.width = n.size.width, i.height = n.size.height);
                        var o = 0,
                            a = 0;
                        g.options.preview || (o = Math.round((v.width() - i.width) / 2), a = Math.round((v.height() - i.height) / 2)), g.options.preview || (g.layers.CardSize = i), g.templateModel = {
                            left: o,
                            top: a,
                            bottom: a + i.height,
                            right: o + i.width,
                            width: i.width,
                            height: i.height
                        }, g.template && g.template.update(g.templateModel, !0)
                    }
                    var g = this;
                    this.layers = new e.Components.Canvas.Objects.LayerCollection, this.events = new e.Framework.Eventing.EventCollection;
                    var f = new e.Framework.Utils.AppHelper;
                    this.template = null, this.standardCardSize = {}, this.templateModel = {}, this.options = {};
                    var m, v = $(t);
                    n && n.aamd && (m = $(n.aamd)), t.SetOverlay = function(e) {
                        g.template.setTemplate(e, g.onTemplateLoad)
                    }, t.addOnOverlayLoadListener = function(e) {
                        g.onTemplateLoad = e
                    }, t.Reset = function() {
                        g.layers.resetAll()
                    }, t.Disable = function() {
                        g.layers.disableAll()
                    }, t.Enable = function() {
                        g.layers.enableAll()
                    }, t.Add = function(e) {
                        e.uuid = f.generateId(), g.layers.Options.push(e);
                        var t = g.layers.Items.length;
                        d(t, e), g.serialise()
                    }, t.Remove = function(e) {
                        g.events.removeEventHandler("onrotate", e), g.layers.remove(e), g.serialise()
                    }, t.RemoveByName = function(e) {
                        g.layers.removeByName(e), delete t[e], g.serialise()
                    }, t.nLayers = function(e) {
                        return g.layers.length()
                    }, t.getConfiguration = function(e) {
                        for (var t = [], n = 0; n < g.layers.length(); n++) {
                            var i = g.layers.Items[n].uuid;
                            t[n] = g.layers.Items[n].getConfiguration(), t[n].name = r(i).name
                        }
                        return t
                    }, this.serialise = function() {
                        e.Lib.Utils.SsgSerialiser.serialise("Canvas", this.layers)
                    }, this.deserialise = function() {
                        var t = e.Lib.Utils.SsgSerialiser.deserialise("Canvas");
                        t && (g.layers.Models = t.Models, g.layers.Options = t.Options, g.layers.CardSize = t.CardSize)
                    }, window.ondevicerotate = function() {
                        g.events.fireEvent("onrotate")
                    }, window.addOnResizeHandler("onrotate", function() {
                        g.events.fireEvent("onrotate")
                    }), i()
                };
                return e.exports("Components.Canvas.Controller", t)
            }(window.ServerSide || {}), window.APITracker = function() {
                function e(e, t, n, r, o, a) {
                    return o(e, t) ? void(d && -1 !== APITrackerConfig.Actions.indexOf(e) && i(r(n, e, t))) : void a()
                }

                function t(e, t, n) {
                    return p + "/" + e + "/" + s + "/" + l + "/" + n
                }

                function n(e, t, n) {
                    return p + "/" + e + "/" + s + "/" + l + "/" + t + "?infodesc=" + encodeURIComponent(n)
                }

                function i(e) {
                    try {
                        var t = new XMLHttpRequest;
                        t.open("GET", e, !0), t.send(null)
                    } catch (n) {}
                }

                function r(e) {
                    return !e || 0 === e.length
                }

                function o(e) {
                    return !r(e)
                }

                function a(e, t) {
                    return !r(e) && !r(t)
                }
                var s, l, d = !0,
                    c = "ApiTrack_FIKey",
                    u = "ApiTrack_UniqueKey",
                    p = APITrackerConfig.Urls.APITrackerBaseUrl;
                sessionStorage.getItem(c) && (s = sessionStorage.getItem(c)), sessionStorage.getItem(u) && (l = sessionStorage.getItem(u));
                var h = {
                    SetKeys: function(e, t, n) {
                        s = e, l = t, sessionStorage.setItem(c, s), sessionStorage.setItem(u, l), d = APITrackerConfig.Enabled && n
                    },
                    Action: function(n) {
                        e("action", n, "trackaction", t, o, function() {})
                    },
                    Info: function(t, i) {
                        e(t, i, "trackinfo", n, a, function() {})
                    }
                };
                return h
            }, window.APITrackerConfig = {
                Urls: {
                    APITrackerBaseUrl: 'https://uat.serversidegraphics.com/apitracker'
                },
                Actions: ["IO_TB", "IO_CM", "IS", "load", "submit"],
                Enabled: !1,
                Messages: {
                    UploadCustom: "Upload custom image with Id {0}",
                    UploadGallery: "Select gallery image with Id {0}",
                    SubmitSuccess: "Submited sucessfully",
                    SubmitError: "Error while submiting",
                    Load: "{0}",
                    MoveUp: "Moved up by {0} px",
                    MoveDown: "Moved down by {0} px",
                    MoveLeft: "Moved left by {0} px",
                    MoveRight: "Moved right by {0} px",
                    Reset: "Reset",
                    RotateRight: "Rotate 90 right",
                    Flip: "Flip",
                    GestureComplete: "scale: {0}, rotation: {1}, move: {2}x {3}y",
                    Scale: "Scaled by {0}%"
                },
                Keys: {
                    ImageSelection: "IS",
                    ToolBar: "IO_TB",
                    CardManipulation: "IO_CM",
                    PageLoad: "load",
                    Submit: "submit"
                }
            }, te = void 0, ne = function(e, t, n) {
                var i = function(t) {
                    var i = null,
                        r = null,
                        o = !1;
                    if (t = t || {}, t.options = t.options || {}, document.querySelector) {
                        var a = document.querySelector('script[data-name="aam-designer"]');
                        if (a) {
                            r = a.getAttribute("data-handoverkey") || null;
                            var s = a.getAttribute("data-bootstrap");
                            o = s && "true" === s.toLowerCase()
                        }
                    }
                    r || (designers = document.getElementsByClassName("aam-designer-init"), designers && designers[0] && (i = designers[0], r = i.getAttribute("handoverkey") || null, o = o || i.getAttribute("bootstrap") || null)), r = t.handoverKey || r, i = t.el || i, ServerSide.Configuration.Urls.Api = 'https://uat.serversidegraphics.com/pcs/api/v1/', ServerSide.Configuration.Urls.Cdn = 'https://uat.serversidegraphics.com/pcs/cdn/V2/App/Skins/FlatGenericV2/resources/img/', this.start = function() {
                        var o = e(i);
                        ServerSide.Configuration.Urls.Resources = t.options.resourcesFolder || ServerSide.Configuration.Urls.Cdn, o.hasClass("aam-designer-init") || o.addClass("aam-designer-init"), o.addClass("loading");
                        var a = document.createElement("img");
                        a.src = ServerSide.Configuration.Urls.Resources + "floatingBars.gif", a.id = "preloader", e(".aam-designer-init").append(a), Modernizr.touch ? o.addClass("mobile") : o.addClass("desktop"), i.App = new n(t), i.App.addLoadSubscriber(function() {
                            if (o.removeClass("loading"), i.App.Designer.KeepAlive.Enabled) {
                                var e = new ServerSide.Components.KeepAlive(i.App.Designer.KeepAlive.URL, {
                                    period: i.App.Designer.KeepAlive.Timing,
                                    units: "minutes"
                                });
                                e.start()
                            }
                        }), ServerSide.Lib.Utils.SsgSerialiser.init(i.id), i.App.init(r, i)
                    }, this.updateSingleColour = function(e, t) {
                        i.App.changeColour(e, t, !1), i.App.changeColour(e, t, !0)
                    }, this.hide = function() {
                        i.App.hide()
                    }, this.show = function() {
                        i.App.show()
                    }, this.close = function() {
                        i.App.close()
                    }, i && r && o && this.start(i)
                };
                return window.AAM = i, i
            }(r, a, Z),
            function(e) {
                var t = document,
                    n = "appendChild",
                    i = "styleSheet",
                    r = t.createElement("style");
                r.type = "text/css", t.getElementsByTagName("head")[0][n](r), r[i] ? r[i].cssText = e : r[n](t.createTextNode(e))
            }('.aam-designer-init {\r\n\r\n    /*all: initial;  blocking inheritance for all properties */\r\n    align-content: initial;\r\n    align-items: initial;\r\n    align-self: initial;\r\n    alignment-baseline: initial;\r\n    animation: initial;\r\n    backface-visibility: initial;\r\n    background: initial;\r\n\r\n    font-family: Arial, sans-serif;\r\n    font-size: 1em;\r\n    line-height: 1.4;\r\n\r\n    width: 830px;\r\n    height: 450px;\r\n    color: #000;\r\n    padding: 0;\r\n    margin: 0;\r\n    opacity: 1;\r\n    text-align: left;\r\n}\r\n\r\n.aam-designer-init *{\r\n    /*\r\n     * using inherit for normally heritable properties,\r\n     * and initial for the others, as unset does\r\n     */\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    outline: 0;\r\n    font-weight: inherit;\r\n    font-style: inherit;\r\n    font-family: inherit;\r\n    vertical-align: baseline;\r\n    align-content: initial;\r\n    align-items: initial;\r\n    align-self: initial;\r\n    background: initial;\r\n    box-sizing: initial;\r\n}\r\n\r\n\r\n/*! normalize.css v1.0.1 | MIT License | git.io/normalize */\r\n\r\n/* ==========================================================================\r\n   HTML5 display definitions\r\n   ========================================================================== */\r\n\r\n/*\r\n * Corrects `block` display not defined in IE 6/7/8/9 and Firefox 3.\r\n */\r\n\r\n.aam-designer-init article, aside, details, figcaption, figure, footer, header, nav, section, summary {\r\n    display: block;\r\n}\r\n\r\n/*\r\n * Corrects `inline-block` display not defined in IE 6/7/8/9 and Firefox 3.\r\n */\r\n\r\n.aam-designer-init audio, canvas, video {\r\n    display: inline-block;\r\n    *display: inline;\r\n    *zoom: 1;\r\n}\r\n\r\n/*\r\n * Prevents modern browsers from displaying `audio` without controls.\r\n * Remove excess height in iOS 5 devices.\r\n */\r\n\r\n.aam-designer-init audio:not([controls]) {\r\n    display: none;\r\n    height: 0;\r\n}\r\n\r\n/*\r\n * Addresses styling for `hidden` attribute not present in IE 7/8/9, Firefox 3,\r\n * and Safari 4.\r\n * Known issue: no IE 6 support.\r\n */\r\n\r\n.aam-designer-init [hidden] {\r\n    display: none;\r\n}\r\n\r\n/* ==========================================================================\r\n   Base\r\n   ========================================================================== */\r\n\r\n\r\n\r\n\r\n/* ==========================================================================\r\n   Links\r\n   ========================================================================== */\r\n\r\n/*\r\n * Addresses `outline` inconsistency between Chrome and other browsers.\r\n */\r\n\r\n.aam-designer-init a:focus {\r\n    outline: thin dotted;\r\n}\r\n\r\n/*\r\n * Improves readability when focused and also mouse hovered in all browsers.\r\n */\r\n\r\n.aam-designer-init a:active, a:hover {\r\n    outline: 0;\r\n}\r\n\r\n/* ==========================================================================\r\n   Typography\r\n   ========================================================================== */\r\n\r\n/*\r\n * Addresses font sizes and margins set differently in IE 6/7.\r\n * Addresses font sizes within `section` and `article` in Firefox 4+, Safari 5,\r\n * and Chrome.\r\n */\r\n\r\n.aam-designer-init h1 {\r\n    font-size: 2em;\r\n    margin: 0.67em 0;\r\n}\r\n\r\n.aam-designer-init h2 {\r\n    font-size: 1.5em;\r\n    margin: 0.83em 0;\r\n}\r\n\r\n.aam-designer-init h3 {\r\n    font-size: 1.17em;\r\n    margin: 1em 0;\r\n}\r\n\r\n.aam-designer-init h4 {\r\n    font-size: 1em;\r\n    margin: 1.33em 0;\r\n}\r\n\r\n.aam-designer-init h5 {\r\n    font-size: 0.83em;\r\n    margin: 1.67em 0;\r\n}\r\n\r\n.aam-designer-init h6 {\r\n    font-size: 0.75em;\r\n    margin: 2.33em 0;\r\n}\r\n\r\n\r\n/*\r\n * Improves readability of pre-formatted text in all browsers.\r\n */\r\n\r\n.aam-designer-init pre {\r\n    word-wrap: break-word;\r\n}\r\n\r\n\r\n\r\n/*\r\n * Addresses inconsistent and variable font size in all browsers.\r\n */\r\n\r\n.aam-designer-init small {\r\n    font-size: 80%;\r\n}\r\n\r\n/*\r\n * Prevents `sub` and `sup` affecting `line-height` in all browsers.\r\n */\r\n\r\n.aam-designer-init sub, sup {\r\n    font-size: 75%;\r\n    line-height: 0;\r\n    position: relative;\r\n    vertical-align: baseline;\r\n}\r\n\r\n.aam-designer-init sup {\r\n    top: -0.5em;\r\n}\r\n\r\n.aam-designer-init sub {\r\n    bottom: -0.25em;\r\n}\r\n\r\n\r\n\r\n/*\r\n * Define consistent border, margin, and padding.\r\n */\r\n\r\n.aam-designer-init fieldset {\r\n    border: 1px solid #c0c0c0;\r\n    margin: 0 2px;\r\n    padding: 0.35em 0.625em 0.75em;\r\n}\r\n\r\n/*\r\n * 1. Corrects font size not being inherited in all browsers.\r\n * 2. Addresses margins set differently in IE 6/7, Firefox 3+, Safari 5,\r\n *    and Chrome.\r\n * 3. Improves appearance and consistency in all browsers.\r\n */\r\n\r\n.aam-designer-init button, input, select, textarea {\r\n    font-size: 100%; /* 1 */\r\n    vertical-align: baseline; /* 3 */\r\n    *vertical-align: middle; /* 3 */\r\n}\r\n\r\n/*\r\n * Addresses Firefox 3+ setting `line-height` on `input` using `!important` in\r\n * the UA stylesheet.\r\n */\r\n\r\n.aam-designer-init button, input {\r\n    line-height: normal;\r\n}\r\n\r\n/*\r\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\r\n *    and `video` controls.\r\n * 2. Corrects inability to style clickable `input` types in iOS.\r\n * 3. Improves usability and consistency of cursor style between image-type\r\n *    `input` and others.\r\n * 4. Removes inner spacing in IE 7 without affecting normal text inputs.\r\n *    Known issue: inner spacing remains in IE 6.\r\n */\r\n\r\n.aam-designer-init button, input[type="button"], /* 1 */  input[type="reset"], input[type="submit"] {\r\n    -webkit-appearance: button; /* 2 */\r\n    cursor: pointer; /* 3 */\r\n    *overflow: visible;  /* 4 */\r\n}\r\n\r\n/*\r\n * Re-set default cursor for disabled elements.\r\n */\r\n\r\n.aam-designer-init button[disabled], input[disabled] {\r\n    cursor: default;\r\n}\r\n\r\n/*\r\n * 1. Addresses box sizing set to content-box in IE 8/9.\r\n * 2. Removes excess padding in IE 8/9.\r\n * 3. Removes excess padding in IE 7.\r\n *    Known issue: excess padding remains in IE 6.\r\n */\r\n\r\n.aam-designer-init input[type="checkbox"], input[type="radio"] {\r\n    box-sizing: border-box; /* 1 */\r\n    padding: 0; /* 2 */\r\n    *height: 13px; /* 3 */\r\n    *width: 13px; /* 3 */\r\n}\r\n\r\n/*\r\n * 1. Addresses `appearance` set to `searchfield` in Safari 5 and Chrome.\r\n * 2. Addresses `box-sizing` set to `border-box` in Safari 5 and Chrome\r\n *    (include `-moz` to future-proof).\r\n */\r\n\r\n.aam-designer-init input[type="search"] {\r\n    -webkit-appearance: textfield; /* 1 */\r\n    -moz-box-sizing: content-box;\r\n    -webkit-box-sizing: content-box; /* 2 */\r\n    box-sizing: content-box;\r\n}\r\n\r\n/*\r\n * Removes inner padding and search cancel button in Safari 5 and Chrome\r\n * on OS X.\r\n */\r\n\r\n.aam-designer-init input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {\r\n    -webkit-appearance: none;\r\n    -webkit-box-shadow: none;\r\n}\r\n\r\n/*\r\n * Removes inner padding and border in Firefox 3+.\r\n */\r\n\r\n.aam-designer-init button::-moz-focus-inner, input::-moz-focus-inner {\r\n    border: 0;\r\n    padding: 0;\r\n}\r\n\r\n/*\r\n * 1. Removes default vertical scrollbar in IE 6/7/8/9.\r\n * 2. Improves readability and alignment in all browsers.\r\n */\r\n\r\n.aam-designer-init textarea {\r\n    overflow: auto; /* 1 */\r\n    vertical-align: top; /* 2 */\r\n}\r\n\r\n/* ==========================================================================\r\n   Tables\r\n   ========================================================================== */\r\n\r\n/*\r\n * Remove most spacing between table cells.\r\n */\r\n\r\n.aam-designer-init table {\r\n    border-collapse: collapse;\r\n    border-spacing: 0;\r\n}\r\n\r\n/* Default Styles for Gallery page*/\r\n/* Portrait */\r\n\r\n@media screen and (orientation:portrait) {\r\n\r\n  .imgCont\r\n   {\r\n       margin: 1%;\r\n }\r\n}\r\n\r\n\r\n/* Landscape */\r\n@media screen and (orientation:landscape) {\r\n   \r\n    .imgCont\r\n    {\r\n        margin: 0.5%;\r\n    }\r\n}\r\n\r\n/* Smartphones (Both Orientations) ----------- */\r\n@media only screen \r\nand (max-width: 767px) \r\n{\r\n    \r\n\r\n}\r\n\r\n\r\n/* Smartphones (landscape) ----------- */\r\n@media only screen \r\nand (max-width: 767px) \r\nand (orientation : landscape) {\r\n    .imgCont {\r\n      width: 31.5%;\r\n   }  \r\n       \r\n}\r\n\r\n/* Smartphones (portrait) ----------- */\r\n@media only screen \r\nand (max-width: 767px) \r\nand (orientation : portrait) {\r\n    .imgCont {\r\n      width: 47%;\r\n   }  \r\n      \r\n}\r\n\r\n/* iPads (Both Orientations) ----------- */\r\n@media only screen \r\nand (min-device-width : 768px) \r\nand (max-device-width : 1024px) \r\n{\r\n\r\n    \r\n}\r\n\r\n\r\n/* iPads (landscape) ----------- */\r\n@media only screen \r\nand (min-device-width : 768px) \r\nand (max-device-width : 1024px) \r\nand (orientation : landscape) {\r\n\r\n  .imgCont {\r\n      width: 23.5%;\r\n   }  \r\n       \r\n}\r\n\r\n/* iPads (portrait) ----------- */\r\n@media only screen \r\nand (min-device-width : 768px) \r\nand (max-device-width : 1024px) \r\nand (orientation : portrait) {\r\n\r\n    .imgCont {\r\n      width: 30.7%;\r\n\r\n   }\r\n\r\n}\r\n\r\n/* Other Devices  ----------- */\r\n@media only screen \r\nand (min-width: 1025px) {\r\n\r\n    .imgCont {\r\n      width: 18.6%;\r\n\r\n   }\r\n\r\n}\r\n\r\n.side-padding-gallery\r\n{\r\n    padding: 0 1%;\r\n}\r\n\r\n.gallery-img\r\n{\r\n   opacity:0;\r\n  -moz-transition: opacity 0.2s linear; /* Firefox 4 */\r\n   -webkit-transition: opacity 0.2s linear; /* Safari and Chrome */\r\n    -o-transition: opacity 0.2s linear;\r\n transition: opacity 0.2s linear;\r\n    width: 100%;\r\n    height: 100%;\r\n   border-radius: 5px;\r\n}\r\n\r\n.imgCont \r\n{\r\n    background-color: #E7E7E7;\r\n}\r\n\r\n/* Vertical ----------------*/\r\n\r\n.rotate{\r\n  -webkit-transform: rotate(90deg);\r\n  -moz-transform: rotate(90deg);\r\n  -ms-transform: rotate(90deg);\r\n  -o-transform: rotate(90deg);\r\n  transform: rotate(90deg);\r\n}\r\n\r\n/*Don\'t use these on elements that already/might have a transform*/\n.hCentre {\n  left: 50%;\n  transform: translateX(-50%);\n  -webkit-transform: translateX(-50%);\n}\n.vCentre {\n  top: 50%;\n  transform: translateY(-50%);\n  -webkit-transform: translateY(-50%);\n}\n.centre {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n}\nsvg {\n  cursor: pointer;\n}\n#bg-image {\n  display: block;\n  position: absolute;\n  z-index: 0;\n}\n.mobile #bg-image {\n  display: none;\n}\n#breadcrumbBar {\n  position: relative;\n  height: 1.5em;\n  width: 100%;\n  z-index: 2;\n  top: 0;\n  overflow: hidden;\n  margin-bottom: 0.1em;\n}\n#designStep {\n  float: left;\n}\n#topBarControls svg {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.bc-section {\n  position: relative;\n  height: 100%;\n  width: calc(33.333% - 7px);\n  float: left;\n}\n.tb-chevron {\n  display: inline-block;\n  height: 100%;\n  width: 1.35em;\n  float: left;\n  top: 0;\n  pointer-events: none;\n}\n.aam-designer-init .tb-chevron img {\n  height: 100%;\n  width: 100%;\n}\n.aam-designer-init.desktop {\n  /*workaround for ie dodgy svg rendering. Might need to apply IE specific mquery here*/\n}\n.aam-designer-init.desktop .tb-chevron img {\n  max-width: 20px;\n}\n.aam-designer-init.desktop .tooltip {\n  background-color: #fff;\n  border: 1px solid red;\n  z-index: 10;\n  width: 10em;\n  padding: 0.2em;\n  /*margin-left:3000px;*/\n}\n.aam-designer-init.desktop.tabNav .tooltip {\n  margin-left: 0px;\n}\n.aam-designer-init {\n  /*============================ Accessibility stuff ===================================*/\n  z-index: 1000;\n  /*z-index prevents host page content overlaying designer (may not be desirable in all cases?) */\n  text-align: left;\n  /*override host page.*/\n}\n.aam-designer-init .focusItem:focus,\n.aam-designer-init li:focus,\n.aam-designer-init .dummy-focus {\n  outline: 2px solid #ff0000 !important;\n}\n.aam-designer-init input:focus,\n.aam-designer-init button:focus {\n  outline: none;\n}\n.aam-designer-init #skipLink {\n  color: #fff;\n}\n.aam-designer-init #skipLink:focus {\n  color: #336699;\n}\n.aam-designer-init .jspVerticalBar {\n  display: none;\n}\n.aam-designer-init .jspContainer,\n.aam-designer-init .jspPane,\n.aam-designer-init .jspTrack {\n  width: 100% !important;\n}\n.aam-designer-init #gallery1 {\n  width: calc(100% - 104px) !important;\n}\n.aam-designer-init #gallery1.logo-gallery {\n  width: 100% !important;\n}\n.aam-designer-init a:focus {\n  outline: 0;\n}\n.aam-designer-init #preloader {\n  height: 2em;\n  width: 2em;\n  margin: 20% 46%;\n}\n.tabNav .focusItem:focus {\n  outline: 2px solid #ff0000 !important;\n}\n#bleed-glow.logo-bleed {\n  border-radius: 0 !important;\n  display: block !important;\n  box-shadow: rgba(255, 0, 0, 0.7) 0px 0px 0px 3px !important;\n}\n.borderBottomColor {\n  border-bottom: 2px solid;\n}\n.mobile {\n  /*.tb-item img {width:auto; height:80%; transform: translate(-50%,-50%); top: 50%; max-height:33px;}*/\n}\n.mobile #breadcrumbBar {\n  height: 1.9em;\n}\n.mobile #topBarControls {\n  position: absolute;\n  display: inline-block;\n  top: 0;\n  right: 2%;\n  height: 100%;\n  width: 50px;\n}\n.mobile .tb-item {\n  position: relative;\n  display: inline-block;\n  float: right;\n  height: 100%;\n  width: 1.5em;\n}\n.mobile .tb-chevron svg {\n  height: 100%;\n  width: 100%;\n}\n.desktop .tb-chevron {\n  width: 0.95em;\n}\n.desktop a:focus {\n  outline: 0;\n}\n.aam-designer-init {\n  display: block;\n  position: relative;\n  background-color: #fff !important;\n  width: 100% ;\n  height: 100% ;\n  font-size: 12pt;\n  -webkit-backface-visibility: hidden;\n  filter: blur(0);\n  font-family: Arial, sans-serif;\n  image-rendering: pixelated;\n  -webkit-font-smoothing: subpixel-antialiased;\n  backface-visibility: hidden;\n  /*reduces font flicker on resize*/\n  /*outline: 1px solid;*/\n  text-align: initial;\n}\n.aam-designer-init div {\n  display: inline-block;\n}\n.aam-designer-init input:focus {\n  outline: none;\n}\n.aam-designer-init #galleryDropdown {\n  align-items: center;\n}\n.tip {\n  display: none;\n}\n.desktop.aam-designer-init {\n  overflow: hidden;\n  background-color: #fff;\n}\n.aam-designer-init.full-screen {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n}\n.desktop {\n  min-height: 450px !important;\n  min-width: 300px !important;\n  width: 100%;\n  height: 100%;\n}\n.desktop.embedded {\n  max-height: 450px;\n}\n.ssg-gallery .errorCont {\n  display: none;\n  line-height: 1em;\n  top: 1em;\n  border: 1px solid red;\n  min-height: 53px;\n  padding: 10px;\n  width: 265px;\n  background-color: white;\n  left: 50%;\n  transform: translateX(-50%);\n  -webkit-transform: translateX(-50%);\n}\n.ssg-gallery:hover {\n  cursor: pointer;\n}\n.mobile.aam-designer-init {\n  /*outline:none;*/\n}\n.mobile.aam-designer-init #view-all {\n  height: 1.6em;\n}\n.mobile.aam-designer-init #view-all svg {\n  height: 2em;\n  width: 3.9em;\n}\n.mobile.portrait {\n  height: 100%;\n  width: 100%;\n  overflow-y: hidden !important;\n}\n.mobile.landscape {\n  height: 100%;\n  width: 100%;\n}\n.mobile.full-screen {\n  /*position:absolute;*/\n  position: fixed;\n  top: 0;\n  left: 0;\n}\n/*change to \'absolute\' to allow scrolling if vp < aamd size*/\n.mobile.embedded {\n  position: relative;\n}\n/*Don\'t use these on elements that already/might have a transform*/\n.hCentre {\n  left: 50%;\n  transform: translateX(-50%);\n  -webkit-transform: translateX(-50%);\n}\n.vCentre {\n  top: 50%;\n  transform: translateY(-50%);\n  -webkit-transform: translateY(-50%);\n}\n.centre {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n}\n#gallery1 {\n  /*---------------- scrollbar styling for IE only ----------------*/\n  display: inline-block;\n  height: 65px;\n  width: calc(100% - 104px);\n  overflow-x: scroll;\n  overflow-y: hidden;\n}\n#gallery1 .outerDiv {\n  width: 780px;\n}\n.aam-designer-init.desktop #slidingPanel svg,\n.aam-designer-init.mobile #slidingPanel svg {\n  width: 3em;\n  height: 2em;\n}\n.aam-designer-init.desktop #slidingPanel a,\n.aam-designer-init.mobile #slidingPanel a {\n  color: #339acc;\n}\n.aam-designer-init {\n  /*============== enscroll.js classes ================*/\n  /*#card-coverage-message {  right:4px; transform:translateZ(0);} //translateZ used to fix re-render failure in chrome 9http://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes)*/\n  /*#card-coverage-message {  margin: auto; position: relative; top: 160px; pointer-events:none; transform:translateZ(0);} */\n  /*translateZ used to fix re-render failure in chrome 9http://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes)*/\n  /*#cardDesign{position:relative; xwidth:90%; height:auto; min-height:170px; }*/\n  /*.svg    { width:50%; height:auto; } #SVGC */\n}\n.aam-designer-init .enscroll-track,\n.aam-designer-init .enscrollTrackH,\n.aam-designer-init .enscrollHandleH {\n  height: 10px;\n}\n.aam-designer-init .enscroll-track {\n  background-clip: padding-box;\n  border-style: solid;\n  border-color: transparent;\n  border-width: 0;\n  border-left-width: 1px;\n}\n.aam-designer-init .enscroll-track div {\n  display: initial;\n}\n.aam-designer-init .enscroll-track .left,\n.aam-designer-init .enscroll-track .right {\n  padding: 0;\n}\n.aam-designer-init .enscrollTrackH {\n  top: 0.5em;\n}\n.aam-designer-init .enscrollHandleH {\n  width: 10px;\n  background-clip: padding-box;\n  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.07);\n  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.07);\n}\n.aam-designer-init .parent {\n  position: relative;\n  display: inline-block;\n}\n.aam-designer-init .img-control {\n  display: inline-block;\n  position: relative;\n  width: 100%;\n  margin-bottom: 0;\n  pointer-events: auto;\n}\n.aam-designer-init .img-control svg {\n  position: absolute;\n}\n.aam-designer-init .nav-button {\n  display: inline-block;\n  position: relative;\n  width: 15%;\n  height: 30%;\n  min-height: 27px;\n}\n.aam-designer-init .jslider {\n  display: none !important;\n}\n.aam-designer-init .error-box {\n  display: none;\n  position: absolute;\n  top: 30px;\n  width: 40%;\n  max-width: 74%;\n  background-color: #fff;\n  padding: 0.5em;\n  outline: 1px solid #f00;\n  z-index: 3000;\n  color: red;\n  box-shadow: 4px 4px 4px #0009;\n  font-size: 0.8em;\n  line-height: 1;\n}\n.aam-designer-init .gallery-control {\n  position: absolute;\n  left: 0;\n  pointer-events: none;\n}\n.aam-designer-init #startup-spinner {\n  top: 170px !important;\n}\n.aam-designer-init #selectorIcon {\n  position: absolute;\n  height: 100%;\n  pointer-events: none;\n}\n.aam-designer-init #ssg-designer #layer1 #bleed-glow {\n  box-shadow: none !important;\n}\n.aam-designer-init #ssg-designer #layer1.layer-enabled {\n  pointer-events: auto;\n}\n.aam-designer-init #ssg-designer #layer1.layer-disabled {\n  pointer-events: none;\n}\n.aam-designer-init #ssg-designer #canvas-spinner {\n  position: absolute;\n  width: 2em;\n  height: 2em;\n  left: 50% !important;\n  top: 40% !important;\n  transform: translate(-50%, -50%);\n  _webkit-transform: translate(-50%, -50%);\n}\n.aam-designer-init #locked-message {\n  left: 0.5em;\n}\n.aam-designer-init .portrait #locked-message {\n  top: 3em;\n}\n.aam-designer-init #card-coverage-message {\n  /*display: block; margin: auto;*/\n  width: initial;\n  position: relative;\n  top: 0.5em;\n  left: 0.5em;\n  pointer-events: none;\n  transform: translateZ(0);\n}\n.aam-designer-init #help {\n  display: none;\n}\n.aam-designer-init #imageContols {\n  width: 10%;\n  min-height: 140px;\n  z-index: 2;\n  pointer-events: none;\n}\n.aam-designer-init #imageContols img {\n  width: 115%;\n  max-height: 45px;\n}\n.aam-designer-init #previewtab-button {\n  height: 50px;\n  width: 60px;\n  top: 0px;\n  float: right;\n  z-index: 2;\n}\n.aam-designer-init #previewtab-button.disabled {\n  opacity: 0.05;\n  pointer-events: none;\n}\n.aam-designer-init #stage {\n  width: 100%;\n  height: 100%;\n  vertical-align: top;\n  position: absolute;\n  top: 0px;\n  display: inline-block;\n  left: 0;\n}\n.aam-designer-init #stage img {\n  width: 70%;\n  height: auto;\n}\n.aam-designer-init #cardDesign {\n  position: absolute;\n  height: auto;\n  min-height: 170px;\n  opacity: 0;\n}\n.aam-designer-init #galleryPane {\n  width: calc(100% - 8px);\n  position: absolute;\n  z-index: 1;\n  bottom: 1%;\n  left: 4px;\n  height: 30%;\n}\n.aam-designer-init #galleryPane #logo-back-button {\n  left: 45%;\n  height: 0.6em;\n  width: 2.5em;\n}\n.aam-designer-init #galleryPane #selectorDiv {\n  width: 100%;\n  float: left;\n  xoutline: 1px solid;\n}\n.aam-designer-init #clipArtPane {\n  display: block;\n  width: calc(100% - 8px);\n  position: absolute;\n  z-index: 1;\n  bottom: 1%;\n  left: 4px;\n  height: 30%;\n}\n.aam-designer-init #clipArtPane #logo-back-button {\n  left: 45%;\n  height: 0.6em;\n  width: 2.5em;\n}\n.aam-designer-init #clipArtPane #selectorDiv {\n  width: 100%;\n  float: left;\n  xoutline: 1px solid;\n}\n.aam-designer-init #clipArtPane .back-button-div {\n  border-bottom: 2px solid;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 1em;\n  z-index: 1;\n}\n.aam-designer-init #clipArtPane .back-button-div svg {\n  position: absolute;\n  left: 50%;\n  top: 11px;\n}\n.aam-designer-init .gallery-control svg {\n  position: absolute;\n}\n.aam-designer-init #galleryPanel {\n  position: relative;\n  width: 100%;\n  height: 30px;\n  bottom: 1.5%;\n  z-index: 1;\n  margin-top: 4px;\n}\n.aam-designer-init #galleryPanel .ssg-selector {\n  outline: 1px solid;\n}\n.aam-designer-init #galleryImages {\n  position: relative;\n  padding-top: 4px;\n  padding-bottom: 4px;\n  width: 100%;\n  xoutline: 1px solid red;\n}\n.aam-designer-init #galleryDropdown {\n  align-items: center;\n}\n.aam-designer-init #logoGalleryPane {\n  height: 85%;\n  width: 100%;\n}\n.aam-designer-init #logoGalleryPane #upload-guidelines {\n  margin-bottom: 0.5em;\n}\n.aam-designer-init #logoGalleryPane .bar-button {\n  max-width: 15em;\n  width: 50%;\n  position: relative;\n}\n.aam-designer-init #logoGalleryPane span {\n  display: block;\n}\n.aam-designer-init #logoGalleryPane a {\n  text-align: center;\n  float: right;\n}\n.aam-designer-init #logoGalleryPane #buttonBar {\n  max-width: 30em;\n}\n.aam-designer-init #logoGalleryPane .bar-button {\n  width: 48%;\n  float: left;\n  left: initial;\n  min-width: initial;\n}\n.aam-designer-init #logoGalleryPane #clear-logo-button.enabled {\n  opacity: 1;\n}\n.aam-designer-init #logoGalleryPane #clear-logo-button.disabled {\n  opacity: 0.4;\n  background-color: #fcc;\n}\n.aam-designer-init #tabBar {\n  width: 100%;\n  height: 0.8em;\n  border-bottom: 2px solid;\n  position: absolute;\n  pointer-events: none;\n}\n.aam-designer-init #text-button,\n.aam-designer-init #logo-button {\n  position: absolute;\n  left: 65%;\n  height: 14px;\n}\n.aam-designer-init #logo-button {\n  left: 55%;\n}\n.aam-designer-init #logo-button svg {\n  background-color: #fff;\n}\n.aam-designer-init #clipart-button {\n  position: absolute;\n  left: 75%;\n  height: 14px;\n}\n.aam-designer-init .clipart-image {\n  cursor: pointer;\n  margin: 8px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: contain;\n  width: 50px;\n  height: 50px;\n}\n.aam-designer-init .clipart-gallery {\n  display: block;\n  width: 80%;\n  text-align: center;\n  margin: 20px auto;\n  overflow-y: hidden;\n  overflow-x: auto;\n}\n.aam-designer-init .clipart-gallery .ssg-mini-gallery {\n  white-space: nowrap;\n  overflow-y: hidden;\n  overflow-x: auto;\n  height: 78px;\n  margin: 0 auto;\n}\n.aam-designer-init #view-all {\n  /*width:100%; */\n  left: 45%;\n  height: 0.6em;\n  margin: auto;\n  cursor: default;\n  /* width for IE*/\n}\n.aam-designer-init #view-all img {\n  cursor: pointer;\n  width: auto;\n}\n.aam-designer-init #view-all svg {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n  position: absolute;\n}\n.aam-designer-init #buttonCustom {\n  display: inline-block;\n  width: 100px;\n  height: 80px;\n  float: left;\n}\n.aam-designer-init #buttonCustom img {\n  width: auto;\n}\n.aam-designer-init #upload-page-button {\n  position: relative;\n  display: inline-block;\n  width: 100px;\n  height: 69px;\n  float: left;\n}\n.aam-designer-init #upload-page-button img {\n  width: auto;\n}\n.aam-designer-init #upload-page-button svg {\n  position: relative;\n}\n.aam-designer-init #upload-page-button p {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  -webkit-transform: translateY(-50%);\n  margin: 5%;\n  width: 90%;\n  /*color:@colour2;*/\n  line-height: 1em;\n  text-align: center;\n}\n.aam-designer-init #galleryControls {\n  display: inline-block;\n  width: 100%;\n  height: 40px;\n}\n.aam-designer-init #gallerySelect {\n  float: left;\n}\n.aam-designer-init #gallerySelection {\n  width: calc(100% - 95px);\n  float: left;\n  margin: 0;\n  height: 19px;\n  padding: 5px;\n}\n.aam-designer-init #gallerySearch {\n  position: relative;\n  float: right;\n}\n.aam-designer-init #gallerySearch svg {\n  position: absolute;\n}\n.aam-designer-init #selector1 {\n  height: 30px;\n  width: calc(100% - 43px);\n  float: left;\n}\n.aam-designer-init #selector1.fb-mode {\n  width: calc(100% - 5em);\n}\n.aam-designer-init .gallery-control,\n.aam-designer-init .search-control {\n  width: 2em;\n  height: 1.8em;\n}\n.aam-designer-init .tip {\n  display: none;\n}\n.aam-designer-init p {\n  font-size: 12pt;\n  text-align: left;\n  vertical-align: top;\n  color: #000000;\n  line-height: 1em;\n}\n.aam-designer-init #trash-bin.trash-bin {\n  height: 50px;\n  width: 50px;\n  position: absolute;\n  bottom: 30%;\n  right: 0;\n}\n.aam-designer-init #facebook-button {\n  float: left;\n  width: 2em;\n  height: 2em;\n  display: none;\n  margin-left: 0.6em;\n}\n.ssg-mini-gallery .outerDiv {\n  float: left;\n  height: 70px;\n}\n.ssg-mini-gallery .imgCont {\n  width: 83px;\n  height: 60px;\n  float: left;\n  margin: 4px;\n  cursor: pointer;\n  overflow: hidden;\n  padding: 0;\n  border: none;\n}\n.ssg-mini-gallery .gallery-img {\n  border-radius: 0;\n}\n.ssg-mini-gallery .imgCont.active {\n  box-shadow: #31b7db 0px 0px 0px 2px;\n}\n.ssg-mini-gallery .outerDiv.v {\n  margin-left: 5%;\n  width: 92%;\n}\n.ssg-mini-gallery .outerDiv.v .imgCont {\n  width: 40px;\n  height: 55px;\n  position: relative;\n}\n.ssg-mini-gallery .outerDiv.v .gallery-img.rotate {\n  width: 55px;\n  height: 40px;\n  top: 8px;\n  position: absolute;\n  left: -8px;\n}\n.desktop {\n  line-height: initial;\n  /*.error-box { position: absolute; background-color: #fff; padding: 0.5em; outline: 1px solid #f00; z-index: 3000; color: red; font-size: 0.8em; line-height: 1; top: 30px; width:40%; max-width : 74%; }*/\n  /*NB setting width to 110% is a workaround to hide arrow in IE*/\n}\n.desktop .panelImg {\n  vertical-align: middle;\n}\n.desktop .tb-item {\n  position: relative;\n  display: inline-block;\n  float: right;\n  height: 100%;\n  width: 1.5em;\n  right: 1em;\n}\n.desktop .tb-item img {\n  height: 100%;\n}\n.desktop .img-control {\n  width: 2.5em;\n  height: 2.9em;\n}\n.desktop #slidingPanel {\n  display: none;\n  position: absolute;\n  top: 35px;\n  left: 1%;\n  width: 230px;\n  border: 2px solid #339acc;\n  z-index: 5;\n}\n.desktop #slidingPanel a {\n  display: block;\n  position: relative;\n  float: left;\n  text-decoration: none;\n  font-size: 1em;\n  background-color: #fff;\n  width: 100%;\n  opacity: 0.7;\n  color: #1133ff;\n}\n.desktop #slidingPanel img {\n  width: 53px;\n  height: 30px;\n}\n.desktop #panelWrench {\n  opacity: 1 !important;\n  padding-bottom: 0.5em;\n}\n.desktop #topBarControls {\n  position: absolute;\n  display: inline-block;\n  top: 0;\n  right: 0px;\n  height: 100%;\n  width: 74px;\n}\n.desktop #gallery1 .imgCont {\n  height: 50px;\n  width: 75px;\n  border: none;\n  padding: 0;\n}\n.desktop #gallery-select {\n  width: 110%;\n  height: 100%;\n}\n.desktop #galleryDropdown {\n  width: 100%;\n  height: 32px;\n  border: none;\n  padding: 0 0 0 12%;\n  background: none;\n  text-indent: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  cursor: pointer;\n}\n.desktop #selectorDiv {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.desktop #designertab-button,\n.desktop #modeTabs,\n.desktop #tool-bar,\n.desktop #contentBottom {\n  display: none;\n}\n.desktop #canvas1 {\n  height: 100%;\n  width: 100%;\n  overflow: visible !important;\n  top: -40px;\n  z-index: 1 !important;\n}\n.desktop #clientArea1 {\n  position: relative;\n  width: 100vw;\n  height: 15%;\n  background-color: #ccffcc;\n}\n.desktop #ssg-designer {\n  position: absolute;\n  width: 100%;\n  height: 450px;\n  top: calc((100% - 450px)/2);\n  left: 0;\n}\n.desktop #imageContols {\n  min-height: 0;\n  width: 59%;\n  padding: 5px 0 0 15px;\n}\n.desktop #locked-message {\n  width: initial;\n}\n.desktop #galleryGroup {\n  width: calc(100% - 104px);\n  height: 5em;\n  position: absolute;\n  pointer-events: none;\n  background: none;\n}\n.portrait.mobile #imageContols {\n  min-height: 0;\n  width: 59%;\n  padding: 5px 0 0 15px;\n  height: 10%;\n}\n.portrait.mobile #imageContols .img-control {\n  width: 20%;\n  height: 100%;\n}\n.mobile.aam-designer-init {\n  overflow: hidden;\n  background-color: #fff;\n}\n.mobile.aam-designer-init #card-coverage-message {\n  /*left:initial;*/\n  max-width: 150px;\n}\n.mobile.aam-designer-init #tabBar {\n  height: 1.6em;\n}\n.mobile.aam-designer-init #view-all {\n  left: 42%;\n  width: 2.5em;\n  font-size: inherit;\n}\n.mobile.aam-designer-init #text-button,\n.mobile.aam-designer-init #logo-button {\n  left: 20%;\n}\n.mobile.aam-designer-init #clipart-button {\n  left: 82%;\n  width: 55px;\n}\n.mobile.aam-designer-init #galleryPane {\n  height: initial;\n}\n.mobile.aam-designer-init #galleryPane .outerDiv {\n  width: 820px;\n}\n.mobile.aam-designer-init #galleryPane #logo-back-button {\n  height: 1.6em;\n}\n.mobile.aam-designer-init #galleryPane #logo-back-button svg {\n  height: 2em;\n  width: 3.9em;\n}\n.mobile.aam-designer-init #logoGalleryPane {\n  margin-top: 0.5em;\n}\n.mobile.aam-designer-init #logoGalleryPane .bar-button {\n  padding: 0.3em 0;\n  font-size: 1.1em;\n}\n.mobile.aam-designer-init #logoGalleryPane #scrollContent-aam {\n  width: 95%;\n}\n.mobile.aam-designer-init #logoGalleryPane #scrollPane-aam {\n  width: 100%;\n  margin-left: 2%;\n  margin-top: 0.1em;\n}\n.mobile.full-screen.portrait #locked-message {\n  top: 4em;\n}\n@media screen and (orientation: portrait) and (max-height: 500px), screen and (orientation: landscape) and (max-width: 500px) {\n  .mobile #galleryPane {\n    height: 40%;\n  }\n  .mobile.landscape #galleryPane {\n    height: 44%;\n  }\n}\n@media screen and (max-width: 1300px), screen and (max-height: 1300px) {\n  .embedded {\n    background-size: 700px;\n  }\n  .mobile.landscape .error-box {\n    width: 30%;\n  }\n}\n.mobile {\n  /*.error-box{ position:absolute; background-color:#fff; outline:1px solid #f00; left:40%;  z-index:3000; color: red; font-size: 0.8em; line-height:1; top:9%;}*/\n  /*====== Nexus 7 and bigger  ================*/\n}\n.mobile .enscroll-track {\n  top: 0.1em;\n}\n.mobile .error-box {\n  display: none;\n  position: absolute;\n  top: 30px;\n  width: 40%;\n  max-width: 74%;\n  background-color: #fff;\n  padding: 0.5em;\n  outline: 1px solid #f00;\n  z-index: 3000;\n  color: red;\n  box-shadow: 4px 4px 4px #0009;\n  font-size: 0.8em;\n  line-height: 1;\n}\n.mobile #slidingPanel {\n  display: none;\n  top: 146px;\n  position: absolute;\n  left: 27px;\n  width: 180px;\n  border: 2px solid #339acc;\n  z-index: 5;\n  background: #fff;\n}\n.mobile #slidingPanel a {\n  display: block;\n  position: relative;\n  float: left;\n  text-decoration: none;\n  font-size: 1em;\n  padding-left: 8px;\n}\n.mobile #wrench-button {\n  display: none;\n}\n.mobile #galleryPane {\n  line-height: 0;\n}\n.mobile #gallery1 {\n  height: 75px;\n}\n.mobile #gallery-select {\n  width: 100%;\n  height: 100%;\n}\n.mobile #selector1 #galleryDropdown {\n  width: 100%;\n  height: 32px;\n  border: none;\n  padding: 0 0 0 11%;\n  background: none;\n  text-indent: 0;\n  line-height: 1em;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n.mobile #canvas1 {\n  height: 100%;\n  width: 100%;\n  overflow: visible !important;\n  top: 45%;\n  z-index: 1 !important;\n  transform: translateY(-50%);\n  -webkit-transform: translateY(-50%);\n}\n.mobile #ssg-designer {\n  position: absolute;\n  width: 100%;\n  height: 1000px;\n  top: calc((100% - 1000px)/2);\n}\n.mobile #ssg-designer #canvas-spinner {\n  top: 45% !important;\n}\n.mobile #imageContols {\n  margin-left: 5px;\n  height: 9em;\n}\n.mobile .img-control {\n  height: 30%;\n}\n.mobile #view-all img {\n  height: 25px;\n  top: 9px;\n}\n.mobile #text-button,\n.mobile #logo-button {\n  height: 1.3em;\n}\n.mobile #text-button svg,\n.mobile #logo-button svg {\n  height: 1.9em;\n  width: 3.9em;\n}\n@media screen and (orientation: landscape) and (min-height: 450px), screen and (orientation: portrait) and (min-width: 450px) {\n  .mobile #imageContols img {\n    max-height: 70px;\n  }\n}\n@media screen and (max-width: 1300px), screen and (max-height: 1300px) {\n  .mobile #selector1 #galleryDropdown {\n    font-size: 1em;\n    padding: 0 0 0 12%;\n  }\n  .mobile .error-box {\n    padding: 6px;\n    left: 2%;\n    /*top: 2%;*/\n  }\n}\n@media screen and (max-height: 449px) {\n  body {\n    overflow-y: scroll;\n  }\n}\n@media screen and (max-width: 299px) {\n  body {\n    overflow-x: scroll;\n  }\n}\n/*===================== below is necessary to overcome the absence of the designer\'s container dimensions (CMB only)========*/\n.mobile.portrait #stage #locked-message {\n  width: 72%;\n}\n.aam-designer-init .bgCol_1 {\n  background-color: #339acc;\n}\n.aam-designer-init .fillCol_1 {\n  fill: #339acc;\n}\n.aam-designer-init .strokeCol_1 {\n  stroke: #339acc;\n}\n.aam-designer-init .disabledStroke {\n  stroke: #ccc !important;\n}\n.aam-designer-init .borderCol_1 {\n  border-color: #339acc;\n}\n.aam-designer-init .outlineCol_1 {\n  outline-color: #339acc;\n}\n.aam-designer-init .textCol_1 {\n  color: #339acc;\n}\n.aam-designer-init .bgCol_2 {\n  background-color: #c1e3f3;\n}\n.aam-designer-init .fillCol_2 {\n  fill: #c1e3f3;\n}\n.aam-designer-init .strokeCol_2 {\n  stroke: #c1e3f3;\n}\n.aam-designer-init .borderCol_2 {\n  border-color: #c1e3f3;\n}\n.aam-designer-init .outlineCol_2 {\n  outline-color: #c1e3f3;\n}\n.aam-designer-init .textCol_2 {\n  color: #c1e3f3;\n}\n.aam-designer-init .bgCol_3 {\n  background-color: #339acc;\n}\n.aam-designer-init .fillCol_3 {\n  fill: #339acc;\n}\n.aam-designer-init .strokeCol_3 {\n  stroke: #339acc;\n}\n.aam-designer-init .borderCol_3 {\n  border-color: #339acc;\n}\n.aam-designer-init .outlineCol_3 {\n  outline-color: #339acc;\n}\n.aam-designer-init .textCol_3 {\n  color: #339acc;\n}\n.aam-designer-init .textCol_4 {\n  color: #fff !important;\n}\n.aam-designer-init .borderCol_4 {\n  border-color: #fff !important;\n}\n/*55%;*/\n.aam-designer-init #text-designer {\n  width: 100%;\n  height: 100%;\n}\n.aam-designer-init #text-designer #canvas1 {\n  height: 100px;\n  width: 100px;\n  left: 50%;\n  overflow: visible !important;\n  top: -40px;\n  z-index: 1 !important;\n  top: 40%;\n  transform: translate(-50%,-50%);\n  -webkit-transform: translate(-50%,-50%);\n}\n.aam-designer-init #previewtab-button.preview-nav {\n  display: none;\n}\n.aam-designer-init #content {\n  overflow: hidden;\n  position: absolute;\n  width: 100%;\n  height: 50%;\n  top: 2em;\n  left: 0;\n}\n.aam-designer-init #content #canvas1 #productTemplate {\n  border: 1px solid grey !important;\n}\n.aam-designer-init #content .error-box {\n  position: absolute;\n  background-color: #fff;\n  padding: 5px;\n  outline: 1px solid #f00;\n  z-index: 3000;\n  color: red;\n  font-size: 0.8em;\n  line-height: 1;\n  top: 1px;\n  width: 70%;\n  min-height: 2.2em;\n  left: 1em;\n}\n.aam-designer-init #textContentBottom {\n  width: 100%;\n  height: calc(100% - 1.5em - 50%);\n  overflow: hidden;\n  position: absolute;\n  background: #FFF;\n  bottom: 0;\n  left: 0;\n  /*#font { top: 0.6em; width: 100%;}*/\n}\n.aam-designer-init #textContentBottom .back-button-div {\n  border-bottom: 2px solid;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 1em;\n  z-index: 1;\n}\n.aam-designer-init #textContentBottom .back-button-div svg {\n  position: absolute;\n  left: 50%;\n  top: 11px;\n}\n.aam-designer-init #textContentBottom .mode-tool {\n  display: none;\n}\n.aam-designer-init #textContentBottom .edit-icon {\n  float: left;\n  width: 1em;\n  height: 1em;\n  margin: 0 1% 0 5%;\n  xoutline: 2px solid green;\n  pointer-events: none;\n}\n.aam-designer-init #textContentBottom .edit-icon svg {\n  width: 25px;\n}\n.aam-designer-init #textContentBottom .outlined {\n  outline: 0.1em solid grey;\n}\n.aam-designer-init #textContentBottom #textInput {\n  position: absolute;\n  z-index: 1;\n  top: 2.5em;\n  left: 0;\n  background-color: #fff;\n  width: 100%;\n  height: 1.5em;\n}\n.aam-designer-init #textContentBottom #textInput .text-entry {\n  float: left;\n  padding-left: 1em;\n  width: 36%;\n  margin: 0 0 0 0.5em;\n  line-height: 1.6em;\n  border: none;\n  outline: 0.1em solid red;\n  height: 1.6em;\n}\n.aam-designer-init #textContentBottom #colourPanel {\n  width: 90%;\n  max-width: 300px;\n  height: 88%;\n  background-color: white;\n  z-index: 2;\n  position: absolute;\n  left: 5%;\n  border: 1px solid grey;\n  bottom: 1em;\n  display: none;\n}\n.aam-designer-init #textContentBottom #colourPanel #colourButtons {\n  width: 90%;\n  height: 85%;\n  margin: 3%;\n}\n.aam-designer-init #textContentBottom #colourPanel .color {\n  width: 2.2em;\n  height: 2.2em;\n  margin: 0.2em;\n  float: left;\n  cursor: pointer;\n}\n.aam-designer-init #textContentBottom #colourPanel #closeColours {\n  float: right;\n  top: 0;\n  right: 0;\n  background: url(https://uat.serversidegraphics.com/pcs/cdn/V2/App/Skins/FlatGenericV2/resources/img/close-search-error.png) no-repeat;\n  background-position: 0.5em 0.5em;\n  width: 2em;\n  height: 2em;\n  cursor: pointer;\n  position: absolute;\n}\n.aam-designer-init #textContentBottom #styleContainer {\n  top: 1em;\n  position: absolute;\n  margin-top: 1px;\n  height: calc(100% - 1em);\n  width: 100%;\n}\n.aam-designer-init #textContentBottom #styleContainer #Font {\n  width: 100%;\n  height: 1.2em;\n  top: 0.3em;\n  position: absolute;\n}\n.aam-designer-init #textContentBottom #styleContainer select {\n  width: 90%;\n  margin-left: 5%;\n  padding: 0.15em 0.4em;\n  outline: 0.1em solid;\n}\n.aam-designer-init #textContentBottom #styleContainer #buttons {\n  position: absolute;\n  bottom: 0.4em;\n  width: 100%;\n  margin: 0 auto;\n}\n.aam-designer-init #size-plus-button {\n  border-left: 1px solid white;\n}\n.aam-designer-init .style-button {\n  float: left;\n  height: 2.9em;\n  width: 22.5%;\n  margin: 0.2em 1% 0.2em 1%;\n}\n.aam-designer-init .thin-button {\n  float: left;\n  height: 100%;\n  width: 49%;\n}\n.aam-designer-init .fat-button {\n  width: 100%;\n  height: 100%;\n}\n.mobile #content {\n  height: 46%;\n}\n.mobile #textContentBottom {\n  height: 13em;\n}\n.mobile #textContentBottom #back-button {\n  height: 1.9em;\n}\n.mobile #textContentBottom #back-button svg {\n  height: 2em;\n  width: 3.9em;\n  top: 1em;\n}\n.mobile #textContentBottom #styleContainer #textInput {\n  top: 3.1em;\n}\n.mobile #textContentBottom #styleContainer #Font {\n  top: 1.3em;\n}\n.mobile #textContentBottom #buttons {\n  height: 6em;\n}\n.mobile .ssg-canvas {\n  top: 45%;\n}\n.mobile #text-designer #canvas1 {\n  position: relative;\n  width: 100px;\n  height: 100px;\n  top: 45%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n}\n.mobile #text-designer #canvas1 #canvas-spinner {\n  position: absolute;\n}\n@media screen and (orientation: landscape) {\n  .mobile #textContentBottom {\n    height: 9em;\n  }\n  .mobile #textContentBottom #styleContainer #buttons {\n    background-color: orange;\n    margin: 1% 1% 0 1%;\n    width: 98%;\n    height: 3em;\n    bottom: 0.1em;\n  }\n  .mobile #textContentBottom #styleContainer #buttons .style-button {\n    width: 11%;\n    height: 90%;\n    margin: 1% 0.5% 0 0 ;\n  }\n  .mobile #textContentBottom #styleContainer #buttons .style-button #size-plus-button {\n    width: 47%;\n  }\n  .mobile #textContentBottom #styleContainer #buttons #size {\n    width: 19%;\n  }\n}\n@media screen and (min-height: 1000px) and (orientation: portrait) {\n  .mobile #textContentBottom {\n    height: 15em;\n  }\n  .mobile #textContentBottom #styleContainer {\n    top: initial;\n  }\n  .mobile #textContentBottom #styleContainer #font {\n    top: 2.5em;\n  }\n  .mobile #textContentBottom #styleContainer #textInput {\n    top: 4.5em;\n  }\n}\n@media screen and (min-width: 1000px) and (orientation: landscape) {\n  .mobile #textContentBottom {\n    height: 11em;\n  }\n  .mobile #textContentBottom #styleContainer {\n    top: initial;\n  }\n  .mobile #textContentBottom #styleContainer #font {\n    top: 2.5em;\n  }\n  .mobile #textContentBottom #styleContainer #textInput {\n    top: 4.5em;\n  }\n}\n@media screen and (min-width: 1300px) and (orientation: landscape), (min-height: 1300px) and (orientation: portrait) {\n  .mobile #textContentBottom #styleContainer {\n    height: 14em;\n  }\n}\n@media screen and (min-width: 1300px) and (orientation: landscape) {\n  .mobile #textContentBottom #styleContainer {\n    height: 10em;\n  }\n}\n/*Don\'t use these on elements that already/might have a transform*/\n.hCentre {\n  left: 50%;\n  transform: translateX(-50%);\n  -webkit-transform: translateX(-50%);\n}\n.vCentre {\n  top: 50%;\n  transform: translateY(-50%);\n  -webkit-transform: translateY(-50%);\n}\n.centre {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n}\n.aam-designer-init {\n  /*=================== enscroll classes =====================*/\n  /*=================== end enscroll classes =====================*/\n}\n.aam-designer-init .enscroll-trackV,\n.aam-designer-init .enscrollTrackV,\n.aam-designer-init .enscrollHandleV {\n  width: 0.5em;\n}\n.aam-designer-init .enscrollTrackV {\n  top: 0.5em;\n}\n.aam-designer-init .enscroll-track {\n  background-clip: padding-box;\n  border-style: solid;\n  border-color: transparent;\n  border-width: 0;\n  border-left-width: 1px;\n}\n.aam-designer-init .enscroll-track div {\n  display: initial;\n}\n.aam-designer-init .enscroll-track .left,\n.aam-designer-init .enscroll-track .right {\n  padding: 0;\n}\n.aam-designer-init .enscrollHandleV {\n  width: 0.5em;\n  background-clip: padding-box;\n  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.07);\n  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.07);\n}\n.aam-designer-init #bg-image {\n  z-index: 0 !important;\n}\n.aam-designer-init #bg-image img {\n  height: 100%;\n}\n.aam-designer-init #back-button {\n  border-bottom: 1px solid #339acc;\n}\n.aam-designer-init #customGalleryPane {\n  width: 100%;\n  height: 95%;\n  position: absolute;\n  left: 0;\n  top: 25px;\n}\n.aam-designer-init #customGalleryPane .upl-btn-back {\n  min-height: initial;\n  margin-top: 0.3em;\n  border-width: 0.2em;\n  cursor: default;\n  height: 0.5em;\n  width: 100%;\n  float: left;\n}\n.aam-designer-init #customGalleryPane .upl-btn-back svg {\n  position: absolute;\n  cursor: pointer;\n  /*stroke-color:@grey;*/\n}\n.aam-designer-init #customGalleryControls {\n  display: inline-block;\n  position: relative;\n  width: 100%;\n  height: 7%;\n  margin-top: 2%;\n}\n.aam-designer-init #inactiveSelector {\n  display: inline-block;\n  width: 230px;\n  height: 85%;\n  outline: 1px solid #cccccc;\n  background: #ffffff;\n}\n.aam-designer-init #inactiveSelector div {\n  position: absolute;\n  line-height: 2;\n  padding-left: 4px;\n}\n.aam-designer-init #customSelect {\n  height: 100%;\n  width: 36%;\n  display: inline-block;\n}\n.aam-designer-init #customSelect img {\n  height: 94%;\n  margin-left: 90%;\n  vertical-align: bottom;\n}\n.aam-designer-init #filename {\n  display: inline-block;\n  position: absolute;\n  height: 60px;\n  width: 146px;\n  outline: 1px solid #339acc;\n  top: -20px;\n  right: 2px;\n}\n.aam-designer-init #browse-textbox {\n  display: none;\n  border: none;\n  position: absolute;\n  outline: 2px solid #339acc;\n  top: -2em;\n  width: 101%;\n  left: -2%;\n  line-height: 11px;\n  padding: 1% 0 3.4em 3%;\n  z-index: -1;\n}\n.aam-designer-init #upload-text {\n  line-height: 20px;\n}\n.aam-designer-init #upload-message {\n  margin-top: 2%;\n  float: left;\n}\n.aam-designer-init #upload-controls {\n  float: left;\n  margin-top: 2%;\n}\n.aam-designer-init #upload-status {\n  position: absolute;\n  left: 0;\n  height: 15%;\n  width: 90%;\n  margin-left: 5%;\n  visibility: hidden;\n  /*bottom:50%;*/\n  top: 4em;\n  font-size: 0.9em;\n  line-height: 1.2em;\n}\n.aam-designer-init #upload-percentage {\n  display: none;\n  margin-left: 5%;\n}\n.aam-designer-init #upload-button {\n  display: none;\n}\n.aam-designer-init #upload-guidelines h1 {\n  font-weight: bold;\n}\n.aam-designer-init #upload-guidelines span {\n  display: block;\n}\n.aam-designer-init span:nth-child(n+4) {\n  margin-bottom: 1em;\n}\n.aam-designer-init #scrollIndicator {\n  position: absolute;\n  left: 50%;\n  margin-top: 0.5em;\n  display: none;\n}\n.aam-designer-init #scrollPane-aam {\n  width: 98%;\n  margin-left: 5%;\n  margin-top: 0.5em;\n  height: 90%;\n  padding: 1px;\n  /*stop focus rectangle going off the edge*/\n  /*font-size:0 shrinks native button*/\n}\n.aam-designer-init #scrollPane-aam #browse-button input {\n  width: 100%;\n  height: 100%;\n  font-size: 0 !important;\n}\n.aam-designer-init #scrollContent-aam {\n  width: 90%;\n}\n@media (orientation: landscape) {\n  .aam-designer-init #scrollContent-aam {\n    padding-bottom: 4em;\n  }\n}\n.aam-designer-init div.previewImage.loading {\n  background: url(https://uat.serversidegraphics.com/pcs/cdn/V2/App/Skins/FlatGenericV2/resources/loading.gif) no-repeat 39px 40px;\n  background-color: white;\n}\n.aam-designer-init div.previewImage.loading img {\n  display: none;\n}\n.aam-designer-init .activeUploadButton {\n  /*background-color:@grey*/\n  color: white;\n}\n.aam-designer-init .activeUploadButton span {\n  color: #fff;\n}\n.aam-designer-init .bar-button,\n.aam-designer-init .bar-button-disabled {\n  left: 25%;\n}\n.aam-designer-init .bar-button {\n  margin: 1%;\n  line-height: 1em;\n  /*border: 2px solid @grey;*/\n  text-decoration: none;\n  min-width: 50%;\n  padding-top: 15px;\n  padding-bottom: 15px;\n  cursor: pointer;\n}\n.aam-designer-init .bar-button span {\n  display: block;\n  text-align: center;\n  /*color:@grey;*/\n}\n.aam-designer-init .upl-bground {\n  background-color: #fff;\n}\n.aam-designer-init .uploadImage {\n  height: 90px;\n}\n.aam-designer-init .loading-bar {\n  clear: both;\n  border: 1px solid #008DE6;\n  width: 90%;\n  margin-left: 5%;\n  padding: 10px 5px;\n  background-color: #ffffff;\n}\n.aam-designer-init .loading-bar div {\n  height: 8px;\n  background-color: #73B9E6;\n}\n.aam-designer-init .ul-error-box {\n  position: absolute;\n  left: 6%;\n  width: 80%;\n  bottom: 5%;\n  z-index: 3000;\n  color: red;\n  padding: 4%;\n  background-color: white;\n  border: 1px solid red;\n}\n.desktop #upload-guidelines {\n  display: block;\n  width: 100%;\n  font-size: 0.8em;\n  line-height: 1.2;\n  position: relative;\n  left: 50%;\n  transform: translate(-50%);\n  -webkit-transform: translate(-50%);\n}\n.desktop #upload-guidelines h1 {\n  margin-bottom: 15px;\n  font-size: 1em;\n  background: none;\n}\n.desktop #browse-button {\n  /*input { width:100%; height: 100%; font-size:0 !important;} /*font-size:0 shrinks native button*/\n}\n.desktop #browse-button span {\n  position: absolute;\n  width: 100%;\n  font-size: 1.2em;\n  text-align: center;\n}\n.desktop #buttonBar {\n  position: relative;\n  left: 50%;\n  transform: translate(-50%);\n  -webkit-transform: translate(-50%);\n  bottom: 5px;\n  width: 100%;\n  /*83%;*/\n}\n.desktop .bar-button,\n.desktop .bar-button-disabled {\n  margin: 1%;\n  font-size: 1.1em;\n  text-decoration: none;\n  width: 50%;\n  padding-top: 15px;\n  padding-bottom: 15px;\n  cursor: pointer;\n  line-height: 0;\n}\n.uploadControl {\n  background: #EEE;\n  line-height: 1;\n  padding: 10px;\n  border-radius: 5px;\n  margin-left: 30px;\n  width: 305px;\n  height: 73px;\n  float: left;\n}\n.uploadControl form {\n  margin: 0;\n}\n.uploadControl label {\n  margin-bottom: 5px;\n  font-size: 13px;\n  font-weight: bold;\n  line-height: 18px;\n  cursor: pointer;\n  float: left;\n  width: inherit;\n}\n.uploadControl input {\n  font-size: inherit !important;\n}\n.uploadControl .reverseButton {\n  color: #E5E5E5 !important;\n  background-color: #454545;\n  width: 50px;\n  margin-left: 15px;\n}\n.mobile #browse-textbox {\n  padding-bottom: 4.5em;\n}\n.mobile #customGalleryPane {\n  height: 90%;\n  width: 100%;\n  margin-top: 2em;\n  position: absolute;\n}\n.mobile #upload-status {\n  left: 5%;\n  /*bottom: 50%;*/\n}\n.mobile #scrollContent-aam {\n  padding-bottom: 2em;\n}\n.mobile #buttonBar {\n  width: 100%;\n}\n.mobile #buttonBar .bar-button {\n  padding: 0.5em;\n  font-size: 1.4em;\n}\n.mobile #upload-guidelines {\n  font-size: 1.2em;\n  display: block;\n  width: 100%;\n  font-size: 0.8em;\n  line-height: 1.2;\n  position: relative;\n  left: 50%;\n  transform: translate(-50%);\n  -webkit-transform: translate(-50%);\n}\n.mobile #upload-guidelines h1 {\n  font-size: 1em;\n}\n.mobile #logoGalleryPane #upload-guidelines {\n  font-size: 1.2em;\n  display: block;\n  width: 100%;\n  font-size: 0.8em;\n  line-height: 1.2;\n  position: relative;\n  left: 50%;\n  transform: translate(-50%);\n  -webkit-transform: translate(-50%);\n}\n.mobile #logoGalleryPane #upload-guidelines h1 {\n  font-size: 1em;\n}\n.mobile #customGalleryPane .upl-btn-back {\n  height: 1.5em;\n  min-height: 0;\n  margin-top: 0;\n  border-width: 0.2em;\n  font-size: 1.3em;\n}\n.mobile #customGalleryPane .upl-btn-back svg {\n  height: 2em;\n  width: 3.9em;\n}\n.mobile #scrollIndicator {\n  /*display:inline-block;*/\n}\n@media screen and (orientation: landscape) {\n  .mobile #scrollContent-aam {\n    padding-bottom: 4em;\n  }\n}\n@media screen and (orientation: portrait) and (min-height: 699px) and (max-height: 899px), screen and (orientation: landscape) and (min-width: 699px) and (max-width: 899px) {\n  .mobile #upload-guidelines {\n    width: 90%;\n  }\n  .mobile #upload-guidelines ul {\n    display: block;\n    font-size: 0.9em;\n    margin-top: 0px;\n  }\n  .mobile #upload-guidelines span:last-of-type {\n    display: block;\n  }\n}\n@media screen and (orientation: portrait) and (min-height: 1200px), screen and (orientation: landscape) and (min-width: 1200px) {\n  .mobile #upload-guidelines {\n    font-size: 1.5em;\n  }\n}\n@media screen and (min-height: 1300px) and (orientation: portrait), screen and (min-width: 1300px) and (orientation: landscape) {\n  .mobile #customGalleryPane {\n    margin-top: 1em;\n  }\n  .mobile #customGalleryPane .upl-btn-back {\n    height: 32px;\n    border-width: 4px;\n  }\n  .mobile #customGalleryPane #back-button img {\n    height: 105%;\n    top: 4px;\n  }\n  .mobile #buttonBar {\n    font-size: 1.5em;\n  }\n  .mobile .bar-button {\n    border-width: 4px;\n    margin: 0;\n  }\n}\n.aam-designer-init {\n  /*=================== enscroll classes =====================*/\n  /*=================== end enscroll classes =====================*/\n  /*@media(orientation:landscape)\n    {\n        #scrollContent-aam {padding-bottom: 4em;} //moved to upload page!\n    }*/\n  /*============ table styles ==========================*/\n}\n.aam-designer-init #dc-contentTop {\n  width: 100%;\n  margin-bottom: 0.1em;\n}\n.aam-designer-init #dc-contentTop .tabs {\n  display: inline-block;\n}\n.aam-designer-init #dc-contentTop #modeTabs {\n  display: inline-block;\n  float: right;\n}\n.aam-designer-init #dc-contentTop #pvw-designertab-button {\n  width: 73px ;\n}\n.aam-designer-init #dc-contentTop #pvw-designertab-button img {\n  width: initial ;\n}\n.aam-designer-init #dc-contentTop #tool-bar {\n  display: inline-block;\n  width: calc(100% - 81px);\n  margin-left: 0.5em;\n}\n.aam-designer-init #submitHint {\n  display: block;\n  text-align: center;\n}\n.aam-designer-init #submit-button {\n  position: relative;\n  color: #fff;\n  /*font-weight: bold;*/\n  font-size: 1.6em;\n  /*1.2em;*/\n  border: none;\n  padding: 0.3em 2em;\n  text-decoration: none;\n  border-radius: 0 !important;\n  /*override safari native style*/\n  margin-top: 0.2em;\n  cursor: pointer;\n}\n.aam-designer-init #datacapture-text {\n  padding: 0.1em 0;\n  width: 100%;\n}\n.aam-designer-init #datacapture-text h1 {\n  font-size: 1.2em;\n}\n.aam-designer-init #dc-contentBottom2 {\n  position: relative;\n  /*absolute*/\n  left: 4%;\n  width: 94%;\n  max-height: 16em;\n  /*border:0.1em solid #82c6e6;*/\n  border: 2px solid #82c6e6;\n  overflow-y: auto;\n  overflow-x: hidden;\n  box-sizing: border-box;\n  padding: 0.5em;\n  color: #339acc;\n  overflow: hidden;\n}\n.aam-designer-init #scrollPane-dc-aam {\n  overflow: hidden;\n  /*width: 98%;\n        margin-left: 5%;\n        margin-top: 0.5em;\n        height: 90%;*/\n}\n.aam-designer-init #scrollContent-aam {\n  width: 90%;\n}\n.aam-designer-init .dc-field {\n  float: left;\n  width: 16em;\n}\n.aam-designer-init .field-panel {\n  /*border:1px solid red;*/\n  max-width: 18em;\n}\n.aam-designer-init .enscroll-trackV,\n.aam-designer-init .enscrollDcTrackV,\n.aam-designer-init .enscrollHandleV {\n  width: 0.5em;\n}\n.aam-designer-init .enscrollDcTrackV {\n  top: 0;\n  /*0.5em;*/\n}\n.aam-designer-init .enscroll-track {\n  background-clip: padding-box;\n  border-style: solid;\n  border-color: transparent;\n  border-width: 0;\n  border-left-width: 1px;\n}\n.aam-designer-init .enscroll-track div {\n  display: initial;\n}\n.aam-designer-init .enscroll-track .left,\n.aam-designer-init .enscroll-track .right {\n  padding: 0;\n}\n.aam-designer-init .enscrollDcHandleV {\n  width: 0.5em;\n  background-clip: padding-box;\n  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.07);\n  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.07);\n}\n.aam-designer-init #fadeOut {\n  width: 100px;\n  height: 100px;\n  background-color: red;\n}\n.aam-designer-init #validationImage {\n  position: absolute;\n}\n.aam-designer-init #validationCont {\n  display: none;\n  position: absolute;\n  z-index: 2;\n  width: 77%;\n  max-width: 400px;\n  top: 2em;\n  font-size: 0.9em;\n  background-color: #fff;\n  color: red;\n  left: 0.4em;\n}\n.aam-designer-init #validationCont ul {\n  padding: 0.4em 1.4em 0.4em;\n  margin: 0;\n}\n.aam-designer-init #dc-contentBottom2 table {\n  width: 100%;\n}\n.aam-designer-init #dc-contentBottom2 #emailcapture1 {\n  vertical-align: top;\n}\n.aam-designer-init #dc-contentBottom2 #emailcapture1 .tdLabel {\n  width: 30%;\n}\n.aam-designer-init #dc-contentBottom2 #emailcapture1,\n.aam-designer-init #dc-contentBottom2 #datacapture1 {\n  width: 100%;\n}\n.aam-designer-init #dc-contentBottom2 tr {\n  height: 2em;\n}\n.aam-designer-init #dc-contentBottom2 tr .tdLabel {\n  max-width: 12em;\n  min-width: 5em;\n  vertical-align: top;\n}\n.aam-designer-init #dc-contentBottom2 tr .tdValidation {\n  vertical-align: top;\n}\n.aam-designer-init #dc-contentBottom2 td span {\n  display: block;\n}\n.aam-designer-init #dc-contentBottom2 input[type="text"] {\n  background-color: #fff;\n  width: 100%;\n  border: 0.1em solid #82c6e6;\n  padding: 0.1em 0 0 0.3em;\n  box-sizing: border-box;\n}\n.aam-designer-init #dc-contentBottom2 input {\n  font-size: 1em;\n}\n.aam-designer-init #dc-contentBottom2 .tdElement {\n  /*need to restyle this too*/\n}\n.aam-designer-init #dc-contentBottom2 .tdElement select {\n  width: calc(100% - 1.5em);\n  font-size: 1em;\n  border: 0.1em solid #82c6e6;\n  -webkit-appearance: none;\n  padding-left: 1.5em;\n  cursor: pointer;\n}\n.aam-designer-init #dc-contentBottom2 .tdElement #dcSelectorDiv {\n  position: absolute;\n  z-index: 1;\n  pointer-events: none;\n}\n.aam-designer-init #dc-contentBottom2 .tdElement #dcSelectorDiv svg {\n  height: 1.3em;\n  width: 1.3em;\n}\n.aam-designer-init #dc-contentBottom2 .tdElement input[type="checkbox"] {\n  width: 3em;\n  -webkit-min-logical-height: 1em;\n}\n.aam-designer-init #dc-contentBottom2 .tdElement input[type="email"],\n.aam-designer-init #dc-contentBottom2 .tdElement input[type="number"] {\n  border: 0.1em solid #82c6e6;\n}\n.aam-designer-init #dc-contentBottom2 .tdElement input[type="email"] {\n  width: 100%;\n}\n.aam-designer-init #dc-contentBottom2 .tdElement .ssg-select {\n  width: 100%;\n  position: relative;\n}\n.aam-designer-init #dc-contentBottom2 .tdValidation,\n.aam-designer-init #dc-contentBottom2 .validation {\n  text-align: center;\n  width: 1em;\n}\n.aam-designer-init #dc-contentBottom2 .cbox .tdElement {\n  display: block;\n}\n.aam-designer-init #dc-contentBottom2 .cbox .validation {\n  float: right;\n  margin-right: -26px;\n}\n.aam-designer-init .validation.active,\n.aam-designer-init .emailValidation.active {\n  background: url("https://uat.serversidegraphics.com/pcs/cdn/V2/App/Skins/FlatGenericV2/resources/img/fg_error.svg") no-repeat;\n  width: 1.2em;\n  height: 1.2em;\n  background-size: contain;\n}\n@media screen and (orientation: landscape) and (min-width: 1000px) {\n  .aam-designer-init .mobile.landscape #dc-contentBottom2 {\n    height: 50%;\n    max-height: initial;\n  }\n}\n@media screen and (orientation: portrait) and (min-height: 1000px) {\n  .aam-designer-init .mobile.portrait #dc-contentBottom2 {\n    height: 33%;\n    max-height: initial;\n  }\n}\n@media screen and (orientation: portrait) and (min-height: 1300px), (orientation: landscape) and (min-width: 1300px) {\n  .aam-designer-init .mobile .mobile #tool-bar {\n    font-size: 3em;\n  }\n  .aam-designer-init .mobile #dc-contentTop {\n    height: 20em;\n  }\n  .aam-designer-init .mobile #emailcapture1,\n  .aam-designer-init .mobile .mobile #datacapture1,\n  .aam-designer-init .mobile .mobile #validationCont {\n    max-width: initial;\n  }\n  .aam-designer-init .mobile #validationCont {\n    font-size: 3em;\n  }\n  .aam-designer-init .mobile .tdElement .ssg-select {\n    width: 100%;\n  }\n  .aam-designer-init .mobile .tdElement option {\n    font-size: 0.3em;\n  }\n  .aam-designer-init .mobile #pvw-designertab-button {\n    right: 3em;\n  }\n}\n.desktop.landscape #emailcapture1,\n.desktop.landscape #datacapture1 {\n  width: 90%;\n}\n.mobile.landscape #dc-contentBottom2 {\n  /*height:40%; bottom:3.5em;*/\n}\n.mobile.landscape #dc-contentTop #submit-button {\n  bottom: 0.4em;\n}\n.mobile.portrait {\n  /* #dc-contentBottom2 {height:50%;} WCM update 22.09.17*/\n}\n.mobile.portrait #validation1 {\n  width: 90%;\n  left: 5%;\n  background-color: #fff;\n  z-index: 10;\n  top: 2px;\n}\n.desktop.embedded #dc-contentBottom2 {\n  max-height: 16em;\n}\n.desktop.full-screen #dc-contentBottom2 {\n  max-height: initial;\n  height: calc((100% - 170px));\n}\n\r\n.errorContent h1\r\n{\r\n    margin-left: 5%;\r\n    margin-top: 5%;\r\n    margin-bottom: 5%;\r\n    font-weight: normal;\r\n    font-size:18px;\r\n    }\r\n    \r\n.errorContent p{\r\n    margin-left:5%;\r\n    margin-right:5%;\r\n    }\r\n\r\n.errorContent a\r\n{\r\n    text-decoration: none;\r\n    color: #ef8f2c;\r\n    }\r\n    \r\n#contentBottom.errorContent\r\n{ \r\n    border: 1px solid #CCC;\r\n}/*Don\'t use these on elements that already/might have a transform*/\n.hCentre {\n  left: 50%;\n  transform: translateX(-50%);\n  -webkit-transform: translateX(-50%);\n}\n.vCentre {\n  top: 50%;\n  transform: translateY(-50%);\n  -webkit-transform: translateY(-50%);\n}\n.centre {\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n}\n.aam-designer-init {\n  /*============== enscroll.js class rules ================*/\n}\n.aam-designer-init .enscroll-track,\n.aam-designer-init .enscrollTrackH,\n.aam-designer-init .enscrollHandleH {\n  height: 10px;\n}\n.aam-designer-init .enscroll-track {\n  background-clip: padding-box;\n  border-style: solid;\n  border-color: transparent;\n  border-width: 0;\n  border-left-width: 1px;\n}\n.aam-designer-init .enscroll-track div {\n  display: initial;\n}\n.aam-designer-init .enscroll-track .left,\n.aam-designer-init .enscroll-track .right {\n  padding: 0;\n}\n.aam-designer-init .enscrollTrackH2 {\n  top: 0.5em;\n}\n.aam-designer-init .small-text-error {\n  top: 30%;\n  left: 30%;\n  position: absolute;\n  z-index: 1;\n  background-color: white;\n  padding: 1em;\n  border: 2px solid grey;\n  display: block;\n  margin: auto;\n  width: 40%;\n}\n.aam-designer-init #bg-image {\n  z-index: -1;\n}\n.aam-designer-init #mainGalleryPane {\n  height: 95%;\n  width: 100%;\n  margin-top: 0.3em;\n}\n.aam-designer-init #mainGalleryControls {\n  float: left;\n  width: 80%;\n  /*height: 100%; margin-left: 5%;*/\n  display: inline-block;\n  position: relative;\n  /*width:100%; height:50px;*/\n  left: 5px;\n  margin-top: 5px;\n  min-width: 320px;\n}\n.aam-designer-init #UIBlank {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  background-color: white;\n  top: 1.4em;\n  z-index: 1;\n  opacity: 0.9;\n  display: none;\n}\n.aam-designer-init #UIBlank #waiting {\n  width: 50px;\n  height: 50px;\n  background: url(\'https://uat.serversidegraphics.com/pcs/cdn/V2/App/Skins/FlatGenericV2/resources/img/floatingBars.gif\') no-repeat;\n  background-position: center;\n  background-size: contain;\n  margin: auto;\n  margin-top: 50%;\n  display: block;\n  top: 4em;\n}\n@media screen and (orientation: landscape) {\n  .aam-designer-init #UIBlank #waiting {\n    margin-top: 20%;\n  }\n}\n.aam-designer-init #mainGalleryPane #back-button {\n  width: 100%;\n  float: left;\n  height: 0.65em;\n  position: relative;\n  /*.stroke-color{stroke:@grey;}*/\n}\n.aam-designer-init #mainGalleryPane #back-button svg {\n  position: absolute;\n}\n.aam-designer-init #customImageButton {\n  float: left;\n  position: relative;\n}\n.aam-designer-init #customImageButton p {\n  position: absolute;\n  top: 50%;\n  left: 5%;\n  width: 90%;\n  text-align: center;\n  margin-top: 0;\n  transform: translateY(-50%);\n  -webkit-transform: translateY(-50%);\n}\n.aam-designer-init #selector2 {\n  float: left;\n  height: 30px;\n  min-height: 30px;\n  margin-top: 9px;\n  margin-left: 5px;\n}\n.aam-designer-init #selector2 #galleryDropdown {\n  padding: 0 0 0 15%;\n}\n.aam-designer-init #galleryOnly {\n  position: absolute;\n  top: 20px;\n  right: 0;\n  display: none;\n}\n.aam-designer-init #galleryOnly img {\n  height: 45px;\n}\n.aam-designer-init .ssg-main-selector,\n.aam-designer-init #searchPanel {\n  border: 0.1em solid #339acc;\n}\n.aam-designer-init .fb-search {\n  display: none;\n}\n.aam-designer-init #mainGallerySearch {\n  position: absolute;\n  height: 2em;\n}\n.aam-designer-init #selectorDiv {\n  background-color: #ffffff;\n}\n.aam-designer-init #selectorIcon2 {\n  position: absolute;\n  height: 2em;\n  margin-left: 0.5em;\n  pointer-events: none;\n}\n.aam-designer-init #searchPanel {\n  position: relative;\n  float: left;\n  margin-left: 10px;\n  margin-top: 9px;\n  height: 30px;\n  min-height: 30px;\n  width: 38%;\n  background-color: white;\n}\n.aam-designer-init #gallerysearch2 {\n  display: inline-block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.aam-designer-init #gbg-image {\n  position: absolute;\n}\n.aam-designer-init #errorText {\n  padding: 0 0.5em;\n  display: inline-block;\n  width: 82%;\n}\n.aam-designer-init #selectorWrapper {\n  position: relative;\n  width: 38%;\n  height: 2em;\n}\n.aam-designer-init #closeError {\n  float: right;\n  top: 0;\n  right: 0;\n  background: url("https://uat.serversidegraphics.com/pcs/cdn/V2/App/Skins/FlatGenericV2/resources/img//close-search-error.png") no-repeat;\n  background-position: 0.5em 0.5em;\n  width: 2em;\n  height: 2em;\n  cursor: pointer;\n  position: absolute;\n}\n.aam-designer-init #selectorDiv {\n  width: 100%;\n  float: left;\n  background-size: contain;\n}\n.aam-designer-init #mainSelectorDiv {\n  left: 0.3em;\n}\n.aam-designer-init #gallery-top-row {\n  float: left;\n  width: 100%;\n  height: 40%;\n  padding-top: 3%;\n}\n.aam-designer-init #gallery-bottom-row {\n  float: left;\n  width: 100%;\n  height: 50%;\n}\n.aam-designer-init #search-text {\n  float: left;\n  margin-right: 10px;\n  line-height: 22px;\n}\n.aam-designer-init #search-box {\n  float: left;\n  margin-right: 5px;\n  width: 143px;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.aam-designer-init #go-button {\n  /*float: left;  height: 100%;  display: inline-block; width: 30px; margin: 0; padding: 0; background:none; border: none;*/\n  display: none;\n}\n.aam-designer-init #errorImage {\n  float: left;\n  background: url("https://uat.serversidegraphics.com/pcs/cdn/V2/App/Skins/FlatGenericV2/resources/img//fg_error.svg") no-repeat 100% 100%;\n  background-size: contain;\n  width: 1.2em;\n  height: 1.2em;\n}\n.aam-designer-init #gallery-content {\n  float: left;\n  width: 96%;\n  height: 67%;\n  padding: 1%;\n  margin: 1%;\n  position: relative;\n  left: 0;\n  bottom: 0;\n  box-sizing: content-box;\n}\n.aam-designer-init #gallery-content .outerDiv.v .imgCont {\n  margin: 6px;\n  width: 127px;\n  height: 200px;\n}\n.aam-designer-init #gallery-content .v .ssg-gallery {\n  overflow-y: scroll;\n  overflow-x: auto;\n}\n.aam-designer-init #gallery-content .outerDiv.v .imgCont .gallery-img.rotate {\n  height: 127px;\n  width: 200px;\n  top: 37px;\n  position: absolute;\n  left: -36px;\n}\n.aam-designer-init #gallery-content .v {\n  width: 98%;\n  height: 91%;\n  padding: 0.5% 0;\n}\n.aam-designer-init #gallery-content .outerDiv.v {\n  width: 100% !important;\n}\n.aam-designer-init #gallery-content .outerDiv.v .activeImage {\n  width: 127px;\n  height: 200px;\n  padding: 1px 5px 5px 1px;\n  margin: 5px 1px 1px 5px;\n  border: none;\n  box-shadow: #31B7DB 0 0 0 2px;\n}\n.aam-designer-init #gallery-content .outerDiv.v .activeImage .imgCont {\n  margin: 0;\n}\n.aam-designer-init .ssg-gallerysearch #search-text {\n  display: none;\n}\n.aam-designer-init .ssg-gallerysearch #search-box {\n  float: right;\n  width: calc(100% - 35px);\n  height: 82%;\n  border: none;\n  margin-right: 0;\n  padding: 0;\n}\n.aam-designer-init .errorCont {\n  display: none;\n  position: absolute;\n  top: 50%;\n}\n.aam-designer-init .ssg-gallery .activeImage {\n  position: relative;\n  outline: 2px solid #31B7DB;\n  margin: 2px 3px 0 7px;\n  padding: 3px 2px 1px 3px;\n  width: 205px;\n  height: 133px;\n  float: left;\n}\n.aam-designer-init .ssg-gallery .imgCont {\n  float: left;\n  margin: 6px 10px;\n  width: 200px;\n  height: 127px;\n  cursor: pointer;\n  border-radius: 5px;\n  box-shadow: 3px 3px 4px 1px #4D4D4D;\n  position: relative;\n  border: none;\n  padding: 0;\n}\n.aam-designer-init .ssg-selector {\n  float: left;\n  width: 33%;\n}\n.aam-designer-init .outerDiv .activeImage {\n  display: block;\n}\n.aam-designer-init .ssg-gallery .activeImage .imgCont {\n  margin: 0;\n}\n.aam-designer-init .ssg-gallery .outerDiv {\n  float: left;\n  width: 2000px;\n  height: 100%;\n}\n.aam-designer-init .ssg-gallery {\n  float: left;\n  height: 100%;\n  overflow-x: scroll;\n  overflow-y: hidden;\n  width: 100%;\n}\n.aam-designer-init.desktop #gallery-content .activeImage {\n  box-sizing: content-box;\n}\n.aam-designer-init.desktop .ssg-gallerysearch #search-box {\n  -webkit-box-shadow: none;\n  background: none;\n  height: 100%;\n}\n.aam-designer-init.desktop.portrait #selector2 {\n  width: 210px;\n  height: 25px;\n  margin-top: 0;\n  margin-bottom: 2px;\n}\n.aam-designer-init.desktop.portrait #searchPanel {\n  margin-left: 5px;\n  margin-top: 0px;\n  height: 25px;\n  width: 210px;\n}\n.aam-designer-init.portrait #mainGalleryControls {\n  height: 70px;\n}\n.aam-designer-init.portrait #selector2 #gallery-select {\n  background-size: 27px;\n}\n.aam-designer-init.desktop.landscape #selector2 {\n  width: 100%;\n}\n.aam-designer-init.desktop.landscape #selectorWrapper {\n  height: 3em;\n  float: left;\n}\n.aam-designer-init.desktop.landscape #mainGalleryControls {\n  width: 95%;\n}\n.aam-designer-init.landscape.desktop #selectorIcon2 {\n  top: 0.5em;\n}\n/*===========================================================*/\n::-webkit-scrollbar {\n  height: 12px;\n  width: 12px;\n  background: #ccc;\n}\n::-webkit-scrollbar-thumb {\n  background: #777;\n}\n::-webkit-scrollbar-corner {\n  background: #000;\n}\n/*===========================================================*/\n.aam-designer-init.mobile #selectorDiv {\n  height: calc(100% - 4px);\n}\n.aam-designer-init.mobile #customImageButton img {\n  height: 70px;\n}\n.aam-designer-init.mobile #customImageButton {\n  width: 90px;\n}\n.aam-designer-init.mobile #search-box {\n  font-size: 1em;\n}\n.aam-designer-init.mobile #gbg-image {\n  width: 100%;\n  height: 100%;\n}\n.aam-designer-init.mobile #gbg-image img {\n  width: auto;\n  height: 110%;\n}\n.aam-designer-init.mobile #mainGalleryControls {\n  height: 70px;\n}\n.aam-designer-init.mobile #selector2 {\n  background-color: #fff;\n  margin-left: 0;\n}\n.aam-designer-init.mobile #selector2 #galleryDropdown {\n  width: 100%;\n  height: 32px;\n  border: none;\n  background: none;\n  text-indent: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n.aam-designer-init.mobile #mainGalleryPane .outerDiv {\n  transform: scale(0.6) translate(-32%, -32%);\n  -webkit-transform: scale(0.6) translate(-32%, -32%);\n}\n.aam-designer-init.mobile #mainGalleryPane #back-button {\n  height: 1.6em;\n}\n.aam-designer-init.mobile #mainGalleryPane #back-button svg {\n  height: 2em;\n  width: 3.9em;\n}\n.aam-designer-init.mobile #mainGalleryPane .fb-gallery .outerdiv {\n  width: 3000px;\n}\n.mobile #selector2 {\n  width: 210px;\n  height: 25px;\n  margin-top: 0;\n  margin-bottom: 2px;\n}\n.mobile #searchPanel {\n  margin-top: 0.2em;\n  height: 25px;\n  width: 210px;\n  margin-left: initial;\n}\n.mobile #selectorWrapper {\n  float: left;\n  width: 13em;\n}\n.mobile #UIBlank #waiting {\n  top: 4em;\n}\n@media screen and (orientation: landscape) {\n  .mobile #UIBlank #waiting {\n    margin-top: 20%;\n  }\n}\n.mobile.portrait #selectorWrapper,\n.mobile.portrait #searchPanel {\n  width: 60%;\n  margin-left: 0.5em;\n}\n.mobile.portrait #selector2 {\n  width: 100%;\n}\n.mobile.portrait #mainSelectorDiv {\n  left: 0;\n}\n.mobile.portrait .ssg-gallery .outerDiv {\n  transform: scale(0.8) translate(-12%, -12%);\n  -webkit-transform: scale(0.8) translate(-12%, -12%);\n}\n.mobile.landscape #gallery-content {\n  height: 58%;\n}\n@media screen and (orientation: landscape) {\n  .mobile .ssg-gallery .outerDiv {\n    transform: scale(0.59) translate(-34%, -34%);\n    -webkit-transform: scale(0.59) translate(-34%, -34%);\n  }\n  .mobile #gallery-content {\n    margin-top: 0;\n  }\n  .mobile #mainGalleryControls {\n    width: 90%;\n  }\n  .mobile #selectorWrapper {\n    float: left;\n    left: 1em;\n    width: initial;\n    margin-right: 0.3em;\n    margin-top: 0.2em;\n  }\n  .mobile #searchPanel {\n    float: left;\n    left: 1em;\n  }\n}\n@media screen and (min-height: 500px) and (orientation: portrait) {\n  .mobile #mainGalleryPane .ssg-gallery .outerDiv {\n    transform: scale(0.8) translate(-12%, -12%);\n    -webkit-transform: scale(0.8) translate(-12%, -12%);\n  }\n}\n@media screen and (min-width: 1300px) and (orientation: landscape), (min-height: 1300px) and (orientation: portrait) {\n  .mobile.aam-designer-init #breadcrumbBar {\n    margin-bottom: 0.5em;\n  }\n  .mobile.aam-designer-init #selectorWrapper {\n    margin: 0.2em 0.2em 0 0;\n    float: left;\n    width: initial;\n    min-width: 12em;\n  }\n  .mobile.aam-designer-init #selectorWrapper #galleryDropdown {\n    font-size: 1.2em;\n  }\n  .mobile.aam-designer-init #searchPanel {\n    width: initial;\n    font: 1.2em;\n  }\n  .mobile.aam-designer-init #searchPanel #search-box {\n    font-size: 1.2em;\n    height: 100%;\n  }\n  .mobile.aam-designer-init #searchPanel #go-button {\n    position: absolute;\n    left: 0;\n    min-width: initial;\n  }\n}\n.aam-designer-init #pvw-designertab-button {\n  height: 50px;\n  width: 100px;\n  float: right;\n}\n.aam-designer-init #pvw-designertab-button svg {\n  position: absolute;\n}\n.aam-designer-init #previewDescription {\n  position: absolute;\n  opacity: 0;\n}\n.aam-designer-init #preview-container {\n  position: absolute;\n  left: 0;\n  top: 15%;\n  overflow: hidden;\n  /*border-radius:17px;*/\n}\n.aam-designer-init #sideBar {\n  width: 100%;\n  height: 35%;\n  bottom: 36px;\n  /*left:0;*/\n  position: absolute;\n  /*color:@colour2*/\n  font-size: 1.2em;\n}\n.aam-designer-init #textPanel {\n  background-color: #fff;\n  opacity: 0.5;\n  width: 100%;\n  height: 100%;\n  top: 25px;\n  position: absolute;\n  display: none;\n}\n.aam-designer-init #next-button,\n.aam-designer-init #pre-next-button {\n  left: 50%;\n  /*font-weight: bold;*/\n  float: right;\n  font-size: 1.2em;\n  padding: 0.7em 2em;\n  text-decoration: none;\n  bottom: 0;\n  position: absolute;\n  transform: translate(-50%, 0);\n  -webkit-transform: translate(-50%, 0);\n  margin-top: 0;\n  line-height: 0.1em;\n}\n.aam-designer-init #next-button {\n  font-size: 1.6em;\n  /*bottom:0.7em;*/\n  float: left;\n  clear: left;\n}\n.aam-designer-init #preview-text {\n  float: left;\n  width: 50%;\n  min-width: 14em;\n  max-width: 16em;\n  position: absolute;\n  line-height: 0.9em;\n  left: 50%;\n  transform: translateX(-50%);\n  -webkit-transform: translateX(-50%);\n}\n.aam-designer-init #preview-text span {\n  font-size: 0.8em;\n}\n.aam-designer-init #preview-text h1 {\n  font-size: 15px;\n  font-weight: bold;\n  background: none;\n}\n.aam-designer-init #ssg-preview {\n  -webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);\n  /*border-radius:14px;*/\n}\n.aam-designer-init #copyright-warning,\n.aam-designer-init #realTimeCheckWarning,\n.aam-designer-init #realTimeCheckDenied {\n  display: none;\n  position: absolute;\n  padding: 0.4em;\n  padding-bottom: 4em;\n  text-align: left;\n  width: 90%;\n  left: 5%;\n  top: 17%;\n  border: solid 0.2px;\n  font-size: 0.8em;\n  line-height: 1.2em;\n  max-width: 30em;\n  box-sizing: border-box;\n  background-color: #fff;\n}\n.aam-designer-init #copyright-warning #warning,\n.aam-designer-init #realTimeCheckWarning #warning,\n.aam-designer-init #realTimeCheckDenied #warning {\n  margin: 8px 10px;\n  margin-left: 99px;\n}\n.aam-designer-init #copyright-warning ul,\n.aam-designer-init #realTimeCheckWarning ul,\n.aam-designer-init #realTimeCheckDenied ul {\n  margin: 1em 1em;\n  text-align: left;\n}\n.aam-designer-init #copyright-warning p,\n.aam-designer-init #realTimeCheckWarning p,\n.aam-designer-init #realTimeCheckDenied p {\n  margin: 1em 1em;\n  font-size: 1em;\n}\n.aam-designer-init #copyright-warning .button-grey-disabled,\n.aam-designer-init #realTimeCheckWarning .button-grey-disabled,\n.aam-designer-init #realTimeCheckDenied .button-grey-disabled {\n  pointer-events: none;\n  opacity: 0.2;\n}\n.aam-designer-init #copyright-warning .copyright-content,\n.aam-designer-init #realTimeCheckWarning .copyright-content,\n.aam-designer-init #realTimeCheckDenied .copyright-content {\n  display: block;\n}\n.aam-designer-init #realTimeCheckWarning,\n.aam-designer-init #realTimeCheckDenied {\n  padding-bottom: 1em;\n  text-align: center;\n}\n.aam-designer-init #realTimeCheckWarning #warning,\n.aam-designer-init #realTimeCheckDenied #warning,\n.aam-designer-init #realTimeCheckWarning #point,\n.aam-designer-init #realTimeCheckDenied #point {\n  display: none;\n}\n.aam-designer-init #realTimeCheckWarning div,\n.aam-designer-init #realTimeCheckDenied div,\n.aam-designer-init #realTimeCheckWarning p,\n.aam-designer-init #realTimeCheckDenied p {\n  text-align: center;\n}\n.aam-designer-init #realTimeCheckWarning button,\n.aam-designer-init #realTimeCheckDenied button {\n  padding: 0.5em 2em;\n  left: 50%;\n  color: white;\n  font-size: 1.5em;\n  text-decoration: none;\n  display: inline-block;\n  margin-top: .5em;\n}\n.aam-designer-init .term-list-head {\n  font-weight: 700;\n}\n.aam-designer-init #closePanel {\n  padding: 0.5em 2em;\n  left: 50%;\n  position: absolute;\n  transform: translateX(-50%);\n  color: white;\n  font-size: 1.5em;\n  text-decoration: none;\n  display: inline-block;\n}\n.aam-designer-init.landscape #preview-text h1 {\n  margin: 1em 0;\n}\n.aam-designer-init.desktop.landscape #preview-container {\n  transform: scale(1.3, 1.3) translateX(-37%);\n  -webkit-transform: scale(1.3, 1.3) translateX(-37%);\n  top: 17%;\n  left: 50%;\n}\n.aam-designer-init.desktop #preview-container {\n  transform: translateX(-50%);\n  -webkit-transform: translateX(-50%);\n  top: 17%;\n  left: 50%;\n}\n.aam-designer-init.desktop #sideBar {\n  bottom: 0;\n  height: 45%;\n  left: 0;\n}\n.aam-designer-init.desktop #preview-text span {\n  line-height: 1em;\n}\n.aam-designer-init.desktop #mainGalleryControls {\n  height: initial;\n}\n.aam-designer-init.desktop #next-button {\n  bottom: 0.7em;\n}\n.aam-designer-init.mobile.landscape.full-screen {\n  /*#sideBar{ height:50%; }*/\n}\n@media (max-height: 321px) {\n  .aam-designer-init.mobile.landscape.full-screen #preview-container {\n    transform: scale(0.7) translate(-74%, -28%);\n    -webkit-transform: scale(1) translate(-48%, -12%);\n  }\n}\n.aam-designer-init.mobile {\n  /*NB:these are necessary for iOS mobile*/\n}\n.aam-designer-init.mobile #sideBar {\n  bottom: 0;\n  left: 0;\n}\n.aam-designer-init.mobile #preview-text h1,\n.aam-designer-init.mobile .mobile #preview-text span {\n  font-size: 0.8em;\n  background: none;\n}\n.aam-designer-init.mobile #copyright-warning {\n  border-width: 0.2em;\n  font-size: 1.1em;\n  /* padding-bottom: 1em;*/\n  max-width: initial;\n}\n.aam-designer-init.mobile #copyright-warning #terms {\n  height: 1.3em;\n  width: 1.3em;\n}\n.aam-designer-init.mobile #copyright-warning ol {\n  padding: 1em;\n}\n.aam-designer-init.mobile #modeTabs,\n.aam-designer-init.mobile #tool-bar {\n  display: none;\n}\n.aam-designer-init.mobile #pvw-designertab-button {\n  height: 1em;\n}\n.aam-designer-init.mobile #pvw-designertab-button svg {\n  height: 3.2em;\n}\n.aam-designer-init.mobile #preview-container {\n  left: 50%;\n  transform: translateX(-51%);\n  -webkit-transform: translateX(-51%);\n}\n.aam-designer-init.mobile #preview-text {\n  /*wcm update 22.09.17*/\n  position: relative;\n  padding-bottom: 0.5em;\n}\n.aam-designer-init.mobile #preview-text #preview-info {\n  position: relative;\n}\n.aam-designer-init.mobile #next-button {\n  position: relative;\n}\n@media screen and (orientation: portrait) {\n  .aam-designer-init.mobile #copyright-warning {\n    top: 16%;\n    width: 100%;\n    left: 0;\n    /*border:none;*/\n    font-size: 0.85em;\n    background-color: none;\n    border: 2px solid;\n  }\n  .aam-designer-init.mobile #copyright-warning p {\n    margin: 0;\n    margin-bottom: 0.4em;\n  }\n  .aam-designer-init.mobile #copyright-warning ol {\n    margin: 0.1em 0.5em;\n  }\n  .aam-designer-init.mobile #preview-container {\n    top: 20%;\n  }\n  .aam-designer-init.mobile #sideBar {\n    height: 45%;\n  }\n  .aam-designer-init.mobile #next-button {\n    bottom: initial;\n    /*top:3em;*/\n  }\n}\n@media screen and (orientation: portrait) and (min-height: 600px) {\n  .aam-designer-init.mobile {\n    /*#next-button{ top:8em;}*/\n  }\n  .aam-designer-init.mobile #copyright-warning {\n    width: 96%;\n    margin-left: 3%;\n  }\n}\n@media screen and (orientation: portrait) and (min-height: 700px) {\n  .aam-designer-init.mobile #copyright-warning {\n    font-size: 1.3em;\n  }\n}\n@media screen and (orientation: portrait) and (min-height: 1300px) {\n  .aam-designer-init.mobile #copyright-warning #terms {\n    width: 3em;\n    height: 3em;\n  }\n}\n@media screen and (orientation: landscape) {\n  .aam-designer-init.mobile #preview-container {\n    top: 15%;\n  }\n  .aam-designer-init.mobile #sideBar {\n    height: 50%;\n    /*44%*/\n    /*width: 20em;*/\n    left: 50%;\n    transform: translateX(-50%);\n    -webkit-transform: translateX(-50%);\n  }\n  .aam-designer-init.mobile #copyright-warning {\n    top: 20%;\n    width: 100%;\n    left: 0;\n    /*border:none;*/\n    font-size: 0.8em;\n    background-color: none;\n    /*#next-button{bottom:0.3em;}   */\n  }\n  .aam-designer-init.mobile #copyright-warning p {\n    margin: 0;\n    margin-bottom: 0.4em;\n  }\n}\n@media screen and (orientation: landscape) and (max-width: 599px) {\n  .aam-designer-init.mobile #preview-text {\n    max-width: initial;\n    width: 90%;\n  }\n}\n@media screen and (orientation: landscape) and (min-width: 600px) {\n  .aam-designer-init.mobile .portrait #copyright-warning ol {\n    display: block;\n    margin: 0.5em;\n  }\n  .aam-designer-init.mobile .portrait #copyright-warning span {\n    display: block;\n  }\n}\n@media screen and (orientation: landscape) and (min-width: 700px) {\n  .aam-designer-init.mobile #copyright-warning {\n    font-size: 1em;\n    /*1.8em*/\n  }\n}\n@media screen and (orientation: landscape) and (min-width: 1300px) {\n  .aam-designer-init.mobile #copyright-warning #terms {\n    width: 3em;\n    height: 3em;\n  }\n}\n@media screen and (max-height: 480px) and (orientation: portrait), (max-width: 480px) and (orientation: landscape) {\n  .aam-designer-init.mobile #copyright-warning {\n    font-size: 0.8em;\n  }\n}\n@media screen and (min-height: 900px) and (orientation: portrait), (min-width: 900px) and (orientation: landscape) {\n  .aam-designer-init.mobile #preview-container {\n    transform: scale(1.2, 1.2) translateX(-43%);\n    -webkit-transform: scale(1.2, 1.2) translateX(-43%);\n    top: 14%;\n  }\n  .aam-designer-init.mobile #preview-text {\n    width: 60%;\n    font-size: 1.5em;\n  }\n  .aam-designer-init.mobile #preview-text h1 {\n    margin: 0;\n    margin-bottom: 0.3rem;\n  }\n  .aam-designer-init.mobile #sideBar {\n    height: 45%;\n  }\n  .aam-designer-init.mobile #sideBar #next-button {\n    clear: left;\n  }\n}\n@media screen and (min-height: 1100px) and (orientation: portrait), (min-width: 1100px) and (orientation: landscape) {\n  .aam-designer-init.mobile #preview-container {\n    transform: scale(1.1, 1.1) translateX(-43%);\n    -webkit-transform: scale(1.1, 1.1) translateX(-43%);\n    top: 19%;\n  }\n  .aam-designer-init.mobile #preview-text h1,\n  .aam-designer-init.mobile .mobile #preview-text span {\n    font-size: 1.5rem;\n    line-height: 1.5rem;\n    background: none;\n  }\n  .aam-designer-init.mobile #next-button {\n    font-size: 1.2em;\n    width: initial;\n    left: 50%;\n    transform: translateX(-50%);\n    -webkit-transform: translateX(-50%);\n    padding: 1em 2em;\n  }\n}\n@media screen and (min-height: 2000px) and (orientation: portrait), (min-width: 2000px) and (orientation: landscape) {\n  .aam-designer-init.mobile #pvw-designertab-button {\n    height: 7em;\n  }\n  .aam-designer-init.mobile #preview-container {\n    top: 10%;\n  }\n  .aam-designer-init.mobile #preview-text {\n    width: 600px;\n    font-size: 1.2em;\n  }\n  .aam-designer-init.mobile #sideBar {\n    height: 50%;\n    font-size: 2.5em;\n  }\n  .aam-designer-init.mobile #pvw-designertab-button {\n    width: 180px;\n  }\n  .aam-designer-init.mobile .nav-button img {\n    width: 100%;\n  }\n  .aam-designer-init.mobile #next-button {\n    border-width: 9px;\n  }\n  .aam-designer-init.mobile #copyright-warning {\n    font-size: 2em;\n    line-height: 1.4em;\n  }\n}\n@media screen and (min-height: 900px) and (orientation: portrait), (min-width: 900px) and (orientation: landscape) {\n  .aam-designer-init.mobile.full-screen #preview-container {\n    transform: scale(1.2, 1.2) translateX(-41%);\n    -webkit-transform: scale(1.2, 1.2) translateX(-41%);\n    top: 14%;\n  }\n  .aam-designer-init.mobile.full-screen #preview-text {\n    width: 60%;\n    /*390px;*/\n    font-size: 1.5em;\n  }\n  .aam-designer-init.mobile.embedded.landscape {\n    min-height: 380px !important;\n  }\n  .aam-designer-init.mobile.embedded.landscape #preview-container {\n    transform: scale(1, 1) translateX(-50%);\n    -webkit-transform: scale(1, 1) translateX(-50%);\n  }\n  .aam-designer-init.mobile.embedded.landscape #sideBar {\n    width: 100%;\n  }\n}\n');
    }()
}();