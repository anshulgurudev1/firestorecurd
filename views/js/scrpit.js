const addModel=document.querySelector('.add-model');
const tableuser=document.querySelector('.table-users')
const btnAdd=document.querySelector('.btn-add');
const addModelForm=document.querySelector('.add-model .form')
const modelWrapper=document.querySelector('.model-wrapper')
const renderUser=doc=>{
    const tr=`
    <tr data-id='${doc.id}'>
                      <td>${doc.data().firstname}</td>
                      <td>${doc.data().lastname}</td>
                      <td>${doc.data().phone} </td>
                      <td>${doc.data().email} </td>
                      <td>
                          <button class="btn btn-delete">Delete</button>
                      </td>
                  </tr>
    `;
    tableuser.insertAdjacentHTML('beforeend',tr)
    const btnDelete=document.querySelector(`[data-id='${doc.id}'] .btn-delete`)
    btnDelete.addEventListener('click',()=>{
        db.collection('users').doc(`${doc.id}`).delete().then(()=>{
            console.log('document deleted sucessfully');
        }).catch(err=>{
            console.log(err)
        })
    })
}
btnAdd.addEventListener('click',()=>{
    addModel.classList.add('model-show');
  
});
window.addEventListener('click',e=>{
    if(e.target===addModel){
        addModel.classList.remove('model-show')
    }
})
                                     db.collection('users').get().then(querySnapshot=>{
                                         querySnapshot.forEach(doc => {
                                         renderUser(doc);
                                         });
                                     })
db.collection('users').onSnapshot(sanpshot=>{
    sanpshot.docChanges().forEach(change => {
        if(change.type==='added'){
            renderUser(change.doc);
        }
        if(change.type==='removed'){
            let tr=document.querySelector(`[data-id='${change.doc.id}']`)
            let tbody=tr.parentElement;
            tableuser.removeChild(tbody)
        }
    });
})                                    
addModelForm.addEventListener('submit',e=>{
   e.preventDefault();
   db.collection('users').add({
       email:addModelForm.email.value,
       firstname:addModelForm.firstname.value,
       lastname:addModelForm.lastname.value,
       phone:addModelForm.phone.value

   })
   modelWrapper.classList.remove('model-show')
})
