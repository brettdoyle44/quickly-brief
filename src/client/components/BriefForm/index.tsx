import { Model, StylesManager } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/modern.min.css";

const surveyJson = {
  elements: [
    {
      name: "FirstName",
      title: "Enter your first name:",
      type: "text",
    },
    {
      name: "LastName",
      title: "Enter your last name:",
      type: "text",
    },
  ],
};

function onValueChanged(_: any, options: { value: string }) {
  console.log("New value: " + options.value);
}

StylesManager.applyTheme("defaultV2");

function onComplete(survey: { data: any }) {
  console.log("Survey complete! Results: " + JSON.stringify(survey.data));
}

export default function BriefForm() {
  const model = new Model(surveyJson);
  return (
    <div className="container">
      <h2>SurveyJS Library / Runner</h2>
      <Survey
        model={model}
        onComplete={onComplete}
        onValueChanged={onValueChanged}
      />
    </div>
  );
}
