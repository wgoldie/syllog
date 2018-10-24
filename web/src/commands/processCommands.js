import { NODE_TYPES } from "./constants";
import { arrayToObject } from "./utils";
import { getVariableCyJSON, getEdgeCyJSON } from "./graphCommands";
import {
  getFactorCyJSON,
  getFactorInputCyJSON,
  getFactorOutputCyJSON
} from "./factorCommands";
export default function buildProcessCommands(cy) {
  const exportJSONCommand = {
    content: "Export Graph JSON",
    select: function() {
      const elementsCyJSON = cy.json().elements || {};
      const exportJSON = {
        nodes: (elementsCyJSON.nodes || []).map(({ data }) => ({ data })),
        edges: (elementsCyJSON.edges || []).map(({ data }) => ({ data }))
      };
      document.getElementById("namer").value = JSON.stringify(exportJSON);
    }
  };

  const importJSONCommand = {
    content: "Import graph JSON",
    select: function() {
      cy.elements().remove();
      const json = document.getElementById("namer").value;
      const elementsCyJSON = JSON.parse(json);
      cy.json({ elements: elementsCyJSON });
    }
  };

  return { importJSONCommand, exportJSONCommand };
}
