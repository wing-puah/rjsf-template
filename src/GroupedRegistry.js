import React from "react";
import { Tabs, Tab, Table, Well } from "react-bootstrap";

export const GroupTemplates = {
  hideshow: (props) => (
    <div style={{ background: "grey" }}>
      Hide/show{props.properties.map((p) => p.children)}
    </div>
  ),
  grid: (props) => {
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
  table: (props) => (
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
  well: (props) => props.properties.map((p) => <Well>{p.children}</Well>),
  tabs: (props) => {
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
