"""Link node type

Revision ID: 84c572bc7d4d
Revises: 6f00c48d62ed
Create Date: 2023-12-08 16:19:40.483791

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '84c572bc7d4d'
down_revision: Union[str, None] = 'f70293c5e84a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        ALTER TABLE nodes
        MODIFY COLUMN node_type enum(
            'StartElement',
            'ActionElement',
            'EvaluationElement',
            'EndElement',
            'LinkElement',
            'LaneElement',
            'link'
        )
    """)
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    op.execute("""
        ALTER TABLE nodes
        MODIFY COLUMN node_type enum(
            'StartElement',
            'ActionElement',
            'EvaluationElement',
            'EndElement',
            'LinkElement',
            'LaneElement'
        )
    """)
    pass
    # ### end Alembic commands ###
