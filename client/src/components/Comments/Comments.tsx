import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearComment, getComments, postCreateComments } from "../../redux/actions/actions-Create";
import { AppDispatch, State } from "../../redux/store/store";
import { useCreateCommentMutation } from "../../slices/app/postComment";
import { useDatesModal } from "../CreateEvent/CreateEventModal/useDatesModal";
import DatesModal from "../CreateEvent/CreateEventModal/DatesModal"
import { selectCurrentUser } from "../../slices/authentication/authSlice";

const Comments = () => {
    const allComments = useSelector((state: State) => state.global.allComments);
    const { id }: any = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch()
    const [backendComments, setBackendComment] = useState<any>({
        text: ""
    })

    const currentUser:any=useSelector(selectCurrentUser)

    const [isOpen, openModal, closeModal] = useDatesModal(false);

    const [createComment] = useCreateCommentMutation();

    const [text, setText] = useState("")

    useEffect(() => {

        dispatch(getComments(id));
        return () => {
            dispatch(clearComment())
        }
    }, [dispatch, id])

    // const onInputChange = (e:any)=>{
    //     e.preventDefault();
    //     setBackendComment({
    //         ...backendComments,
    //         [e.target.name]:e.target.value,
    //     });
    // }
    const addComment = (text: any) => {
        dispatch(postCreateComments(text))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (text) await createComment({ text: text, id: id })
        console.log("nuevio", text)
        setText("")
        dispatch(getComments(id))
    }

    const isTextAreaDisable = text.length === 0;

    return (
        <div>
            <h2>Comentarios</h2>
            {allComments?.map((el: any) => {
                return (
                    <div>
                        <p>{el.text}</p>
                        <p>{el.createdAt}</p>
                    </div>
                )
            })}
            <div>
                {currentUser &&
                <button onClick={() => openModal()}>
                    Comentario
                </button>
                }
                <DatesModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                >
                    {currentUser && 
                     <form onSubmit={handleSubmit} >
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            style={{ resize: "none" }}
                        />
                        <br></br>
                        <button disabled={isTextAreaDisable} type="submit" onClick={()=>closeModal()}>Enviar Comentario</button>
                        <br />
                        <button  onClick={()=>closeModal()}>Salir</button>
                    </form>}
                  
                </DatesModal>
            </div>
        </div>

    );
}
export default Comments;