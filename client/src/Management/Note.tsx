import React, {useState, useContext} from "react";
import "./ManageScss/Content.scss";
import ThemeContext from "./MyContext";
import axios from "axios";
export default function Note() {
  const obj = useContext(ThemeContext);
  //分页
  const [NoteNum, setNoteNum] = useState<any>(1);
  function changeNum(e: any) {
    if (e.target.innerHTML == "+") {
      setNoteNum(NoteNum + 1);
    } else if (e.target.innerHTML == "-") {
      setNoteNum(NoteNum - 1);
    }
  }
  //关键词搜索
  const [NoteKw, setNoteKw] = useState<any>("");
  function serchMenu(e: any) {
    setNoteKw(e.target.value);
  }
  const [NoteList, setNoteList] = useState<any>([]);
  function getAllNote() {
    axios
      .get("/getAllNotes", {
        params: {
          num: NoteNum,
          kw: NoteKw,
        },
      })
      .then((res: any) => {
        console.log(res.data.data);
        setNoteList(res.data.data);
      });
  }
  React.useEffect(getAllNote, [NoteNum, NoteKw]);
  function showNote() {
    if (NoteList != null) {
      return NoteList.map(function (list: any) {
        return (
          <tr key={list.id}>
            <td>{list.id}</td>
            <td>{list.username}</td>
            <td>{list.title}</td>
            <td>
              <button type="button" data-id={list.id}>
                删除
              </button>
              <br />
            </td>
          </tr>
        );
      });
    }
  }
  //删除
  function delNote(e: any) {
    if (e.target.innerHTML == "删除") {
      let id = e.target.getAttribute("data-id");
      axios
        .get("/delNotes", {
          params: {id: id},
        })
        .then((res: any) => {
          getAllNote();
        });
    }
  }
  return (
    <div
      className="manage_usercontent"
      style={{display: obj.who == "笔记" ? "block" : "none"}}
    >
      <div className="manage_serch">
        搜索：
        <input type="text" onChange={serchMenu} />
      </div>

      <table>
        <thead>
          <tr className="title">
            <td>笔记id</td>
            <td>笔记所属</td>
            <td>笔记名字</td>
            <td>信息管理</td>
          </tr>
        </thead>

        <tbody onClick={delNote}>{showNote()}</tbody>

        <tfoot onClick={changeNum}>
          <tr>
            <td>
              <button>-</button>
              <span>{NoteNum}</span>
              <button>+</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
