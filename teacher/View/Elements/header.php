<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><?php echo $connectFlagDesc; ?> <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="javascript:void(0)" onClick="statusMainJs.setStatus(1);">STANDBY</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" onClick="statusMainJs.setStatus(0);">NOT STANDBY</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
<div class="row">
    <div class="col-lg-12">
        <div class="page-header">
        </div>
    </div>
</div>