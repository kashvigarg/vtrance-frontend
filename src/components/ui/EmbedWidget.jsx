import React from "react";

const CustomEmbedWidget = () => {
  return (
    <div>
      <h2>Embed this Video</h2>

      <div>
        Copy/paste the text below
        <br />
        <br />
        <textarea onclick="this.select();" cols="55" rows="6">
          &lt;a href="https://www.goodreads.com/book/show/198385737-grey-dog"
          style="float: left; padding-right: 20px"&gt;&lt;img border="0"
          alt="Grey Dog"
          src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1695730122l/198385737._SX98_.jpg"
          /&gt;&lt;/a&gt;&lt;a
          href="https://www.goodreads.com/book/show/198385737-grey-dog"&gt;Grey
          Dog&lt;/a&gt; by &lt;a
          href="https://www.goodreads.com/author/show/44447606.Elliott_Gish"&gt;Elliott
          Gish&lt;/a&gt;&lt;br/&gt; My rating: &lt;a
          href="https://www.goodreads.com/review/show/6758993272"&gt;5 of 5
          stars&lt;/a&gt;&lt;br /&gt;&lt;br /&gt; This is easily the best piece
          of fiction I have ever read. And to think, to merely suggest that Grey
          Dog is the first novel Gish did- INSANE. Perfect writing, relentlessly
          perfect metaphors, the morality, the depravity, MY GOD. &lt;br
          /&gt;&lt;br /&gt;&lt;br /&gt;Single best piece of fiction to grace the
          genre. Never read anything remotely like it. The creativity, the
          finesse, the ingenuity, I’ve loved every single moment of this.
          &lt;br/&gt;&lt;br/&gt; &lt;a
          href="https://www.goodreads.com/review/list/57730989-kashvi"&gt;View
          all my reviews&lt;/a&gt;
        </textarea>
      </div>

      <div style={{padding:"20px"}}>
      <a href="">Copy Stream Link</a>
      </div>
      
    </div>
  );
};

export default CustomEmbedWidget;
