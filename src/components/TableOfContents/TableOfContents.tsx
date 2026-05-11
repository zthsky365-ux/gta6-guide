import type { TableOfContentsItem } from '@/types/guide';
import { useTableOfContents, flattenToc } from '@/hooks/useTableOfContents';
import styles from './TableOfContents.module.css';

interface TableOfContentsProps {
  toc: TableOfContentsItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
}

export default function TableOfContents({ toc, activeId, onItemClick }: TableOfContentsProps) {
  const { activeId: hookActiveId, scrollToHeading } = useTableOfContents(toc);
  const flatToc = flattenToc(toc);
  const currentActiveId = activeId || hookActiveId;

  if (flatToc.length === 0) return null;

  const handleClick = (id: string) => {
    if (onItemClick) {
      onItemClick(id);
    } else {
      scrollToHeading(id);
    }
  };

  return (
    <nav className={styles.toc} aria-label="Table of Contents">
      <h4 className={styles.title}>目录</h4>
      <ul className={styles.list}>
        {flatToc.map((item) => (
          <li
            key={item.id}
            className={`${styles.item} ${styles[`level${item.level}`] || ''} ${
              currentActiveId === item.id ? styles.active : ''
            }`}
          >
            <a
              href={`#${item.id}`}
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item.id);
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
