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
import { MedicationsOption, TreamentsOption } from "../enum";

const PatientForm = () => {
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
          treatments: values.treatments.map((val) => String(val)),
          medications: values.medications.map((val) => String(val)),
          date_of_treatment: new Date(values.date_of_treatment).toISOString(),
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
    <Form
      requiredMark={false}
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
        rules={[
          {
            required: true,
            message: "Please input patient name",
            type: "string",
          },
        ]}
        name="patient_name"
        label="Patient Name"
      >
        <Input placeholder="Input patient name" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            type: "string",
            // for alphanumeric or numeric validation
            pattern: /^[a-zA-Z0-9]*$/,
          },
        ]}
        name="patient_id"
        label="Patient ID"
      >
        <Input style={{ width: "100%" }} placeholder="Input patient id" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please select date of treatment",
            type: "date",
          },
        ]}
        name="date_of_treatment"
        label="Date of Treatment"
      >
        <DatePicker style={{ width: "100%" }} format="YYYY/MM/DD" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please select treatments",
            type: "array",
          },
        ]}
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
        rules={[
          {
            required: true,
            message: "Please select medications",
            type: "array",
          },
        ]}
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
        rules={[
          { required: true, message: "Please input cost", type: "number" },
        ]}
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
  );
};

export default PatientForm;
