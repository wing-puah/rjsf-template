import React from "react";

import Form, { ObjectFieldTemplateProps } from "@rjsf/core";

/**
 * This is the main template that renders the various components
 */
export function GroupedTemplate(props: ObjectFieldTemplateProps) {
  const {
    TitleField,
    DescriptionField,
    formContext,
    required,
    uiSchema,
    title,
    idSchema,
    description,
    properties
  } = props;

  return (
    <div className="form__grouped">
      {(uiSchema["ui:title"] || title) && (
        <TitleField
          id={`${idSchema.$id}__title`}
          title={title || uiSchema["ui:title"]}
          required={required}
          // formContext={formContext}
        />
      )}
      {description && (
        <DescriptionField
          id={`${idSchema.$id}__description`}
          description={description}
          // formContext={formContext}
        />
      )}
      {doGrouping({
        properties: properties,
        groups: uiSchema["ui:groups"],
        props,
        formContext
      })}
    </div>
  );
}

//  Partial<
//   Pick<ObjectFieldTemplateProps, "properties" | "formContext">
// > &
type GroupedFormProps = {
  properties: ObjectFieldTemplateProps["properties"];
  props: ObjectFieldTemplateProps;
  groups: unknown;
  formContext?: ObjectFieldTemplateProps["formContext"];
};

const REST = Symbol("REST");
const EXTRANEOUS = Symbol("EXTRANEOUS");
function doGrouping({
  properties,
  groups,
  props,
  formContext
}: GroupedFormProps) {
  if (!Array.isArray(groups)) {
    return properties.map((p: any) => p.content);
  }
  const mapped = groups.map((g, idx) => {
    if (typeof g === "string") {
      const found = properties.filter((p) => p.name === g);
      if (found.length === 1) {
        const el = found[0];
        return el.content;
      }
      return EXTRANEOUS;
    }

    let groupKey = ``;
    if (typeof g === "object") {
      const { templates } = props.formContext;
      const GroupComponent = templates
        ? templates[g["ui:template"]]
        : DefaultTemplate;
      const additionalProps = g["ui:props"] || {};

      const _properties = Object.keys(g).reduce((acc: any, key) => {
        const field = g[key];
        if (key.startsWith("ui:")) return acc;
        if (!Array.isArray(field)) return acc;
        groupKey += `${key}`;
        return [
          ...acc,
          {
            name: key,
            children: doGrouping({
              properties,
              props,
              groups: field
            })
          }
        ];
      }, []);

      return (
        <GroupComponent
          key={`${groupKey}-${idx}`}
          properties={_properties}
          formContext={formContext}
          {...additionalProps}
        />
      );
    }
    throw new Error("Invalid object type: " + typeof g + " " + g);
  });
  // const remainder = mapped.filter((m) => m === REST);
  // if (remainder.length > 0) {
  //   throw new Error("Remainder fields not supported");
  // }
  const extraneous = mapped.filter((m) => m === EXTRANEOUS);
  if (extraneous.length) {
    throw new Error("Extranoues fields" + extraneous);
  }

  return mapped;
}

type GroupedComponentProps = {
  properties: any[];
};
function DefaultTemplate(props: GroupedComponentProps) {
  return props.properties.map((p) => p.children);
}
