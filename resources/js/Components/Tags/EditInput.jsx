export default function EditInput({id, tagStates, index, setTagStates})
{
    return (
        <form action={`/admin/tags/edit/${id}`} method="POST">
            <input type="hidden"
                   name="_token"
                   defaultValue={window.csrfToken}
            />
            <input id={`tagName${id}`}
                   className="disabled background"
                   type="text"
                   value={tagStates[index].name}
                   placeholder={tagStates[index].name}
                   name="name"
                   disabled={!tagStates[index].isEditing}
                   onChange={(e) => {
                       const newName = e.target.value;
                       setTagStates(prevStates =>
                           prevStates.map(tagState => {
                               if (tagState.id === id) {
                                   return {...tagState, name: newName};
                               }
                               return tagState;
                           }));
                   }}
            />
            <button id={`saveTagChanges${id}`} className="hidden">
            </button>
        </form>
    )
}
