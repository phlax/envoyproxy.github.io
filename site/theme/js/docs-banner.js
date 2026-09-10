(() => {
  // The banner can be injected more than once into docs HTML; reuse a shared
  // controller so document-level listeners are replaced instead of duplicated.
  const controllerKey = "__envoyDocsBannerListeners";
  const previousController = globalThis[controllerKey];
  if (previousController instanceof AbortController) {
    previousController.abort();
  }
  const controller = new AbortController();
  globalThis[controllerKey] = controller;

  const DOCS_PREFIX = "/docs/envoy/";
  const VERSIONS_URL = `${DOCS_PREFIX}versions.json`;
  const OPEN_SHORTCUT = "V";
  const LIST_ID = "envoy-docs-banner-version-list";
  const MENU_ID = "envoy-docs-banner-version-menu";
  const HELP_ID = "envoy-docs-banner-help";
  const QUERY_ID = "envoy-docs-banner-query";

  const currentScript = document.currentScript;
  const currentPath = location.pathname;

  const isEditableTarget = (target) => target instanceof Element &&
    (target.closest("input, textarea, select, [contenteditable='true']") !== null);

  const isExternalUrl = (url) => {
    try {
      return new URL(url, location.origin).origin !== location.origin;
    } catch {
      return true;
    }
  };

  const currentSection = (() => {
    if (currentPath.startsWith("/docs")) {
      return "/docs";
    }
    const [segment] = currentPath.split("/").filter(Boolean);
    return segment ? `/${segment}` : "/";
  })();

  const isNavLinkActive = (link) => {
    if (!link?.url || isExternalUrl(link.url)) {
      return false;
    }
    return currentSection === "/docs"
      ? link.url === "/docs"
      : link.url === currentSection;
  };

  const readVersionFromPath = () => {
    if (!currentPath.startsWith(DOCS_PREFIX)) {
      return null;
    }
    const rel = currentPath.slice(DOCS_PREFIX.length);
    const [segment] = rel.split("/");
    if (!segment) {
      return null;
    }
    return segment;
  };

  const normalizeVersion = (version) => {
    if (!version) return "";
    if (version === "latest") return "latest";
    return version.replace(/^v/, "");
  };

  const versionFromUrl = readVersionFromPath();
  const currentVersion = normalizeVersion(
    currentScript?.dataset?.envoyDocsVersion || versionFromUrl || "",
  );

  if (!currentVersion) {
    return;
  }

  const relPath = (() => {
    const rel = location.pathname.slice(DOCS_PREFIX.length);
    const parts = rel.split("/");
    parts.shift();
    return parts.join("/");
  })();

  const withLeadingV = (version) => (version === "latest" ? version : `v${normalizeVersion(version)}`);

  const buildVersionLink = (version) => {
    const target = new URL(location.href);
    target.pathname = relPath
      ? `${DOCS_PREFIX}${withLeadingV(version)}/${relPath}`
      : `${DOCS_PREFIX}${withLeadingV(version)}/`;
    target.search = location.search;
    target.hash = location.hash;
    return `${target.pathname}${target.search}${target.hash}`;
  };

  fetch(VERSIONS_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`fetch failed: ${response.status}`);
      }
      return response.json();
    })
    .then((versions) => {
      const stable = versions.stable || {};
      const archived = versions.archived || {};
      const latestStable = normalizeVersion(versions.latest_stable || "");
      const allStable = Object.values(stable).flat();
      const allArchived = Object.values(archived).flat();

      const options = [];
      const pushOption = (version, state) => {
        if (!version) {
          return;
        }
        const normalized = normalizeVersion(version);
        if (options.some((option) => option.version === normalized)) {
          return;
        }
        options.push({ version: normalized, state });
      };

      pushOption("latest", "latest");
      pushOption(latestStable, "stable");
      allStable.forEach((version) => pushOption(version, "stable"));
      allArchived.forEach((version) => pushOption(version, "archived"));

      const currentDisplay = currentVersion === "latest"
        ? "Latest (development)"
        : `v${currentVersion}`;

      const banner = document.createElement("div");
      banner.className = "envoy-docs-banner";
      banner.innerHTML = `
        <div class="envoy-docs-banner__nav-row">
          <a class="envoy-docs-banner__logo" href="/" aria-label="Envoy home">
            <img src="/theme/images/envoy-logo.svg" alt="Envoy" />
          </a>
          <nav class="envoy-docs-banner__nav"><ul></ul></nav>
          <div class="envoy-docs-banner__version">
            <button type="button" class="envoy-docs-banner__version-button" aria-expanded="false">
              ${currentDisplay}
            </button>
            <div id="${MENU_ID}" class="envoy-docs-banner__menu" hidden>
              <p id="${HELP_ID}" class="envoy-docs-banner__help">Type to filter versions, ↑/↓ + Enter to navigate, Esc to close. Shortcut: Shift+V.</p>
              <p id="${QUERY_ID}" class="envoy-docs-banner__query" hidden>Filter: <span></span></p>
              <ul id="${LIST_ID}" class="envoy-docs-banner__list" role="listbox" aria-label="Envoy documentation versions"></ul>
            </div>
          </div>
        </div>
      `;

      const navRoot = banner.querySelector(".envoy-docs-banner__nav ul");
      for (const link of versions.nav || []) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link.url;
        a.textContent = link.text;
        if (isNavLinkActive(link)) {
          a.classList.add("is-active");
          a.setAttribute("aria-current", "page");
        }
        li.appendChild(a);
        navRoot.appendChild(li);
      }

      const versionButton = banner.querySelector(".envoy-docs-banner__version-button");
      const menu = banner.querySelector(".envoy-docs-banner__menu");
      const list = banner.querySelector(".envoy-docs-banner__list");
      const queryWrap = banner.querySelector(".envoy-docs-banner__query");
      const queryValue = queryWrap.querySelector("span");
      versionButton.setAttribute("aria-controls", MENU_ID);
      versionButton.setAttribute("aria-haspopup", "listbox");
      list.setAttribute("aria-describedby", `${HELP_ID} ${QUERY_ID}`);

      let isOpen = false;
      let filterText = "";
      let activeIndex = 0;
      let clearFilterTimer = null;

      const renderList = () => {
        const visible = options.filter((option) => {
          if (!filterText) {
            return true;
          }
          return option.version.includes(filterText);
        });
        if (!visible.length) {
          activeIndex = 0;
        } else if (activeIndex >= visible.length) {
          activeIndex = visible.length - 1;
        }

        list.innerHTML = "";
        visible.forEach((option, index) => {
          const item = document.createElement("li");
          item.role = "none";
          item.dataset.version = option.version;

          const optionLink = document.createElement("a");
          optionLink.href = buildVersionLink(option.version);
          optionLink.role = "option";
          optionLink.className = "envoy-docs-banner__item";
          optionLink.id = `envoy-docs-banner-option-${option.version.replaceAll(".", "-")}`;
          optionLink.tabIndex = index === activeIndex ? 0 : -1;
          if (index === activeIndex) {
            optionLink.classList.add("is-active");
          }
          optionLink.setAttribute("aria-selected", index === activeIndex ? "true" : "false");
          if (normalizeVersion(option.version) === currentVersion) {
            optionLink.classList.add("is-current");
            optionLink.setAttribute("aria-current", "page");
          }

          const label = document.createElement("span");
          label.textContent = option.version === "latest"
            ? "Latest (development)"
            : `v${option.version}`;

          const meta = document.createElement("span");
          meta.className = "envoy-docs-banner__item-meta";
          meta.textContent = option.state === "stable"
            ? "stable"
            : option.state === "archived"
            ? "archived"
            : "dev";

          optionLink.appendChild(label);
          optionLink.appendChild(meta);
          optionLink.addEventListener("click", (event) => {
            if (
              event instanceof MouseEvent &&
              (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            ) {
              return;
            }
            closeMenu({ restoreFocus: false });
          });
          item.appendChild(optionLink);
          list.appendChild(item);
        });

        const active = list.querySelector(".envoy-docs-banner__item.is-active");
        if (active?.id) {
          list.setAttribute("aria-activedescendant", active.id);
        } else {
          list.removeAttribute("aria-activedescendant");
        }

        queryWrap.hidden = !filterText;
        queryValue.textContent = filterText;
      };

      const closeMenu = ({ restoreFocus = true } = {}) => {
        isOpen = false;
        filterText = "";
        activeIndex = 0;
        if (clearFilterTimer) {
          clearTimeout(clearFilterTimer);
          clearFilterTimer = null;
        }
        versionButton.setAttribute("aria-expanded", "false");
        menu.hidden = true;
        renderList();
        if (restoreFocus) {
          versionButton.focus();
        }
      };

      const focusActiveOption = () => {
        const active = list.querySelector(".envoy-docs-banner__item.is-active");
        active?.focus();
      };

      const openMenu = () => {
        isOpen = true;
        versionButton.setAttribute("aria-expanded", "true");
        menu.hidden = false;
        renderList();
        focusActiveOption();
      };

      versionButton.addEventListener("click", () => {
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      }, { signal: controller.signal });

      document.addEventListener("click", (event) => {
        if (!isOpen) {
          return;
        }
        if (event.target instanceof Node && !banner.contains(event.target)) {
          closeMenu({ restoreFocus: false });
        }
      }, { signal: controller.signal });

      document.addEventListener("keydown", (event) => {
        if (
          !isOpen &&
          event.key.toLowerCase() === OPEN_SHORTCUT.toLowerCase() &&
          event.shiftKey &&
          !isEditableTarget(event.target)
        ) {
          event.preventDefault();
          openMenu();
          return;
        }

        if (!isOpen) {
          return;
        }

        if (event.key === "Escape") {
          event.preventDefault();
          closeMenu();
          return;
        }

        const visible = options.filter((option) => !filterText || option.version.includes(filterText));

        if (event.key === "ArrowDown") {
          event.preventDefault();
          activeIndex = visible.length ? (activeIndex + 1) % visible.length : 0;
          renderList();
          focusActiveOption();
          return;
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          activeIndex = visible.length
            ? (activeIndex - 1 + visible.length) % visible.length
            : 0;
          renderList();
          focusActiveOption();
          return;
        }

        if (event.key === "Enter") {
          event.preventDefault();
          const selected = visible[activeIndex];
          const selectedLink = selected
            ? document.getElementById(`envoy-docs-banner-option-${selected.version.replaceAll(".", "-")}`)
            : null;
          if (selectedLink instanceof HTMLElement) {
            selectedLink.click();
          }
          return;
        }

        if (event.key === "Backspace") {
          event.preventDefault();
          filterText = filterText.slice(0, -1);
          activeIndex = 0;
          renderList();
          focusActiveOption();
          return;
        }

        const filterKey = event.key.toLowerCase();
        if (
          !event.shiftKey &&
          !event.altKey &&
          !event.ctrlKey &&
          !event.metaKey &&
          /^[0-9.v]$/.test(filterKey)
        ) {
          event.preventDefault();
          filterText += filterKey.replace(/^v$/, "");
          activeIndex = 0;
          renderList();
          focusActiveOption();
          if (clearFilterTimer) {
            clearTimeout(clearFilterTimer);
          }
          clearFilterTimer = setTimeout(() => {
            filterText = "";
            activeIndex = 0;
            renderList();
          }, 1000);
        }
      }, { signal: controller.signal });

      document.querySelector(".envoy-docs-banner")?.remove();
      document.body.classList.add("envoy-has-site-banner");
      const hasTopbarShell = document.querySelector(".envoy-doc-topbar") !== null;
      document.body.classList.toggle("envoy-shell-topbar", hasTopbarShell);
      document.body.classList.toggle("envoy-shell-rtd", !hasTopbarShell);
      const mountPoint = document.getElementById("envoy-docs-banner") || banner;
      if (mountPoint === banner) {
        document.body.prepend(banner);
      } else {
        mountPoint.replaceWith(banner);
      }
      renderList();
    })
    .catch(() => {});
})();
