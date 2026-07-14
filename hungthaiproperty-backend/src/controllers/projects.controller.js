import Project from "../models/Project.model.js";

function sendNotFound(res) {
  return res.status(404).json({ message: "Không tìm thấy dự án." });
}

function parseImageIndex(rawIndex) {
  const index = Number.parseInt(rawIndex, 10);
  return Number.isInteger(index) && index >= 0 ? index : null;
}

async function findProjectOrSendNotFound(projectId, res) {
  const project = await Project.findOne({ id: projectId });
  if (!project) {
    sendNotFound(res);
    return null;
  }

  return project;
}

export async function listProjects(req, res, next) {
  try {
    const items = await Project.find({}).sort({ createdAt: -1 }).lean();
    res.json({ items });
  } catch (error) {
    next(error);
  }
}

export async function getProject(req, res, next) {
  try {
    const item = await Project.findOne({ id: req.params.id }).lean();
    if (!item) return sendNotFound(res);
    return res.json({ item });
  } catch (error) {
    return next(error);
  }
}

export async function createProject(req, res, next) {
  try {
    const item = await Project.create(req.body);
    res.status(201).json({ item });
  } catch (error) {
    next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const item = await Project.findOneAndUpdate(
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

export async function deleteProject(req, res, next) {
  try {
    const item = await Project.findOneAndDelete({ id: req.params.id }).lean();
    if (!item) return sendNotFound(res);
    return res.json({ ok: true });
  } catch (error) {
    return next(error);
  }
}

export async function addProjectImage(req, res, next) {
  try {
    const project = await findProjectOrSendNotFound(req.params.id, res);
    if (!project) return;

    const value = typeof req.body?.value === "string" ? req.body.value : "";
    project.images = [...project.images, value];
    await project.save();

    return res.status(201).json({ item: project.toObject() });
  } catch (error) {
    return next(error);
  }
}

export async function updateProjectImage(req, res, next) {
  try {
    const project = await findProjectOrSendNotFound(req.params.id, res);
    if (!project) return;

    const imageIndex = parseImageIndex(req.params.imageIndex);
    if (imageIndex === null || imageIndex >= project.images.length) {
      return res.status(400).json({ message: "Vị trí ảnh không hợp lệ." });
    }

    project.images[imageIndex] = typeof req.body?.value === "string" ? req.body.value : "";
    await project.save();

    return res.json({ item: project.toObject() });
  } catch (error) {
    return next(error);
  }
}

export async function deleteProjectImage(req, res, next) {
  try {
    const project = await findProjectOrSendNotFound(req.params.id, res);
    if (!project) return;

    const imageIndex = parseImageIndex(req.params.imageIndex);
    if (imageIndex === null || imageIndex >= project.images.length) {
      return res.status(400).json({ message: "Vị trí ảnh không hợp lệ." });
    }

    project.images.splice(imageIndex, 1);
    if (!project.images.length) {
      project.images = [""];
    }

    await project.save();

    return res.json({ item: project.toObject() });
  } catch (error) {
    return next(error);
  }
}
