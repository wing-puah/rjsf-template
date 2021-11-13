import React from "react";
import { Tabs, Tab, Table, Well } from "react-bootstrap";

type ElChildrenProps = React.ReactElement;
type RegistryElProps = {
  properties: { name: string; children: ElChildrenProps[] }[];
};

/**
 * Registry is used to render components that will be matched
 * with the key specify in groups
 */
const GroupTemplateRegistry = {
  hideshow: (props: RegistryElProps) => (
    <div style={{ background: "grey" }}>
      Hide/show{props.properties.map((p) => p.children)}
    </div>
  ),
  grid: (props: RegistryElProps) => {
    console.log({ props });
    return (
      <Table striped bordered condensed hover>
        <tbody>
          {props.properties.map((p) => (
            <tr>
              <td>{p.name}</td>
              {p.children.map((c) => (
                <td>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  },
  table: (props: RegistryElProps) => (
    <Table striped bordered condensed hover>
      <tbody>
        {props.properties.map((p) => (
          <tr key={p.name}>
            <th>{p.name}</th>
            <td>{p.children}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
  well: (props: RegistryElProps) =>
    props.properties.map((p) => <Well>{p.children}</Well>),
  tabs: (props: RegistryElProps) => {
    return (
      <Tabs defaultActiveKey={0} id="uncontrolled-tab-example">
        {props.properties.map((p, idx) => (
          <Tab eventKey={idx} title={p.name}>
            {p.children}
          </Tab>
        ))}
      </Tabs>
    );
  }
};

const createGroupedRegistry = (addOnRegistry = {}) => {
  return { ...GroupTemplateRegistry, ...addOnRegistry };
};

export { createGroupedRegistry };
export default GroupTemplateRegistry;
