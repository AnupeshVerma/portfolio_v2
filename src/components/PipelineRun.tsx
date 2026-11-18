import { useCallback, useEffect, useRef, useState } from "react";
import { pipeline, type Stage, type StageId } from "../content";
import { FlowDiagram, type FlowNode, type FlowStatus } from "./FlowDiagram";
import { Icon } from "./Icon";
import "./PipelineRun.css";

/** Order of the main path. `file_monitor` runs alongside, right after the first stage. */
const MAIN_PATH: StageId[] = ["inbound_files", "pre_etl", "orchestrate", "process", "reconcile"];
const BRANCH: StageId = "file_monitor";

const START_DELAY = 500;
const STEP = 650;

const stageById = new Map<StageId, Stage>(pipeline.stages.map((stage) => [stage.id, stage]));

const nodes: FlowNode[] = pipeline.stages.map((stage) => ({
  id: stage.id,
  name: stage.name,
  label: stage.id,
  branch: stage.id === BRANCH,
}));

const allWith = (status: FlowStatus) =>
  Object.fromEntries(pipeline.stages.map((stage) => [stage.id, status])) as Record<StageId, FlowStatus>;

/**
 * The pipeline drawn as a task graph. On load it plays one run from left to
 * right; after that it is a plain selector for the detail panel underneath.
 */
export function PipelineRun() {
  const [statuses, setStatuses] = useState<Record<StageId, FlowStatus>>(() => allWith("queued"));
  const [selectedId, setSelectedId] = useState<StageId>("inbound_files");
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const run = useCallback(() => {
    clearTimers();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setStatuses(allWith("success"));
      return;
    }

    setStatuses(allWith("queued"));

    const set = (id: StageId, status: FlowStatus, at: number) => {
      timers.current.push(
        window.setTimeout(() => setStatuses((previous) => ({ ...previous, [id]: status })), at),
      );
    };

    MAIN_PATH.forEach((id, index) => {
      set(id, "running", START_DELAY + index * STEP);
      set(id, "success", START_DELAY + (index + 1) * STEP);
    });
    // The monitoring branch starts once the first stage has finished.
    set(BRANCH, "running", START_DELAY + STEP);
    set(BRANCH, "success", START_DELAY + STEP * 2.5);
  }, [clearTimers]);

  useEffect(() => {
    run();
    return clearTimers;
  }, [run, clearTimers]);

  const selected = stageById.get(selectedId)!;
  const doneCount = pipeline.stages.filter((stage) => statuses[stage.id] === "success").length;
  const finished = doneCount === pipeline.stages.length;

  return (
    <section className="pipeline" aria-labelledby="pipeline-title">
      <div className="pipeline-head">
        <div>
          <h2 id="pipeline-title" className="pipeline-title">
            {pipeline.title}
          </h2>
          <p className="pipeline-description">{pipeline.description}</p>
        </div>
        <div className="pipeline-run-state">
          <p className="pipeline-progress" data-finished={finished}>
            <span className="pipeline-progress-dot" aria-hidden="true" />
            {finished ? "Run complete" : `${doneCount} of ${pipeline.stages.length} stages done`}
          </p>
          <button type="button" className="pipeline-replay" onClick={run} disabled={!finished}>
            <Icon name="replay" size={16} />
            Run again
          </button>
        </div>
      </div>

      <FlowDiagram
        label="Pipeline stages"
        nodes={nodes}
        statuses={statuses}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId(id as StageId)}
        codeLabels
      >
        <div className="flow-detail-columns">
          <div>
            <h3 className="flow-detail-name">{selected.name}</h3>
            <p>{selected.what}</p>
          </div>
          <div>
            <h4 className="flow-detail-label">What I did</h4>
            <p className="flow-detail-strong">{selected.myPart}</p>
            <p className="flow-detail-line">
              <span className="flow-detail-label">Tools</span> {selected.tools.join(", ")}
            </p>
          </div>
        </div>
      </FlowDiagram>
    </section>
  );
}
