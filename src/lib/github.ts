import { Octokit } from 'octokit';
import { PublishStatus } from './types';

function getOctokit(): Octokit {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN is not configured. Please set it in .env.local');
  }
  return new Octokit({ auth: token });
}

function getRepoConfig() {
  return {
    owner: process.env.GITHUB_OWNER || '',
    repo: process.env.GITHUB_REPO || 'gta6-guide',
  };
}

/**
 * Publish content to GitHub repository
 * This creates or updates a file in the repository via GitHub API
 */
export async function publishFile(
  path: string,
  content: string,
  message: string
): Promise<PublishStatus> {
  try {
    const octokit = getOctokit();
    const { owner, repo } = getRepoConfig();
    const branch = process.env.GITHUB_BRANCH || 'main';

    // Check if file already exists (to get SHA for update)
    let sha: string | undefined;
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });
      if (!Array.isArray(data) && data.type === 'file') {
        sha = data.sha;
      }
    } catch {
      // File doesn't exist yet, that's fine
    }

    // Create or update the file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch,
    });

    return {
      success: true,
      message: `File ${path} published successfully`,
      url: `https://github.com/${owner}/${repo}/blob/${branch}/${path}`,
    };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      message: `Failed to publish: ${errMsg}`,
    };
  }
}

/**
 * Publish multiple files (batch publish)
 */
export async function publishBatch(
  files: { path: string; content: string; message: string }[]
): Promise<PublishStatus[]> {
  const results = await Promise.all(
    files.map((f) => publishFile(f.path, f.content, f.message))
  );
  return results;
}

/**
 * Trigger GitHub Pages build
 */
export async function triggerPagesBuild(): Promise<PublishStatus> {
  try {
    const octokit = getOctokit();
    const { owner, repo } = getRepoConfig();

    // Use requestPagesBuild which triggers a build from the latest deployment
    await octokit.rest.repos.requestPagesBuild({
      owner,
      repo,
    });

    return {
      success: true,
      message: 'GitHub Pages build triggered',
    };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      message: `Failed to trigger build: ${errMsg}`,
    };
  }
}

/**
 * Get repository info from GitHub API
 */
export async function fetchRepoInfo(): Promise<{
  name: string;
  url: string;
  hasPages: boolean;
}> {
  try {
    const octokit = getOctokit();
    const { owner, repo } = getRepoConfig();

    const { data } = await octokit.rest.repos.get({
      owner,
      repo,
    });

    return {
      name: data.name,
      url: data.html_url,
      hasPages: data.has_pages,
    };
  } catch {
    return {
      name: '',
      url: '',
      hasPages: false,
    };
  }
}

/**
 * List files in the repository
 */
export async function listFiles(path: string = 'content'): Promise<string[]> {
  try {
    const octokit = getOctokit();
    const { owner, repo } = getRepoConfig();
    const branch = process.env.GITHUB_BRANCH || 'main';

    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if (Array.isArray(data)) {
      return data.map((item) => item.name);
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Delete a file from the repository
 */
export async function deleteFile(
  path: string,
  message: string
): Promise<PublishStatus> {
  try {
    const octokit = getOctokit();
    const { owner, repo } = getRepoConfig();
    const branch = process.env.GITHUB_BRANCH || 'main';

    // Get file SHA
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if (Array.isArray(data)) {
      return { success: false, message: 'Path is a directory, not a file' };
    }

    await octokit.rest.repos.deleteFile({
      owner,
      repo,
      path,
      message,
      sha: data.sha,
      branch,
    });

    return {
      success: true,
      message: `File ${path} deleted successfully`,
    };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      message: `Failed to delete: ${errMsg}`,
    };
  }
}
