var formErrorMessage = {
  props: ["msg", "succes"],
  template: `
    <div> 
      <div v-if="msg && !succes" style="background-color: #e74c3c;color:white;"class="alert shadow-sm  mt-4 "><slot /> <a @click="$emit('close')" style="float:right; cursor: pointer ; ">&times;</a>  </div>
      <div v-if="msg && succes " style="background-color: #1abc9c;color:white;"class="alert shadow-sm  mt-4 "><slot /> <a @click="$emit('close')" style="float:right; cursor: pointer ; ">&times;</a>  </div>
    </div>
      `,
};
export default formErrorMessage;