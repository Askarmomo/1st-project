
import JustValidate from "just-validate";

const formEL = document.getElementById("form")

const validateForm = new JustValidate(formEL, {
    validateBeforeSubmitting: true,
});


validateForm.addField("#name-input", [

    { rule: "required" },
    { rule: "minLength", value: 3 },
    { rule: 'maxLength', value: 15, },
],
    {
        errorLabelCssClass: ["form-error"],
    }
)
validateForm.addField("#number-input", [
    { rule: "required" },
    { rule: "number" },
    { rule: "minLength", value: 10 },
    { rule: "maxLength", value: 10 },

],
    {
        errorLabelCssClass: ["form-error"],
    }
)
validateForm.addField("#date-input", [
    { rule: "required" },
],
    {
        errorLabelCssClass: ["form-error"],
    }
);

validateForm.onSuccess(() => {
    // getting form ellement
    const formData = new FormData(formEL);
    // convering formData in to  objectvalue

    const formValueObj = Object.fromEntries(formData.entries())

    const object = []

    object.push(formValueObj)

    localStorage.setItem("corierData", JSON.stringify(object))
    const resultobj = localStorage.getItem("corierData")
    console.log(resultobj.replace());

})

