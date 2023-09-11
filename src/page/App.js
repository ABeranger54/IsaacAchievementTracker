import '../style/App.css';
import achievementsRaw from '../data/achievements.json'
import DataTableRow from '../component/DataTableRow';
import { useState } from 'react';
import downloadImage from '../media/download.png'
import uploadImage from '../media/upload.png'

function App() {

    const ls = (localStorage.getItem("completed") === null) ? [] : localStorage.getItem("completed");
    if(ls.length === 0){
        localStorage.setItem("completed", JSON.stringify([]));
    }

    const [quality, setQuality] = useState("all");
    const [type, setType] = useState("all");
    const [boss, setBoss] = useState("all");
    const [status, setStatus] = useState("all");
    const [saveValue, setSaveValue] = useState(JSON.parse(ls));

    var achievements = achievementsRaw.map(e => { return { name: e[0], image: e[1], link: e[2], description: e[3], method: e[4], id: e[5], quality: e[6]}});

    if(quality !== "all"){
        achievements = achievements.filter(e =>{
            switch(quality){
                case "positives": return e.quality > 0;
                case "negatives": return e.quality < 0;
                default: return e.quality === quality;
            }
        })
    }
    
    var t = (type === "challenges") ? "challenge" : "as " + type;
    if(type !== "all"){
        achievements = achievements.filter(e =>{
            var desc = e.description.replace(/ +(?= )/g,'');
            var method = e.method.replace(/ +(?= )/g,'');
            return desc.toLowerCase().includes(t.toLowerCase()) || method.toLowerCase().includes(t.toLowerCase());
        })
    }

    var b = (boss === "boss rush") ? "boss rush" : "defeat " + boss;
    if(boss !== "all"){
        achievements = achievements.filter(e =>{
            var method = e.method.replace(/ +(?= )/g,'');
            return method.toLowerCase().includes(b.toLowerCase());
        })
    }

    //const save = JSON.parse(localStorage.getItem("completed"));

    if(status !== "all"){
        achievements = achievements.filter(e =>{
            const found = saveValue.find(el => e.id === el);
            return (status === "missing") ? !found : found;
        })
    }

    const bodyTable = achievements.map(e => <DataTableRow id={e.id} quality={e.quality} data={[
        e.name,
        <a href={"https://bindingofisaacrebirth.fandom.com" + e.link} target="_blank"><img src={e.image} alt={e.name} /></a>,
        e.description,
        e.method,
        e.id,
        <input type="checkbox" checked={saveValue.find(el => e.id === el)} id={"validate-" + e.id} name={"validate-" + e.id} onChange={() => changeCompleted(e.id, document.getElementById("validate-" + e.id).checked)} />
    ]} />);

    function changeCompleted(id, checked){
        const s = JSON.parse(localStorage.getItem("completed"));
        if(checked){
            s.push(id);
        }else{
            s.splice(s.indexOf(id), 1);
        }
        localStorage.setItem("completed", JSON.stringify(s));
        setSaveValue(s);
    }

    function downloadFile(){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(saveValue));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "IsaacAchievementsSave.json");
        dlAnchorElem.click();
    }

    function uploadFile(){
        const uploader = document.getElementById("my_file");
        uploader.click();
        uploader.addEventListener("change", handleFileUpload, false);
    }

    function upload(f){
        localStorage.setItem("completed", JSON.stringify(f));
        setSaveValue(f);
        window.location.reload();
    }

    function handleFileUpload(){
        let reader = new FileReader();
        reader.onload = function (e) {
            var target = e.target;
            upload(JSON.parse(target.result));
        }
        reader.readAsText(this.files[0]);
        
    }

    return (
    <div>
        <header>
            <div>
                <label htmlFor="filters-quality">Quality</label><br />
                <select name="filters-quality" id="filters-quality" onChange={() => setQuality(document.getElementById("filters-quality").value)}>
                    <option value="all">All</option>
                    <option value="positives">Positives</option>
                    <option value="3">Positive 3</option>
                    <option value="2">Positive 2</option>
                    <option value="1">Positive 1</option>
                    <option value="0">Neutral</option>
                    <option value="negatives">Negatives</option>
                    <option value="-1">Negative 1</option>
                    <option value="-2">Negative 2</option>
                    <option value="-3">Negative 3</option>
                </select>
            </div>
            <div>
                <label htmlFor="filters-type">Type</label><br />
                <select name="filters-type" id="filters-type" onChange={() => setType(document.getElementById("filters-type").value)}>
                    <option value="all">All</option>
                    <option value="challenges">Challenges</option>
                    <option value="isaac">Isaac</option>
                    <option value="magdalene">Magdalene</option>
                    <option value="cain">Cain</option>
                    <option value="judas">Judas</option>
                    <option value="???">???</option>
                    <option value="eve">Eve</option>
                    <option value="samson">Samson</option>
                    <option value="azazel">Azazel</option>
                    <option value="lazarus">Lazarus</option>
                    <option value="eden">Eden</option>
                    <option value="the lost">The Lost</option>
                    <option value="lilith">Lilith</option>
                    <option value="keeper">Keeper</option>
                    <option value="apollyon">Apollyon</option>
                    <option value="the forgotten">The Forgotten</option>
                    <option value="bethany">Bethany</option>
                    <option value="jacob and esau">Jacob and Esau</option>
                    <option value="tainted isaac">Tainted Isaac</option>
                    <option value="tainted magdalene">Tainted Magdalene</option>
                    <option value="tainted cain">Tainted Cain</option>
                    <option value="tainted judas">Tainted Judas</option>
                    <option value="tainted ???">Tainted ???</option>
                    <option value="tainted eve">Tainted Eve</option>
                    <option value="tainted samson">Tainted Samson</option>
                    <option value="tainted azazel">Tainted Azazel</option>
                    <option value="tainted lazarus">Tainted Lazarus</option>
                    <option value="tainted eden">Tainted Eden</option>
                    <option value="tainted lost">Tainted Lost</option>
                    <option value="tainted lilith">Tainted Lilith</option>
                    <option value="tainted keeper">Tainted Keeper</option>
                    <option value="tainted apollyon">Tainted Apollyon</option>
                    <option value="tainted forgotten">Tainted Forgotten</option>
                    <option value="tainted bethany">Tainted Bethany</option>
                    <option value="tainted jacob">Tainted Jacob</option>
                </select>
            </div>
            <div>
                <label htmlFor="filters-boss">Boss</label><br />
                <select name="filters-boss" id="filters-boss" onChange={() => setBoss(document.getElementById("filters-boss").value)}>
                    <option value="all">All</option>
                    <option value="mom">Mom / Mom's Heart</option>
                    <option value="satan">Satan</option>
                    <option value="isaac">Isaac</option>
                    <option value="the lamb">The Lamb</option>
                    <option value="???">???</option>
                    <option value="mega satan">Mega Satan</option>
                    <option value="delirium">Delirium</option>
                    <option value="boss rush">Boss Rush</option>
                    <option value="hush">Hush</option>
                    <option value="ultra greed">Ultra Greed</option>
                    <option value="ultra greedier">Ultra Greedier</option>
                    <option value="mother">Mother</option>
                    <option value="the beast">The Beast</option>
                </select>
            </div>
            <div>
                <label htmlFor="filters-status">Status</label><br />
                <select name="filters-status" id="filters-status" onChange={() => setStatus(document.getElementById("filters-status").value)}>
                    <option value="all">All</option>
                    <option value="missing">Missing</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div id="transferSave">
                <img id="download" src={downloadImage} alt="Download save" onClick={() => downloadFile()} />
                <img id="upload" src={uploadImage} alt="Upload save" onClick={() => uploadFile()} />
                <a id="downloadAnchorElem"></a>
                <input type="file" id="my_file" />
            </div>
        </header>
    <main>
        <table cellSpacing={0} cellPadding={0}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Unlock Method</th>
                    <th>ID</th>
                    <th>Validate</th>
                </tr>
            </thead>
            <tbody>
                {bodyTable}
            </tbody>
        </table>
    </main>
</div>
  );
}

export default App;
