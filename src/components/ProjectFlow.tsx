import { useState } from "react";
import type { FeaturedProject } from "../content";
import { FlowDiagram, type FlowNode } from "./FlowDiagram";

interface ProjectFlowProps {
  flow: FeaturedProject["flow"];
}

/** A project's data flow: stages to select, the system they live in, and the tasks that run them. */
export function ProjectFlow({ flow }: ProjectFlowProps) {
  const [selectedId, setSelectedId] = useState(flow.stages[0].id);
  const selected = flow.stages.find((stage) => stage.id === selectedId) ?? flow.stages[0];

  const nodes: FlowNode[] = flow.stages.map((stage) => ({
    id: stage.id,
    name: stage.name,
    label: stage.label,
    tone: stage.tone,
    aside: stage.task,
  }));

  return (
    <FlowDiagram
      label="Data flow stages"
      nodes={nodes}
      selectedId={selectedId}
      onSelect={setSelectedId}
      groups={flow.groups}
      tasks={flow.tasks}
      tasksCaption={flow.tasksCaption}
    >
      <div className="flow-detail-columns">
        <div>
          <h4 className="flow-detail-name">{selected.name}</h4>
          <p>{selected.what}</p>
        </div>
        <div>
          <p>
            <span className="flow-detail-label">Run by</span>
            {selected.task ? (
              <>
                Airflow task <code>{selected.task}</code>
              </>
            ) : (
              selected.runNote
            )}
          </p>
          <p className="flow-detail-line">
            <span className="flow-detail-label">Built with</span> {selected.tools.join(", ")}
          </p>
        </div>
      </div>
    </FlowDiagram>
  );
}
