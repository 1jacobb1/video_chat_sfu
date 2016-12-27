<style>
    .othersVideo, .ownVideo {
        height: 100%;
        width: 100%;
    }
</style>
<div class="row">
    <div class="col-md-12">
        <div class="col-md-6">
            <div class="own_video_wrap on" id="own_video_wrap" style="width: 100%; height: 100%; z-index: 2;"><!-- if connected, add class "on" -->
    			<video class="ownVideo" id="ownVideo" autoplay="" poster="/teacher/images/class/video_no_stream.png" src="" muted=""></video>
    		</div>
        </div>
        <div class="col-md-6">
        	<div class="others_video_wrap on" id="others_video_wrap" style="width: 100%; height: 100%; z-index: 2;"><!-- if connected, add class "on" -->
    			<video class="othersVideo" id="othersVideo" autoplay="" poster="/teacher/images/class/video_no_stream.png" src="" muted=""></video>
    		</div>
        </div>
    </div>
</div>