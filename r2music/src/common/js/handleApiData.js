//创建一个类用于保存歌曲的基本信息，
//做这一步是为了从复杂的数据中提取出我们想要的信息
//创建歌曲类
export default class Asong{
  constructor({id,name,singer,album,image,publishTime,copyRight,needPaid,paid,vipSong}){
    this.id = id
    this.name = name
    this.singer = singer  
    this.album = album
    this.image = image
    this.copyRight = copyRight
    this.needPaid = needPaid
    this.paid = paid
    this.vipSong = vipSong
    // this.publishTime = publishTime || null
  }
}
export class Album{
  constructor({id,name,size,image,publishTime,singer,description}){
    this.id = id
    this.singer = singer
    this.name = name
    this.size = size  
    this.publishTime = publishTime
    this.image = image
    this.description = description || null
  }
}
export class Singer{
  constructor({id,name,transname,isFollowed,albumCount,image,songsCount,briefDesc}){
    this.id = id
    this.name = name
    this.transname = transname || null
    this.isFollowed = isFollowed  
    this.albumCount = albumCount
    this.songsCount = songsCount
    this.image = image
    this.briefDesc = briefDesc
  }
}
export class PlayList{
  constructor({id,name,creator,image,playCount,subscribedCount,subscribed,description, songsCount, creatorPic}){
    this.id = id
    this.name = name
    this.creator = creator
    this.image = image
    this.subscribed = subscribed  
    this.subscribedCount = subscribedCount
    this.playCount = playCount
    this.description = description
    this.songsCount = songsCount
    this.creatorPic = creatorPic
  }
}
//对歌手信息的处理，因为可能是多个歌手
function getSingerName(arr){
  let singerName = []
  singerName = arr.map((item) =>{
    return item.name
  })
  return singerName.join('/')
}
//获取歌手的Id
function getSingerId(arr){
  let singerId = []
  singerId = arr.map((item) =>{
    return item.id
  })
  return singerId.join()
}

//从复杂的数据中提取出我们想要的信息
//传入的实际参数是data里的每一个对象（每一首歌）

//过滤数据的方法中返回该类的实例
//用于处理推荐歌曲的数据，因为接口返回的数据名称不一样，比如有些是artists，有些是简写ar
//TODO：也用于处理搜索结果，（搜索结果的api没有privilege属性）
//但是获取推荐和搜索结果的接口无法判断是否有版权，推荐的应该都有版权，
//搜索结果显示的一般都是有版权的靠前显示，没有版权的靠后。
export function getWantedSongInfo(theSong){
  let privilege = theSong.privilege
  return new Asong({
    id: theSong.id,
    name: theSong.name,
    singer: getSingerName(theSong.artists),
    album: theSong.album.name,
    image: theSong.album.picUrl,
    // copyRight: privilege.st === -200?false:true,
    needPaid: privilege.fee === 4?true:false,
    paid: privilege.payed === 0?false:true,
    vipSong: privilege.fee === 1?true:false,
  })
}
export function getWantedAlbumInfo(album){
  return new Album({
    id: album.id,
    name: album.name,
    singer: getSingerName(album.artists),
    size: album.size,
    image: album.picUrl,
    publishTime: album.publishTime,
    description: album.description
  })
}
export function getSearchInfo(theSong){
  return new Asong({
    id: theSong.id,
    name: theSong.name,
    singer: getSingerName(theSong.artists),
    album: theSong.name,
  })
}
export function getWantedSingerSongs(theSong){
  return new Asong({
    id: theSong.id,
    name: theSong.name,
    singer: getSingerName(theSong.ar),
    album: theSong.al.name,
    image: theSong.al.picUrl
  })
}
export function getWantedSingerInfo(singer){
  return new Singer({
    id: singer.id,
    name: singer.name,
    transname: singer.trans,
    albumCount: singer.albumSize,
    songsCount: singer.musicSize,
    isFollowed: singer.followed,
    image: singer.picUrl,
    briefDesc: singer.briefDesc
  })
}
export function getPlayListData(playList){
  return new PlayList({
    id: playList.id,
    creator: playList.creator.nickname,
    creatorPic: playList.creator.avatarUrl,
    name: playList.name,
    image: playList.coverImgUrl,
    playCount: playList.playCount,
    subscribedCount: playList.subscribedCount,
    subscribed: playList.subscribed,
    description: playList.description,
    songsCount:playList.trackCount
  })
}
export function getPlayListSongInfo(theSong){
  return new Asong({
    id: theSong.id,
    name: theSong.name,
    singer: getSingerName(theSong.ar),
    singerId: getSingerId(theSong.ar),
    album: theSong.al.name,
    albumId: theSong.al.id,
    image: theSong.al.picUrl
  })
}
