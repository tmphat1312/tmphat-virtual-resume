import type { Placement } from "@floating-ui/dom";

type UpdateTooltipOptions = {
  element: HTMLElement;
  tooltip: HTMLElement;
  placement: Placement;
};

const targetEls = Array.from(
  document.querySelectorAll("[data-tooltip]"),
) as HTMLElement[];

if (targetEls.length > 0) {
  Promise.all([import("@floating-ui/dom"), import("nanoid")]).then(
    ([floatingUi, { nanoid }]) => {
      const { autoUpdate, computePosition, flip, offset, shift } = floatingUi;

      creteTooltipsForElements(targetEls).forEach(({ element, tooltip }) => {
        const placement = (element.dataset.tooltipPlacement ??
          "top") as Placement;
        const updateFn = updateTooltip({ element, tooltip, placement });

        autoUpdate(element, tooltip, updateFn);
        addListeners(element, tooltip, updateFn);
      });

      function creteTooltipsForElements(elements: HTMLElement[]) {
        const tooltipsContainer = document.createElement("div");

        const tooltips = elements.map((element) => {
          const tooltip = createTooltip(element.dataset.tooltip ?? "Tooltip");
          element.setAttribute("aria-describedby", tooltip.id);
          tooltipsContainer.appendChild(tooltip);
          return { tooltip, element };
        });

        document.body.appendChild(tooltipsContainer);

        return tooltips;
      }

      function createTooltip(content: string) {
        const tooltip = document.createElement("div");

        tooltip.innerText = content;
        tooltip.setAttribute("id", `tooltip-${nanoid(8)}`);
        tooltip.setAttribute(
          "class",
          "absolute top-0 left-0 hidden w-max px-2.5 py-1 rounded-md bg-gray-700 text-gray-50 dark:bg-gray-50 dark:text-gray-700",
        );
        tooltip.setAttribute("role", "tooltip");

        return tooltip;
      }

      function updateTooltip({
        element,
        tooltip,
        placement,
      }: UpdateTooltipOptions) {
        return () => {
          computePosition(element, tooltip, {
            placement,
            middleware: [offset(8), flip(), shift({ padding: 8 })],
          }).then(({ x, y }) => {
            Object.assign(tooltip.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          });
        };
      }

      function addListeners(
        element: HTMLElement,
        tooltip: HTMLElement,
        updateFn: () => void,
      ) {
        const events = [
          ["mouseenter", showTooltip],
          ["mouseleave", hideTooltip],
          ["focus", showTooltip],
          ["blur", hideTooltip],
        ] as const;

        events.forEach(([event, listener]) => {
          element.addEventListener(event, listener);
        });

        function showTooltip() {
          tooltip.style.display = "block";
          updateFn();
        }

        function hideTooltip() {
          tooltip.style.display = "";
        }
      }
    },
  );
}
