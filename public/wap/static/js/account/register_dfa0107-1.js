$(function () {
    var e = function () {
    }, o = function () {
        var e = document.location.href.split("backurl=");
        return e[1] ? e[1] : document.referrer || "/"
    }, t = function (e, o, t) {
        var n = '<p class="warn-info" style="font-size: 16px;line-height: 28px;max-width: 600px;">' + e + "</p>";
        return o && "undefined" != typeof t && (n += "imooc" == t ? '<p class="warn-tip" style="color: #999;margin-top: 30px;">可能导致账号冻结的原因  <a href="../../../../../newfaq-id=101-1.htm"/*tpa=http://m.imooc.com/newfaq?id=101*/ target="_blank" style="color: #08c !important;">了解详情</a></p>' : '<p class="warn-tip" style="color: #999;margin-top: 30px;">可能导致账号冻结的原因  <a href="../../../../../newfaq-id=101-1.htm"/*tpa=http://m.imooc.com/newfaq?id=101*/ target="_blank" style="color: #08c !important;">了解详情</a></p>'), n += '<div class="moco-modal-btns"><a class="moco-btn moco-btn-blue moco-modal-close js-modal-close" href="javascript:void(0)"><span>确定</span></a></div>'
    }, n = function () {
        $(".verify-img").attr("src", imoocSSO.verifyCodeUrl + "?t=" + (new Date).getTime()), $(".js-input-verify").val("")
    }, a = function () {
        $(".verify-img-wrap").append($('<img class="verify-img"/>')), n()
    }, s = {
        checkPhone: function () {
            var e = $(".js-input-name").val();
            if ("86" != $(".js-code-btn span").text())e.length > 5 && $(".js-btn-next").removeClass("disabled"); else {
                var o = W.Validater.validateRules["require-mobile-phone"].regex;
                o.lastIndex = 0, o.test(e) ? $(".js-btn-next").removeClass("disabled") : $(".js-btn-next").addClass("disabled")
            }
        }, sendSMS: function (e) {
            var o = this;
            if ($(".js-error").hide(), !$(".js-btn-send a").hasClass("disabled")) {
                var t = $(".js-input-name").val();
                if ("86" != $(".js-code-btn span").text()) {
                    if (t.length <= 5)return;
                    t = $(".js-code-btn").text() + t
                } else {
                    var a = W.Validater.validateRules["require-mobile-phone"].regex;
                    if (a.lastIndex = 0, !a.test(t))return
                }
                $(".js-btn-send a").attr("disabled", "disabled").addClass("disabled");
                var i = $(".js-verify").val(), r = {phone: t, typecode: e};
                i ? r.verify = i : r.type = 1, $.ajax({
                    url: "/passport/user/getphonelogincode",
                    data: r,
                    method: "post",
                    dataType: "json",
                    success: function (e) {
                        $(".js-btn-send a").removeAttr("disabled").removeClass("disabled"), 10001 == e.status ? ($(".js-btn-send").html('<div class="send-timer js-btn-send">重新发送<span>60</span></div>'), $(".verify-box,.js-verify-mask").hide(), s.showPhoneVerity()) : 10005 == e.status ? ($(".mask-view").show(), $(".verify-box").show()) : (11001 == e.status && $(o).attr("disabled", "disabled").addClass("disabled"), 90004 == e.status ? ($(".js-verify").parents(".account-form-group").find(".account-form-tip").html(e.msg).show(), n()) : $(".js-error").show().html(e.msg))
                    },
                    error: function () {
                        $(".js-error").show().html("服务错误，稍后重试")
                    }
                })
            }
        }, showPhoneVerity: function (e) {
            var e = $(".js-btn-send span").text();
            if (e > 1)e--, $(".js-btn-send span").text(e), setTimeout(s.showPhoneVerity, 1e3); else {
                var o = '<a href="javascript:void(0)" class="btn-send-verify js-btn-resend">重发短信</a>';
                "86" == $(".js-code-btn span").text() && (o += '<a href="javascript:void(0)" class="btn-send-verify js-btn-voice">语音验证码</a>'), $(".js-btn-send").html(o)
            }
        }, phoneRegister: function () {
            var e = this;
            if (!$(this).hasClass("disabled")) {
                var n = $(".js-input-name").val();
                if ("86" != $(".js-code-btn span").text()) {
                    if (n.length <= 5)return void $(".js-phone-verify").parents(".account-form-group").find(".account-form-tip").html("手机号输入错误").show();
                    n = $(".js-code-btn").text() + n
                } else {
                    var a = W.Validater.validateRules["require-mobile-phone"].regex;
                    if (a.lastIndex = 0, !a.test(n))return void $(".js-phone-verify").parents(".account-form-group").find(".account-form-tip").html("手机号输入错误").show()
                }
                if (4 != $(".js-phone-verify").val().length)return void $(".js-phone-verify").parents(".account-form-group").find(".account-form-tip").html("请输入短信验证码").show();
                var s = {
                    phone: n,
                    code: $(".js-phone-verify").val(),
                    remember: 0,
                    referer: window.location.protocol + "//" + window.location.hostname,
                    auto_register: 1
                };
                $(this).text("正在登录...").attr("disabled", "disabled").addClass("disabled"), $.ajax({
                    url: "/passport/user/phonelogin",
                    data: s,
                    method: "post",
                    dataType: "json",
                    success: function (e) {
                        if (10020 == e.status) {
                            var n = "", a = "十分抱歉，由于您的账号最近在实战中存在严重违规的情况，已做冻结账号处理";
                            n = t(a, !0, "shizhan"), $.dialog(n, {title: "提示", modal: !0})
                        } else if (10021 == e.status) {
                            var n = "", a = "十分抱歉，由于您的账号最近在实战中被多次警告，已做冻结账号处理";
                            n = t(a, !0, "shizhan"), $.dialog(n, {title: "提示", modal: !0})
                        } else if (10022 == e.status) {
                            var n = "", a = "十分抱歉，由于您的账号最近在慕课网被多次警告，已做冻结账号处理";
                            n = t(a, !0, "imooc"), $.dialog(n, {title: "提示", modal: !0})
                        } else if (10006 == e.status) {
                            var n = "", a = "十分抱歉，由于您的账号最近在慕课网中存在严重违规的情况，已做冻结账号处理";
                            n = t(a, !0, "imooc"), $.dialog(n, {title: "提示", modal: !0})
                        } else if (10001 == e.status)if (e.caution) {
                            var n = t(e.caution, !1);
                            $.dialog(n, {
                                title: "提示", modal: !0, callback: function () {
                                    window.location.href = "http://www.imooc.com/index/usercheck?uid=" + e.data.userInfo.uid
                                }
                            })
                        } else imoocSSO.crossDomainAction(function () {
                            window.location.replace(o())
                        }), imoocSSO.setCrossDomainCookie(e.data.url);
                        10001 != e.status || e.caution ? zhuge.track("注册失败", {"平台": "wap"}) : zhuge.track("注册成功", {
                            "平台": "wap",
                            "用户uid": ""
                        })
                    },
                    error: function () {
                        $(".js-error").show().html("服务错误，稍后重试"), $(e).text("登录").removeAttr("disabled").removeClass("disabled"), zhuge.track("注册失败", {"平台": "wap"})
                    }
                })
            }
        }, showAreaCode: function () {
            $(".js-code-box").toggle()
        }, setAreaCode: function (e) {
            var o = $(e).data("code");
            $(".js-code-btn span").text(o), this.showAreaCode()
        }, bindAreaCode: function () {
            for (var e = "", o = 0; o < AreaName.length; o++) {
                e += "<dl>", e += "<dt>" + AreaName[o] + "</dt>";
                for (var t = 0; t < AreaCode[o].length; t++)e += '<dd><a href="javascript:void(0)" data-code="' + AreaCode[o][t].code + '"><span>+' + AreaCode[o][t].code + "</span>" + AreaCode[o][t].name + "</a></dd>";
                e += "</dl>"
            }
            $(".js-code-list").html(e)
        }
    }, i = function () {
        function e() {
            for (var e in t)e.indexOf("/user") > -1 && (t[e].close && t[e].close(), t[e] = null, delete t[e])
        }

        var t = {};
        return {
            open: function (n) {
                var a, s;
                return t[n] && t[n].closed === !1 ? void(t[n].focus && t[n].focus()) : (e(), a = (screen.width - 600) / 2, s = (screen.height - 400) / 2, void(t[n] = window.open(n + "&referer=" + window.location.protocol + "//" + window.location.hostname + "&backurl=" + encodeURIComponent(o()), "toolbar=no, directories=no, status=no, menubar=no, width=600, height=500, top=" + s + ", left=" + a)).focus())
            }, clear: e
        }
    }(), r = function () {
        a(), window.__fireLogined = function () {
            var e = o();
            window.location.replace(e)
        }, navigator.userAgent.indexOf("MicroMessenger") > -1 ? ($(".js-login-wx").show(), $("a[data-login-sns]").off("click").each(function () {
            $(this).attr("href", $(this).attr("data-login-sns") + "&referer=" + window.location.protocol + "//" + window.location.hostname + "&backurl=" + encodeURIComponent(o()))
        })) : navigator.userAgent.indexOf("SQ") > -1 ? ($(".js-login-qq").show(), $(".js-login-qq-s").hide(), $("a[data-login-sns]").off("click").each(function () {
            $(this).attr("href", $(this).attr("data-login-sns") + "&referer=" + window.location.protocol + "//" + window.location.hostname + "&backurl=" + encodeURIComponent(o()))
        })) : $("a[data-login-sns]").click(function () {
            i.open($(this).attr("data-login-sns"))
        }), $(".account-form").on("click", ".verify-img", n).on("click", ".js-btn-next", function () {
            s.sendSMS(0)
        }).on("click", ".js-btn-resend", function () {
            s.sendSMS(0)
        }).on("click", ".js-btn-submit", s.phoneRegister).on("click", ".js-btn-voice", function () {
            s.sendSMS(1)
        }), $(".js-login").on("click", function () {
            window.location.href = "http://m.imooc.com/static/wap/static/js/account/login?backurl=" + o()
        }), $(document).on("click", ".js-code-close", function () {
            s.showAreaCode()
        }).on("click", ".js-code-btn", function () {
            s.showAreaCode()
        }).on("click", ".js-code-list a", function () {
            s.setAreaCode(this)
        }).on("keyup", ".js-input-name", function () {
            s.checkPhone()
        }).on("click", ".js-btn-verify", function () {
            var e = $(".js-verify").val();
            return 4 != e.length ? void $(this).parents(".account-form-group").find(".account-form-tip").html("请输入4位验证码").show() : void s.sendSMS(0)
        }).on("click", ".js-modal-close", function () {
            $(".js-warn").remove(), e()
        }), s.bindAreaCode()
    }, c = function () {
        r(), $.dialog = function (o, t) {
            var n = '<div class="warn-overlay js-warn"><div class="warn-title"><i class="imwap-close"></i></div><div class="warn-wrap">' + o + "</div></div>";
            $(document.body).append(n), $(".js-btn-submit").html("登录").removeAttr("disabled").removeClass("disabled"), e = t.callback || function () {
                }
        }
    };
    c()
});