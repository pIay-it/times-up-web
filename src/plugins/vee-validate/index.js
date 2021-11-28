import { Form, Field } from "vee-validate";

export function setupVeeValidate(app) {
    app.component("VForm", Form);
    app.component("VField", Field);
}