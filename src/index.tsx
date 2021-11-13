import React from "react";
import ReactDOM from "react-dom";
import Form, {
  FieldTemplateProps,
  ObjectFieldTemplateProps,
  UiSchema,
  IChangeEvent
} from "@rjsf/core";
import { JSONSchema7 } from "json-schema";

import GroupedTemplate from "./GroupedTemplate";
import GroupTemplateRegistry from "./GroupTemplateRegistry";
import * as UiTemplate from "./UiTemplate";
import "./styles.css";

const schema: JSONSchema7 = {
  title: "Todo",
  type: "object",
  properties: {
    title: { type: "string", title: "Title", default: "A new task" },
    done: { type: "boolean", title: "Done?", default: false },
    a: { title: "This should be hidden", type: "string" },
    b: { title: "Field B", type: "string" },
    c: { title: "Field C", type: "string" },
    d: { title: "Field D", type: "string" },
    e: { title: "Field E", type: "string" },
    f: { title: "Field F", type: "string" },
    g: { title: "Field G", type: "string" },
    h: { title: "Field H", type: "string" },
    i: { title: "Field I", type: "string" },
    j: { title: "Field J", type: "string" }
  }
};

// type GroupSingleValue = string  |  {[k: string]: string | [{}]};

const groups: any[] = [
  "g",
  {
    "Important Fields": ["a", "b"],
    "Less Important": [
      "g",
      {
        "Much Less Important": ["c", "d"],
        "Only Kind of Less Important": ["e", "f"],
        "ui:template": "grid"
      }
    ],
    "ui:template": "tabs"
  },
  {
    _: ["done", "title"],
    "ui:template": "well"
  },
  {
    "Advanced Fields": ["h", "i"],
    Others: ["j"],
    "ui:template": "table"
  }
];

const uiSchema: UiSchema = {
  "ui:groups": groups,
  "ui:template": (props: ObjectFieldTemplateProps) => (
    <GroupedTemplate {...props} />
  ),
  a: { "ui:options": { label: false } },
  done: {
    "ui:template": CustomFieldTemplate
  }
};

function CustomFieldTemplate(props: FieldTemplateProps) {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    errors,
    children
  } = props;
  return (
    <div className={classNames}>
      <label htmlFor={id}>
        {label}
        {required ? "*" : null}
      </label>
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
}
const log = (event: IChangeEvent, key: "change" | "submitted" | "errors") => {
  console.log(`${key}: ${event}`);
};

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Form
    schema={schema}
    uiSchema={uiSchema}
    onChange={(e: IChangeEvent) => {
      log(e, "change");
    }}
    onSubmit={(e: IChangeEvent) => {
      log(e, "submitted");
    }}
    onError={(e: IChangeEvent) => {
      log(e, "errors");
    }}
    // transformErrors={log("transformErrors")}
    // liveValidate={true}
    formContext={{
      templates: GroupTemplateRegistry
    }}
    {...UiTemplate}
  />,
  rootElement
);
