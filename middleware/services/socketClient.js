/**
 * Created by maxim.bondarenko on 04/11/2016.
 */
function socketClient(socket){
    this.socket = socket;
}

socketClient.prototype.getId = function(){
    return this.socket.id;
}

socketClient.prototype.isAutorize = function(){
    return (this.socket.request.session && this.socket.request.session.user);
}

socketClient.prototype.getUserData = function(){
    if(this.socket.request.session && this.socket.request.session.user)
    {
        return this.socket.request.session.user;
    }
}

socketClient.prototype.setUserData = function(data){
    if(this.socket.request.session)
    {
        this.socket.request.session.user = data;
        this.socket.request.session.save(function(err,data) {
            //TODO:: error handling
        });
    }
}

socketClient.prototype.setEvent = function(event,callback)
{
    this.socket.on(event, function(){
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(this);
        callback.apply(callback.bind,  args);
    }.bind(this));
}
module.exports = socketClient;