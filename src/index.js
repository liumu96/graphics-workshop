import REGL from "regl";
import { Pane } from "tweakpane";

import gengarUrl from "../models/gengar.obj.json?url";
import knotUrl from "../models/knot.obj.json?url";
import sphereUrl from "../models/sphere.obj.json?url";
import suzanneUrl from "../models/suzanne.obj.json?url";
import teapotUrl from "../models/teapot.obj.json?url";

const regl = REGL({
  extensions: ["OES_standard_derivatives"],
});

// todo camera
// const camera =

const params = initPane();
let mesh = null;

function initPane() {
  // todo
  const pane = new Pane({ title: "Controls" });
  const params = {
    project: "quilt",
    seed: 0,
    scale: 20,
    mesh: teapotUrl,
    fps: 0,
    kd: { r: 95, g: 230, b: 213 },
    ks: { r: 240, g: 240, b: 240 },
    shininess: 5.0,
    background: { r: 120, g: 178, b: 255 },
    antialias: true,
  };

  pane.addInput(params, "project", {
    options: {
      "Quilt patterns": "quilt",
      "Procedural landscapes": "landscape",
      "Rasterization and shading": "shading",
      "Stylized rendering": "contours",
      "Ray tracing": "raytracing",
    },
  });

  const inputs = [
    [pane.addInput(params, "seed", { min: 0, max: 1 }), ["quilt", "landscape"]],
    [pane.addInput(params, "scale", { min: 0, max: 30 }), ["landscape"]],
    [
      pane
        .addInput(params, "mesh", {
          options: {
            Gengar: gengarUrl,
            Knot: knotUrl,
            Sphere: sphereUrl,
            Suzanne: suzanneUrl,
            Teapot: teapotUrl,
          },
        })
        .on("change", (event) => updateMesh(event.value)),
      ["shading", "contours"],
    ],
    [pane.addInput(params, "kd"), ["shading", "contours"]],
    [pane.addInput(params, "ks"), ["shading", "contours"]],
    [
      pane.addInput(params, "shininess", { min: 1, max: 9 }),
      ["shading", "contours"],
    ],
    [pane.addInput(params, "background"), ["raytracing"]],
    [pane.addInput(params, "antialias"), ["raytracing"]],
  ];

  pane.addMonitor(params, "fps");

  const saved = localStorage.getItem("graphics-workshop");
  if (saved) {
    try {
      pane.importPreset(JSON.parse(saved));
    } catch (error) {
      console.warn(`Error loading saved preset: ${error}`);
    }
  }

  const update = () => {
    const data = pane.exportPreset();
    localStorage.setItem("graphics-workshop", JSON.stringify(data));
    for (const [input, projects] of inputs) {
      console.log(projects, "projects");
      input.hidden = !projects.includes(params.project);
    }
  };

  update();
  pane.on("change", update);
  return params;
}

async function updateMesh(path) {
  // todo
}

console.log("test");
