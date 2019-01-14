<?php
if ($this->user) {
    $user = $this->user;
}
?>


</div>
<div id="main-content" style="margin-top: 50px;text-align: center">           
    <div class="title bg-primary" style="padding: 5px; margin-top: 5px; text-align: center"><h1>Users' Information</h1></div>
    <table class="table-responsive  table-hover  " style="margin: auto">
        <tr class="active" style="padding: 10px;font-size: 16px">
            <th class="col-xs-2" scope="row">S.N</th>
            <th class="col-xs-4">Username</th>
            <th class="col-xs-2">User type</th>
            <th class="col-xs-2">Status</th>
        </tr>
        <?php
        if(!empty($user))
        foreach ($user as $key => $value) {
            echo "<tr class='success'>";
            foreach ($value as $key => $data) {
                echo "<td>$data</td>";
            }
            echo '</tr>';
        }
        ?>

    </table>

</div> 

<style>
    table, td, th {
        border: 1px solid #337ab7;
    }
    th {
        text-align: left;
    }
    th {
        background-color: #337ab7;
        color: white;
    }
    td {
        padding: 15px;
    }
    td {
        height: 50px;
        vertical-align: bottom;
    }
    tr:hover + td {
        color: #eee;
    }
</style>
<script src="<?php echo URL; ?>public/js/jTable.js"></script>
<script>

    $(document).ready(function () {
        var table = $('table').DataTable();
    });
</script>