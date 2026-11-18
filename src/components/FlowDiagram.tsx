import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";
import "./FlowDiagram.css";

export type FlowStatus = "queued" | "running" | "success";
export type FlowTone = "bronze" | "silver" | "gold";

export interface FlowNode {
  id: string;
  /** Name shown on the node. */
  name: string;
  /** Small second line under the name. */
  label: string;
  /** Colours the node as a medallion layer. */
  tone?: FlowTone;
  /** Hangs this node under the previous one as a side branch. */
  branch?: boolean;
  /** Extra note shown on narrow screens, where the task row is hidden. */
  aside?: string;
}

/** A bar that stretches across one or more nodes, such as a group or a task. */
export interface FlowSpan {
  id: string;
  label: string;
  caption?: string;
  /** Ids of the first and last node the bar covers. */
  from: string;
  to: string;
}

interface FlowDiagramProps {
  /** Accessible name for the list of nodes. */
  label: string;
  nodes: FlowNode[];
  selectedId: string;
  onSelect: (id: string) => void;
  /** When given, each node shows a queued, running or done marker. */
  statuses?: Record<string, FlowStatus>;
  /** Brackets drawn above the nodes they contain. */
  groups?: FlowSpan[];
  /** Bars drawn below the nodes they run. */
  tasks?: FlowSpan[];
  tasksCaption?: string;
  /** Show node labels in the code font (for task ids). */
  codeLabels?: boolean;
  /** Detail panel for the selected node. */
  children: ReactNode;
}

const statusText: Record<FlowStatus, string> = {
  queued: "Queued",
  running: "Running",
  success: "Done",
};

/**
 * A flow of selectable nodes with a detail panel. It adapts to the width it is
 * given: left to right when there is room, otherwise stacked along a vertical rail.
 */
export function FlowDiagram({
  label,
  nodes,
  selectedId,
  onSelect,
  statuses,
  groups,
  tasks,
  tasksCaption,
  codeLabels = false,
  children,
}: FlowDiagramProps) {
  // Main-path nodes take the next column; a branch node sits under the previous one.
  let column = 0;
  const placed = nodes.map((node, index) => {
    if (!node.branch) column += 1;
    return { ...node, column, row: node.branch ? 2 : 1, order: index + 1 };
  });
  const columnOf = new Map(placed.map((node) => [node.id, node.column]));
  const orderOf = new Map(placed.map((node) => [node.id, node.order]));

  const spanStyle = (span: FlowSpan) =>
    ({
      "--from": columnOf.get(span.from) ?? 1,
      "--to": (columnOf.get(span.to) ?? 1) + 1,
    }) as CSSProperties;

  return (
    <div className="flow-container">
      <div className="flow-layout">
        <div className="flow" data-dense={column > 5} style={{ "--cols": column } as CSSProperties}>
          {groups && (
            <ul className="flow-spans flow-groups" aria-hidden="true">
              {groups.map((group) => (
                <li key={group.id} style={spanStyle(group)}>
                  {group.label}
                </li>
              ))}
            </ul>
          )}

          <ol className="flow-nodes" aria-label={label} data-has-groups={Boolean(groups?.length)}>
            {/* When the nodes are stacked, each group becomes a bracket down the side. */}
            {groups?.map((group) => (
              <li
                key={group.id}
                className="flow-group-rail"
                aria-hidden="true"
                style={
                  {
                    "--from-order": orderOf.get(group.from) ?? 1,
                    "--to-order": orderOf.get(group.to) ?? 1,
                  } as CSSProperties
                }
              >
                <span>{group.label}</span>
              </li>
            ))}
            {placed.map((node) => {
              const status = statuses?.[node.id];
              return (
                <li
                  key={node.id}
                  className="flow-item"
                  data-first={node.column === 1 && !node.branch}
                  data-branch={node.branch ?? false}
                  data-status={status}
                  data-tone={node.tone}
                  style={{ "--col": node.column, "--row": node.row, "--order": node.order } as CSSProperties}
                >
                  <button
                    type="button"
                    className="node"
                    data-marker={status ? "status" : "plain"}
                    aria-pressed={selectedId === node.id}
                    onClick={() => onSelect(node.id)}
                  >
                    {status && (
                      <span className="node-status" aria-hidden="true">
                        {status === "success" && <Icon name="check" size={12} />}
                      </span>
                    )}
                    <span className="node-name">{node.name}</span>
                    <span className="node-label" data-code={codeLabels}>
                      {node.label}
                    </span>
                    {node.aside && <span className="node-aside">{node.aside}</span>}
                    {status && <span className="visually-hidden">, {statusText[status]}</span>}
                  </button>
                </li>
              );
            })}
          </ol>

          {tasks && (
            <div className="flow-tasks-block">
              {tasksCaption && <p className="flow-tasks-caption">{tasksCaption}</p>}
              <ol className="flow-spans flow-tasks">
                {tasks.map((task) => (
                  <li key={task.id} style={spanStyle(task)}>
                    <span className="flow-task-id">{task.label}</span>
                    {task.caption && <span className="flow-task-caption">{task.caption}</span>}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div className="flow-detail" aria-live="polite">
          {children}
        </div>
      </div>
    </div>
  );
}
