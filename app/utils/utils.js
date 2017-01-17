function formateStars(stars)
{
    var arr=[];
    var stars=stars.toString().substring(0,1);
    for(var i=1;i<=5;i++)
    {
        if(i<stars)
        {
            arr.push(1);
        }
        else
        {
            arr.push(0);
        }
    };
    return arr;
};




module.exports=
{
    formateStars:formateStars
}