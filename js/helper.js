function saveToCsv(samples,filename) 
{
    var participant=window.localStorage.getItem('participant')
    var session=window.localStorage.getItem('session')
    var group=window.localStorage.getItem('group')
    var stage=window.localStorage.getItem('stage')

    const a = document.createElement('a');

    const headers = ['timestamp','marker' ].join(',');

    let csv_str=headers +'\n'
    samples.forEach(element => {
        let temp=Object.values(element).join(',')
        csv_str+=temp
        csv_str+='\n'
    });

    const file = new Blob([csv_str], { type: 'text/csv' });
    a.href = URL.createObjectURL(file);
    document.body.appendChild(a);

    a.download = !filename?`markers_${group}_${participant}_${session}_${stage}.csv`:`all_markers_${group}_${participant}_${session}.csv`;
    a.click();
    document.body.removeChild(a);
}

function getTimeInSec()
{
    return (window.performance.now() + window.performance.timeOrigin)/1000
}
function addToMarkers(marker_dict,marker_arr_name){
      var temp= window.localStorage.getItem(marker_arr_name)
      var temp_array=[]
      if(temp)  temp_array=JSON.parse(temp)
      temp_array.push(marker_dict)
      window.localStorage.setItem(marker_arr_name,JSON.stringify(temp_array))
      return temp_array
}

function isObject(obj)
{
    return obj !== undefined && obj !== null && obj.constructor == Object;
}

function isJSON(item) {
    let value = typeof item !== "string" ? JSON.stringify(item) : item;    
    try {
      value = JSON.parse(value);
    } catch (e) {
      return false;
    }
      
    return typeof value === "object" && value !== null;
}

function allStorageToCsv() {

    var archive = [], // Notice change here
    keys = Object.keys(localStorage)
    // console.log(localStorage)
    N = keys.length;

    for(var i=0;i<N;i++) 
    {
        var temp=localStorage.getItem( keys[i] )
        // console.log(keys[i],isJSON(temp) )
        if(isJSON(temp)) archive =[...archive,...JSON.parse(temp)] 
    }
    saveToCsv(archive) 
    return archive;
}