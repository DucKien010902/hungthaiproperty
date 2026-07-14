import Article from "../models/Article.model.js";

function sendNotFound(res) {
  return res.status(404).json({ message: "Không tìm thấy bài viết." });
}

function parseBlockIndex(rawIndex) {
  const index = Number.parseInt(rawIndex, 10);
  return Number.isInteger(index) && index >= 0 ? index : null;
}

function normalizeContentBlock(block = {}) {
  if (block.type === "image") {
    return {
      type: "image",
      src: typeof block.src === "string" ? block.src : "",
      alt: typeof block.alt === "string" ? block.alt : "",
    };
  }

  return {
    type: "text",
    content: typeof block.content === "string" ? block.content : "",
  };
}

async function findArticleOrSendNotFound(articleId, res) {
  const article = await Article.findOne({ id: articleId });
  if (!article) {
    sendNotFound(res);
    return null;
  }

  return article;
}

export async function listArticles(req, res, next) {
  try {
    const items = await Article.find({}).sort({ createdAt: -1 }).lean();
    res.json({ items });
  } catch (error) {
    next(error);
  }
}

export async function getArticle(req, res, next) {
  try {
    const item = await Article.findOne({ id: req.params.id }).lean();
    if (!item) return sendNotFound(res);
    return res.json({ item });
  } catch (error) {
    return next(error);
  }
}

export async function createArticle(req, res, next) {
  try {
    const item = await Article.create(req.body);
    res.status(201).json({ item });
  } catch (error) {
    next(error);
  }
}

export async function updateArticle(req, res, next) {
  try {
    const item = await Article.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true },
    ).lean();

    if (!item) return sendNotFound(res);
    return res.json({ item });
  } catch (error) {
    return next(error);
  }
}

export async function deleteArticle(req, res, next) {
  try {
    const item = await Article.findOneAndDelete({ id: req.params.id }).lean();
    if (!item) return sendNotFound(res);
    return res.json({ ok: true });
  } catch (error) {
    return next(error);
  }
}

export async function addArticleBlock(req, res, next) {
  try {
    const article = await findArticleOrSendNotFound(req.params.id, res);
    if (!article) return;

    const nextBlock = normalizeContentBlock(req.body?.block);
    const requestedIndex = Number.parseInt(String(req.body?.index ?? article.contentBlocks.length), 10);
    const insertIndex = Number.isInteger(requestedIndex)
      ? Math.min(Math.max(requestedIndex, 0), article.contentBlocks.length)
      : article.contentBlocks.length;

    article.contentBlocks.splice(insertIndex, 0, nextBlock);
    await article.save();

    return res.status(201).json({ item: article.toObject() });
  } catch (error) {
    return next(error);
  }
}

export async function updateArticleBlock(req, res, next) {
  try {
    const article = await findArticleOrSendNotFound(req.params.id, res);
    if (!article) return;

    const blockIndex = parseBlockIndex(req.params.blockIndex);
    if (blockIndex === null || blockIndex >= article.contentBlocks.length) {
      return res.status(400).json({ message: "Vị trí khối nội dung không hợp lệ." });
    }

    const currentBlock = article.contentBlocks[blockIndex]?.toObject?.() ?? article.contentBlocks[blockIndex];
    article.contentBlocks[blockIndex] = normalizeContentBlock({
      ...currentBlock,
      ...req.body,
    });
    await article.save();

    return res.json({ item: article.toObject() });
  } catch (error) {
    return next(error);
  }
}

export async function deleteArticleBlock(req, res, next) {
  try {
    const article = await findArticleOrSendNotFound(req.params.id, res);
    if (!article) return;

    const blockIndex = parseBlockIndex(req.params.blockIndex);
    if (blockIndex === null || blockIndex >= article.contentBlocks.length) {
      return res.status(400).json({ message: "Vị trí khối nội dung không hợp lệ." });
    }

    article.contentBlocks.splice(blockIndex, 1);
    if (!article.contentBlocks.length) {
      article.contentBlocks = [normalizeContentBlock({ type: "text", content: "" })];
    }

    await article.save();

    return res.json({ item: article.toObject() });
  } catch (error) {
    return next(error);
  }
}
