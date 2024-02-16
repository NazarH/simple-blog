export default function EditInput({id, rubricStates, index, setRubricStates, rubric})
{
    return (
        <form action={`/admin/rubrics/edit/${id}`} method="POST">
            <input type="hidden"
                   name="_token"
                   defaultValue={window.csrfToken}
            />
            <input id={`rubricName${id}`}
                   className="disabled background"
                   type="text"
                   value={rubricStates[index].name}
                   placeholder={rubricStates[index].name}
                   name="name"
                   disabled={!rubricStates[index].isEditing}
                   onChange={(e) => {
                       const newName = e.target.value;
                       setRubricStates(prevStates => prevStates.map(rubricState => {
                           if (rubricState.id === rubric.id) {
                               return {...rubricState, name: newName};
                           }
                           return rubricState;
                       }));
                   }}
            />
            <button id={`saveTagChanges${id}`} className="hidden">
            </button>
        </form>
    );
}
