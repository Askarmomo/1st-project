
import JustValidate from "just-validate";

const formEL = document.getElementById("form")

const localStorageKey = "corierData"

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
    // getting all form data into (new FormData)
    const formData = new FormData(formEL);

    // convering formData in to  objectvalue
    const formValueObj = Object.fromEntries(formData.entries())

    // creating new array for existin code
    const newcorierdata = []
    newcorierdata.push(formValueObj)


    const exsistingCorierData = localStorage.getItem("corierData")
    const exisitincorierarray = JSON.parse(exsistingCorierData)

    if (exisitincorierarray) {

        exisitincorierarray.push(formValueObj)
        localStorage.setItem(localStorageKey, JSON.stringify(exisitincorierarray))

    } else {

        newcorierdata.push(formValueObj)
        localStorage.setItem(localStorageKey, JSON.stringify(newcorierdata))

    }

    alert("Sucssese")
    formEL.reset()
})


function getAllCorierData() {

    const corierData = localStorage.getItem(localStorageKey)
    const corierDataArray = JSON.parse(corierData)

    const finalaresult = corierDataArray.map((corierData) => {
        const newtr = `
        <tr>
           <td class="px-2 py-1 border">${corierData.name}</td>
           <td class="px-2 py-1 border">${corierData.date}</td>
           <td class="px-2 py-1 border">${corierData.mobile}</td>
           <td class="px-2 py-1 border"><button class="px-2 py-1 bg-red-600 text-white text-sm rounded"
           id="Delete-btn">Delete</button></td>
        </tr>
        `
        return newtr
    }).join(" ")
    const tableEl = document.getElementById("table")

    tableEl.innerHTML += finalaresult

}
getAllCorierData()