(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Skill picker (teen page) ---------- */
  var gigs = {
    design: { tag: "Design", title: "Design an Instagram poster for a brand sale", pay: "\u20B9600", time: "2 days" },
    writing: { tag: "Writing", title: "Write 3 simple blog posts about money basics", pay: "\u20B91,200", time: "5 days" },
    video: { tag: "Reels", title: "Make a 30-second product reel", pay: "\u20B9800", time: "3 days" },
    coding: { tag: "Coding", title: "Build a one-page website for a local shop", pay: "\u20B92,000", time: "6 days" },
    surveys: { tag: "Quick task", title: "Finish a 5-minute app survey", pay: "\u20B9100", time: "10 minutes" }
  };

  var chips = document.querySelectorAll(".chip[data-skill]");
  var gig = document.getElementById("gig");
  if (chips.length && gig) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var g = gigs[chip.dataset.skill];
        if (!g) return;
        chips.forEach(function (c) {
          c.setAttribute("aria-pressed", String(c === chip));
        });
        gig.querySelector("[data-gig-tag]").textContent = g.tag;
        gig.querySelector("[data-gig-title]").textContent = g.title;
        gig.querySelector("[data-gig-pay]").textContent = g.pay;
        gig.querySelector("[data-gig-time]").textContent = g.time;
        gig.classList.remove("swap");
        void gig.offsetWidth; /* restart the animation */
        gig.classList.add("swap");
      });
    });
  }

  /* ---------- Project brief (company page) ---------- */
  var form = document.getElementById("brief-form");
  if (form) {
    var out = {
      company: document.getElementById("out-company"),
      type: document.getElementById("out-type"),
      budget: document.getElementById("out-budget"),
      days: document.getElementById("out-days")
    };
    var status = document.getElementById("form-status");

    function show(el, text, fallback) {
      var value = text && text.trim() ? text.trim() : fallback;
      if (el.textContent !== value) {
        el.textContent = value;
        el.classList.remove("filled");
        void el.offsetWidth;
        el.classList.add("filled");
      }
    }

    function update() {
      show(out.company, form.company.value, "Your company");
      show(out.type, form.type.value, "Pick a project type");
      show(out.budget, form.budget.value, "Pick a budget");
      var d = parseInt(form.days.value, 10);
      show(out.days, d > 0 ? "Deliver in " + d + (d === 1 ? " day" : " days") : "", "Add a deadline");
    }

    form.addEventListener("input", update);
    form.addEventListener("change", update);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      /* Demo only: connect this to your backend or email service to receive real briefs. */
      status.hidden = false;
      status.textContent = "Thanks! Your project brief is ready. The Funngro team will reach out on " + form.email.value + ".";
      status.focus();
      form.reset();
      update();
    });
    update();
  }
})();