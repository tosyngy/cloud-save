
<div id="main-content" style="margin-top: 50px">           
    <div class="title bg-primary" style="padding: 5px; margin-top: 5px; text-align: center"><h1>Add to Cloud Information</h1></div>
    <form enctype="multipart/form-data" id="post_form">
        <div class="form-group">
            <label for="title" class="label"><h3>Title</h3></label>
            <input type="text" class="form-control" id="title" placeholder="Title">
        </div>
        <div class="form-group">
            <label for="title" class="label"><h3>Category</h3></label>
            <input type="text" class="form-control" id="category" placeholder="Category" list="catlist">
        </div>
        <div class="form-group">
            <label for="description" class= "label"><h3>Content</h3></label>
            <textarea class="form-control"  id="description"rows="3"></textarea>
        </div>


        <div class="form-group">
            <input id="file-1" type="file" multiple class="file" data-overwrite-initial="false" data-min-file-count="1" data-max-file-count="2" />
        </div>
        <div class="alert alert-success" style="display: none"> Your Information has been save successfully <span class="close">x</span></div>
        <button type="submit" class="btn btn-default btn-lg  btn-success">Submit</button>

    </form>
</div>

<datalist id="catlist">
    <?php 
    foreach ($this->cat as $key => $value) {
        echo " <option value='{$value['name']}'>{$value['name']}</option>"; 
    }
    ?>
   
</datalist>
<script src='<?php echo URL ?>views/dashboard/js/script.js'></script>

