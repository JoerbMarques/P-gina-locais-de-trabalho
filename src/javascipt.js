
class Record{

  constructor(){
    this.arrayRecords = JSON.parse(sessionStorage.getItem('arrLocaisTrabalho')) || [];
    this.id = (this.arrayRecords[this.arrayRecords.length-1] != undefined) ? this.arrayRecords[this.arrayRecords.length-1].id + 1 : 1;
    this.listTable()
  }

  add(){
    let record = this.readData();

    if(this.validateField(record)) {
      this.arrayRecords.push(record);
      this.id++;
      sessionStorage.setItem('arrLocaisTrabalho', JSON.stringify(this.arrayRecords));
    }

    this.listTable();

    document.getElementById('building').value = '';
    document.getElementById('workplace').value = '';
  }

  readData(){
    let record = {}

    record.id = this.id;
    record.building = document.getElementById('building').value;
    record.workplace = document.getElementById('workplace').value;

    return record;
  }

  validateField(record){
    let msg = '';
    if(record.building == ''){
      msg += '- Selecione um Prédio \n';
    }

    if(record.workplace == ''){
      msg += '- Informe o local de trabalho \n';
    }

    if(msg != ''){
      alert(msg);
      return false;
    }

    return true;
  }

  listTable(){
    let tbody = document.getElementById("tbody");
    tbody.innerText = '';

    for(let i=0; i<this.arrayRecords.length; i++){
      let tr = tbody.insertRow();

      let td_building = tr.insertCell();
      let td_workplace = tr.insertCell();
      let td_actions = tr.insertCell();

      td_building.innerText = this.arrayRecords[i].building;
      td_workplace.innerText = this.arrayRecords[i].workplace;
      
      let imgUpdate = document.createElement('img');
      imgUpdate.src = "../assets/icons/pencil.svg";
      imgUpdate.setAttribute("onclick", "record.prepareEdition("+ JSON.stringify(this.arrayRecords[i]) +")");

      td_actions.appendChild(imgUpdate);

      let imgRemove = document.createElement('img');
      imgRemove.src = "../assets/icons/bin.svg";
      imgRemove.setAttribute("onclick", "record.remove("+ this.arrayRecords[i].id +")");

      td_actions.appendChild(imgRemove);

    }
  }

  remove(id){
    if(confirm('Deseja realmente deletar o local de trabalho?')){
      let tbody = document.getElementById("tbody");

      for(let i=0; i< this.arrayRecords.length; i++){
        if(this.arrayRecords[i].id == id) {
          this.arrayRecords.splice(i, 1);
          tbody.deleteRow(i);
        }
      }

      sessionStorage.setItem('arrLocaisTrabalho', JSON.stringify(this.arrayRecords));
    }
  }

  prepareEdition(record){
    for(let i=0; i< this.arrayRecords.length; i++){
      if(this.arrayRecords[i].id == record.id) {
        tbody.deleteRow(i);
        let tr = tbody.insertRow(i);
        let td_edit_building = tr.insertCell();
        let td_edit_workplace = tr.insertCell();
        let td_edit_actions = tr.insertCell();

        let select = document.createElement("select");
        select.id = "editBuilding";
        td_edit_building.appendChild(select);

        var array = ["Prédio 1","Prédio 2","Prédio 3"];

        for (var a = 0; a < array.length; a++) {
          var option = document.createElement("option");
          option.value = array[a];
          option.text = array[a];
          if(this.arrayRecords[i].building == array[a]){
            option.selected = "selected"
          }
          select.appendChild(option);
      }

        let input = document.createElement("input");
        input.type = "text";
        input.id = "editWorkplace";
        input.className = "inputEdit";
        input.value = this.arrayRecords[i].workplace;
        td_edit_workplace.appendChild(input);

        let imgCheck = document.createElement('img');
        imgCheck.src = "../assets/icons/v.svg";
        imgCheck.setAttribute("onclick", "record.update("+this.arrayRecords[i].id +")");
  
        td_edit_actions.appendChild(imgCheck);

        let imgX = document.createElement('img');
        imgX.src = "../assets/icons/x.svg";
        imgX.setAttribute("onclick", "record.cancel()");
  
        td_edit_actions.appendChild(imgX);
      }
    }
  }

  update(id){
    let record_updated = {}

    record_updated.building = document.getElementById('editBuilding').value;
    record_updated.workplace = document.getElementById('editWorkplace').value;
   

    for(let i=0; i< this.arrayRecords.length; i++){
      if(this.arrayRecords[i].id == id) {
        this.arrayRecords[i].building = record_updated.building;
        this.arrayRecords[i].workplace = record_updated.workplace;
      }
    }

    sessionStorage.setItem('arrLocaisTrabalho', JSON.stringify(this.arrayRecords));

    this.listTable();
  }

  cancel(){
    this.listTable();
  }

}

var record = new Record();