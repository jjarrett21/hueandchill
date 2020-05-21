import * as vscode from "vscode";

import { CONTEXT_BRIDGE_IS_REGISTERED, registerBridge } from "./hue/bridge";
import { registerNewLights, turnAllLightsState } from "./hue/lights";
import { setDefaultGroupState } from "./hue/light-group";
import { adapt, setAmbientLights, setDefaultGroup } from "./hue/ambient-lights";
import { getHueConfiguration } from "./hue/hue-config";

const setContext = () => {
  const hueConfig = getHueConfiguration();
  if (!hueConfig.bridge.isRegistered()) {
    vscode.commands.executeCommand(
      "setContext",
      CONTEXT_BRIDGE_IS_REGISTERED,
      false
    );
    return;
  }
  vscode.commands.executeCommand(
    "setContext",
    CONTEXT_BRIDGE_IS_REGISTERED,
    true
  );
  return;
};

export function activate(context: vscode.ExtensionContext) {
  //set context upon activation
  setContext();

  const bridgeConfigurationChangeListener = vscode.workspace.onDidChangeConfiguration(
    () => {
      setContext();
    }
  );
  context.subscriptions.push(bridgeConfigurationChangeListener);

  console.log('Congratulations, your extension "hueandchill" is now active!');

  let disposable = vscode.commands.registerCommand(
    "extension.hueandchill",
    () => {
      vscode.window.showInformationMessage("Hello Hue!");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
