import React from "react";
import Form from "Components/Form";
import { H1, Paragraph, Block, Text, Label } from "./Components/Typography";
import { Row, Columns, Column, Card } from "Components/Layout";
import Input from "Components/Input";
import Textarea from "Components/Textarea";
import Button from "Components/Button";
// import { RadioGroup } from "Components/Radio";
// import Dropdown from "Components/Dropdown";
const Tearsheet = ( ) => {
    return (
        <Form>
        <Row>
        <H1>Tearsheet</H1>
        <Columns>
            <Column className="margin-right--5">
                <Card>
                <Paragraph className="text--bold">Paragraph
                </Paragraph>
                <Paragraph>
                    <Text className="vertical-space--1 display--block">Text in paragraph</Text>
                    <Label className="vertical-space--1">Label in paragraph</Label>
                </Paragraph>
                <Block className="vertical-space--1">
                    <Input type="text" name="name" placeholder="Placeholder text inside input" 
                    className="horizontal-space--1"/> 
                    <Textarea rows="3" name="textarea">Text inside textarea</Textarea>
                </Block>
                </Card>
                <Card>
                    <Button className="margin-right--3">Cancel</Button>
                    <Button className="primary">Submit</Button>
                </Card>
            </Column>
        </Columns>
        </Row>
    </Form>);
};
export default Tearsheet;