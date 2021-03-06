import { Everything } from "../interfaces";
import { selectAllLogs, maybeGetTimeOffset } from "../resources/selectors";
import * as _ from "lodash";
import { LogsProps } from "./interfaces";
import {
  sourceFbosConfigValue
} from "../devices/components/source_config_value";
import { validFbosConfig } from "../util";
import { ResourceIndex } from "../resources/interfaces";
import { TaggedLog } from "farmbot";
import { getWebAppConfigValue } from "../config_storage/actions";
import { getFbosConfig } from "../resources/getters";

/** Take the specified number of logs after sorting by time created. */
export function takeSortedLogs(
  numberOfLogs: number, ri: ResourceIndex): TaggedLog[] {
  return _(selectAllLogs(ri))
    .sortBy("body.created_at")
    .reverse()
    .take(numberOfLogs)
    .value();
}

export function mapStateToProps(props: Everything): LogsProps {
  const { hardware } = props.bot;
  const fbosConfig = validFbosConfig(getFbosConfig(props.resources.index));
  return {
    dispatch: props.dispatch,
    sourceFbosConfig: sourceFbosConfigValue(fbosConfig, hardware.configuration),
    logs: takeSortedLogs(250, props.resources.index),
    timeOffset: maybeGetTimeOffset(props.resources.index),
    getConfigValue: getWebAppConfigValue(() => props),
  };

}
