var scriptContent = `mgr_parent = {};
mgr_tree = {};

function mgr_extract_comment( id ) {
	return document.getElementById( id ).getElementsByClassName("comment")[0].outerHTML;
}

function mgr_get_parent( id ) {
    return mgr_parent[ id ];
}

function mgr_prepare_parents() {
    for ( var comment_id in mgr_tree ) {
        if ( mgr_tree.hasOwnProperty(comment_id) ) {
            Array.prototype.forEach.call( mgr_tree[comment_id], function(el){
                mgr_parent[ el.id ] = comment_id;
            } );
        }
    }
}

function mgr_show_parent( ev ) {
    var id = ev.currentTarget.id;
    var parent_id = mgr_get_parent(id);
    var grand_parent_id = mgr_get_parent(parent_id);

    if (!parent_id) {
        return;
    }

    if ( ev.ctrlKey && grand_parent_id ) {
        $('mgr_top_comment').innerHTML += mgr_extract_comment( grand_parent_id );

        great_grand_parent_id = mgr_get_parent(grand_parent_id);

        if ( ev.shiftKey && great_grand_parent_id ) {
            $('mgr_top_comment').innerHTML += mgr_extract_comment( great_grand_parent_id );
        }
    }

    $('mgr_top_comment').innerHTML += mgr_extract_comment( mgr_get_parent(id) );
}

function mgr_hide_parent( ev ) {
    $('mgr_top_comment').innerHTML = '';
}

function mgr_traverse( el ) {
    mgr_tree[ el.id ] = kidsOf( el.id );
    el.addEventListener( "mouseenter", mgr_show_parent );
    el.addEventListener( "mouseleave", mgr_hide_parent );
}

Array.prototype.forEach.call( comments(), mgr_traverse );
mgr_prepare_parents();
`;

var top_comment = document.createElement('div');
top_comment.setAttribute('id', 'mgr_top_comment');
top_comment.style.position = 'fixed';
top_comment.style.top = '18px';
top_comment.style.left = '5px';
top_comment.style.padding = '5px';
//top_comment.style.width = '60%';
top_comment.style.maxHeight = '300px';
top_comment.style.overflow = 'hidden';
top_comment.style.zIndex = '9999999';
top_comment.style.border = '2px solid black';
top_comment.style.backgroundColor = 'white';
document.body.appendChild( top_comment );

var scriptElement = document.createElement('script');
scriptElement.appendChild( document.createTextNode(scriptContent) );
document.body.appendChild( scriptElement )
