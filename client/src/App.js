import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  notification,
} from "antd";
import moment from "moment";
import { MedicationsOption, TreamentsOption } from "./enum";

const App = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await fetch("http://localhost:5000/api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          date_of_treatment: moment
            .utc(values.date_of_treatment)
            .toDate()
            .toISOString(),
        }),
      });

      form.resetFields();

      notification.success({
        message: "Successfully",
        description: "Success add patient data",
        placement: "topRight",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: `Error add patient data ${error}`,
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        margin: "0 auto",
      }}
    >
      <Form
        disabled={loading}
        style={{ width: "100%" }}
        layout="vertical"
        form={form}
        initialValues={{
          patient_name: "",
          patient_id: null,
          date_of_treatment: "",
          treatments: [],
          medications: [],
          cost: null,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          rules={[{ required: true, message: "Please input patient name" }]}
          name="patient_name"
          label="Patient Name"
        >
          <Input placeholder="Input patient name" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input patient id" }]}
          name="patient_id"
          label="Patient ID"
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Input patient id"
          />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true, message: "Please select date of treatment" },
          ]}
          name="date_of_treatment"
          label="Date of Treatment"
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please select treatments" }]}
          name="treatments"
          label="Treatment Description"
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            options={TreamentsOption}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please select medications" }]}
          name="medications"
          label="Medications Prescribed"
        >
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            options={MedicationsOption}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please input cost" }]}
          name="cost"
          label="Cost of Treatment"
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ marginTop: "20px" }}
            block
            htmlType="submit"
            type="primary"
            disabled={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App;
